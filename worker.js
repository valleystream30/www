addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

// function isHTML(request) {
//     const acceptHeader = request.headers.get("Accept");
//     return ((typeof acceptHeader === "string") && (acceptHeader.indexOf("text/html") >= 0));
// };

async function handleRequest(request) {
    const upstream = await fetch(request);
    if (upstream.status !== 404) return upstream;
    const redirects = [
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/admin/,
            to: 'https://www.valleystream30.com/index.php?pageID=admin_main&adminArea=1',
            status: 302
        }
    ];
    for (const { from, to, status } of redirects) {
        if (from.test(request.url)) return Response.redirect(to, status);
    };
    return Response.redirect(request.url.replace(/https?:\/\/(?:www\.)?valleystream30\.com(.*)/, 'https://cdn.valleystream30.com$1'), 302);
};
