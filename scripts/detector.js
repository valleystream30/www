// view-source:https://www.valleystream30.com/sitemap.xml

var sitemap = Array.from(document.querySelectorAll('span')).filter(link => !link.classList.length && !link.id && link.innerText.startsWith('http')).map(link => link.innerText);
var linksWithBackTo = [];
var linksWithSectionHome = [];
var linksWithAccordion = [];
var linksWithError = [];
var linksWithSUNY = [];
var linksWithImageWithoutAlt = {};
var interval = setInterval(async () => {
    if (sitemap.length === 0) {
        clearInterval(interval);
        console.log('Sitemap crawl complete');
        console.log('Back to:', linksWithBackTo);
        console.log('Home page links:', linksWithSectionHome);
        console.log('Accordion:', linksWithAccordion);
        console.log('Errors:', linksWithError);
        console.log('SUNY:', linksWithSUNY);
        console.log('Images without alt text:', linksWithImageWithoutAlt);
        return;
    };
    const link = sitemap.shift();
    await fetch(link).then(res => res.text()).then(res => {
        if (res.toLowerCase().includes('back to')) linksWithBackTo.push(link);
        if (res.toLowerCase().includes('home page') || res.includes(' HOME')) linksWithSectionHome.push(link);
        if (res.toLowerCase().includes('ss-accordion-heading')) linksWithAccordion.push(link);
        if (res.toLowerCase().includes('state university of new york at')) linksWithSUNY.push(link);
        var parser = new DOMParser();
        var doc = parser.parseFromString(res, "text/html");
        var images = doc.querySelectorAll('main img:not(.ss-document-icon):not([alt]), main img[alt=""]:not(.ss-document-icon)');
        if (images.length) linksWithImageWithoutAlt[link] = Array.from(images).map(img => img.outerHTML);
    }).catch(err => {
        console.log('Error on', link);
        linksWithError.push(link);
    });
}, 2000);
function editLinks(array) {
    array.forEach(link => {
        setTimeout(() => {
            window.open(`https://www.valleystream30.com/index.php?pageID=${link.split('/')[3]}&adminArea=1`, '_blank');
        }, 1000);
    });
};
function openLinks(array) {
    array.forEach(link => {
        setTimeout(() => {
            window.open(link, '_blank');
        }, 1000);
    });
};