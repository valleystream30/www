var sitemap = Array.from(document.querySelectorAll('span')).filter(link => !link.classList.length && !link.id && link.innerText.startsWith('http')).map(link => link.innerText);
var results = [];
var interval = setInterval(() => {
    if (sitemap.length === 0) {
        clearInterval(interval);
        console.log(results);
        return;
    };
    const link = sitemap.shift();
    fetch(link).then(res => res.text()).then(res => {
        if (res.toLowerCase().includes('back to')) results.push(link);
    }).catch(err => console.log('Error on', link));
}, 2000);