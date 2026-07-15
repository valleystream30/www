addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

// function isHTML(request) {
//     const acceptHeader = request.headers.get("Accept");
//     return ((typeof acceptHeader === "string") && (acceptHeader.indexOf("text/html") >= 0));
// };

async function handleRequest(request) {
    const upstream = await fetch(request);
    // const upstreamURL = new URL(upstream.url);
    // if (upstreamURL.pathname.slice(1).includes('/')) return Response.redirect(`${request.url.replace(/https?:\/\/(www\.)?valleystream30\.com(.*)/, 'https://$1valleystream30.com')}/${upstreamURL.pathname.slice(1).replace(/\//g, '-'), 301}`);
    if (upstream.status !== 404) return upstream;
    const redirects = [
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/admin/,
            to: 'https://www.valleystream30.com/index.php?pageID=admin_main&adminArea=1',
            status: 302
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/policies/,
            to: 'https://www.boardpolicyonline.com/?b=valley_stream_30',
            status: 302
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/foil/,
            to: 'https://www.valleystream30.com/business#freedom-of-information-foil',
            status: 302
        }
    ];
    for (const { from, to, status } of redirects) {
        if (from.test(request.url)) return Response.redirect(to, status);
    };
    return Response.redirect(request.url.replace(/https?:\/\/(?:www\.)?valleystream30\.com(.*)/, 'https://cdn.valleystream30.com$1'), 302);
};
