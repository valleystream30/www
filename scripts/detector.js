// view-source:https://www.valleystream30.com/sitemap.xml

var sitemap = Array.from(document.querySelectorAll('span')).filter(link => !link.classList.length && !link.id && link.innerText.startsWith('http')).map(link => link.innerText);
var linksWithBackTo = [];
var linksWithSectionHome = [];
var linksWithAccordion = [];
var linksWithError = [];
var linksWithSUNY = [];
var linksWithImageWithoutAlt = {};
var linksWithClearstream = [];
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
        console.log('Clearstream:', linksWithClearstream);
        return;
    };
    const link = sitemap.shift();
    await fetch(link).then(res => res.text()).then(res => {
        var lowercase = res.toLowerCase();
        if (lowercase.includes('back to')) linksWithBackTo.push(link);
        if (lowercase.includes('home page') || res.includes(' HOME')) linksWithSectionHome.push(link);
        if (lowercase.includes('ss-accordion-heading')) linksWithAccordion.push(link);
        if (lowercase.includes('state university of new york at')) linksWithSUNY.push(link);
        var parser = new DOMParser();
        var doc = parser.parseFromString(res, "text/html");
        var images = doc.querySelectorAll('main img:not(.ss-document-icon):not(.rellax):not([alt]), main img[alt=""]:not(.ss-document-icon):not(.rellax)');
        if (images.length) linksWithImageWithoutAlt[link] = Array.from(images).map(img => img.outerHTML);
        var textPosition = lowercase.indexOf('clearstream');
        while (textPosition !== -1) {
            const prevChar = (textPosition > 0) ? lowercase[textPosition - 1] : '';
            if ((prevChar !== '/') && (prevChar !== '\\')) linksWithClearstream.push(link);
            textPosition = lowercase.indexOf('clearstream', textPosition + 1);
        };
    }).catch(err => {
        console.err('Error on', link, err);
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