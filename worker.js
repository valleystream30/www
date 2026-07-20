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
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/board/,
            to: 'https://www.valleystream30.com/boe',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/board-of-education/,
            to: 'https://www.valleystream30.com/boe',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/global-leaders-of-tomorrow/,
            to: 'https://www.valleystream30.com/global-leaders',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/glot/,
            to: 'https://www.valleystream30.com/global-leaders',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/district-history/,
            to: 'https://www.valleystream30.com/history',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/voting-information/,
            to: 'https://www.valleystream30.com/voting',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/community-resources/,
            to: 'https://www.valleystream30.com/resources',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/freedom-of-information/,
            to: 'https://www.valleystream30.com/foil',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/student-registration/,
            to: 'https://www.valleystream30.com/registration',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/the-friendly-newsletters/,
            to: 'https://www.valleystream30.com/newsletters',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/cs/,
            to: 'https://www.valleystream30.com/clear-stream-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/csa/,
            to: 'https://www.valleystream30.com/clear-stream-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/csas/,
            to: 'https://www.valleystream30.com/clear-stream-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clearstream/,
            to: 'https://www.valleystream30.com/clear-stream-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clearstreamave/,
            to: 'https://www.valleystream30.com/clear-stream-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clearstreamavenue/,
            to: 'https://www.valleystream30.com/clear-stream-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clearstreamaveschool/,
            to: 'https://www.valleystream30.com/clear-stream-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clearstreamavenueschool/,
            to: 'https://www.valleystream30.com/clear-stream-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clear-stream/,
            to: 'https://www.valleystream30.com/clear-stream-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clear-stream-ave/,
            to: 'https://www.valleystream30.com/clear-stream-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clear-stream-ave-school/,
            to: 'https://www.valleystream30.com/clear-stream-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clear-stream-avenue-school/,
            to: 'https://www.valleystream30.com/clear-stream-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/cs-supply-lists/,
            to: 'https://www.valleystream30.com/clear-stream-avenue-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/csa-supply-lists/,
            to: 'https://www.valleystream30.com/clear-stream-avenue-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/csas-supply-lists/,
            to: 'https://www.valleystream30.com/clear-stream-avenue-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clear-stream-supply-lists/,
            to: 'https://www.valleystream30.com/clear-stream-avenue-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clear-stream-ave-supply-lists/,
            to: 'https://www.valleystream30.com/clear-stream-avenue-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clear-stream-avenue-supply-lists/,
            to: 'https://www.valleystream30.com/clear-stream-avenue-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clear-stream-ave-school-supply-lists/,
            to: 'https://www.valleystream30.com/clear-stream-avenue-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/clear-stream-avenue-school-supply-lists/,
            to: 'https://www.valleystream30.com/clear-stream-avenue-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/fr/,
            to: 'https://www.valleystream30.com/forest-road',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/frs/,
            to: 'https://www.valleystream30.com/forest-road',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/forest/,
            to: 'https://www.valleystream30.com/forest-road',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/forestroad/,
            to: 'https://www.valleystream30.com/forest-road',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/forestroadschool/,
            to: 'https://www.valleystream30.com/forest-road',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/forest-road-school/,
            to: 'https://www.valleystream30.com/forest-road',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/fr-supply-lists/,
            to: 'https://www.valleystream30.com/forest-road-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/frs-supply-lists/,
            to: 'https://www.valleystream30.com/forest-road-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/forest-supply-lists/,
            to: 'https://www.valleystream30.com/forest-road-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/forest-road-school-supply-lists/,
            to: 'https://www.valleystream30.com/forest-road-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/sa/,
            to: 'https://www.valleystream30.com/shaw-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/sas/,
            to: 'https://www.valleystream30.com/shaw-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/shaw/,
            to: 'https://www.valleystream30.com/shaw-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/shawavenue/,
            to: 'https://www.valleystream30.com/shaw-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/shawavenueschool/,
            to: 'https://www.valleystream30.com/shaw-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/shaw-avenue-school/,
            to: 'https://www.valleystream30.com/shaw-avenue',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/sa-supply-lists/,
            to: 'https://www.valleystream30.com/shaw-avenue-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/sas-supply-lists/,
            to: 'https://www.valleystream30.com/shaw-avenue-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/shaw-supply-lists/,
            to: 'https://www.valleystream30.com/shaw-avenue-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/shaw-avenue-school-supply-lists/,
            to: 'https://www.valleystream30.com/shaw-avenue-supply-lists',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/depts/,
            to: 'https://www.valleystream30.com/departments',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/curriculum/,
            to: 'https://www.valleystream30.com/curriculum-and-instruction',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/facilities/,
            to: 'https://www.valleystream30.com/facilities-and-operations',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/hr/,
            to: 'https://www.valleystream30.com/human-resources',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/tech/,
            to: 'https://www.valleystream30.com/technology',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/cal/,
            to: 'https://www.valleystream30.com/calendars',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/cals/,
            to: 'https://www.valleystream30.com/calendars',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/calendar/,
            to: 'https://www.valleystream30.com/calendars',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/board-meetings/,
            to: 'https://www.valleystream30.com/boe-meetings',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/board-of-education-meetings/,
            to: 'https://www.valleystream30.com/boe-meetings',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/student-attendance/,
            to: 'https://www.valleystream30.com/attendance',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/attendance-calendar/,
            to: 'https://www.valleystream30.com/attendance',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/student-attendance-calendar/,
            to: 'https://www.valleystream30.com/attendance',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/nassau-boces/,
            to: 'https://www.valleystream30.com/boces',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/boces-calendar/,
            to: 'https://www.valleystream30.com/boces',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/nassau-boces-calendar/,
            to: 'https://www.valleystream30.com/boces',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/sitemap/,
            to: 'https://www.valleystream30.com/sitemap',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/site_map.xml/,
            to: 'https://www.valleystream30.com/sitemap.xml',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/llms/,
            to: 'https://www.valleystream30.com/llms.txt',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/superintendent-of-schools/,
            to: 'https://www.valleystream30.com/superintendent',
            status: 301
        },
        {
            from: /https?:\/\/(?:www\.)?valleystream30\.com\/district-superintendent/,
            to: 'https://www.valleystream30.com/superintendent',
            status: 301
        }
    ];
    for (const { from, to, status } of redirects) {
        if (from.test(request.url)) return Response.redirect(to, status);
    };
    return Response.redirect(request.url.replace(/https?:\/\/(?:www\.)?valleystream30\.com(.*)/, 'https://cdn.valleystream30.com$1'), 302);
};
