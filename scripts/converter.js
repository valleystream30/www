// https://www.valleystream30.com/site_map

var sitemap = [];
document.querySelector('.pageBody').querySelectorAll('li a').forEach(link => {
    sitemap.push({
        'id': link.href.split('/')[3],
        'name': link.innerText,
        'url': link.href
    });
});
function lookupLink(id) {
    return sitemap.find(link => (link.id === id) || (link.url === id)) || null;
};