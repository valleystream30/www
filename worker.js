addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

function isHTML(request) {
    const acceptHeader = request.headers.get("Accept");
    return ((typeof acceptHeader === "string") && (acceptHeader.indexOf("text/html") >= 0));
};

async function handleRequest(request) {
    const upstream = await fetch(request);
    if ((upstream.status === 404) && isHTML(request)) {
        const redirectHtml = `<!DOCTYPE html><html lang="en"><head><title>404 Not Found</title><meta http-equiv="refresh" content="0;url=/" /><script>window.location.replace('/');</script></head><body></body></html>`;
        return new Response(redirectHtml, {
            status: 404,
            statusText: 'Not Found',
            headers: {
                'Content-Type': 'text/html; charset=UTF-8',
            },
        });
    };
    return upstream;
};
