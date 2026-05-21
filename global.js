function onReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    };
};
onReady(() => {
    if (document.querySelector('.alert-badge i')) document.querySelector('.alert-badge i').className = "fa-solid fa-bell";
    document.querySelector('.alert-badge')?.addEventListener('click', () => {
        var changeIconInterval = setInterval(() => {
            if (document.querySelector('.ss-alert-modal-svg-container:not(:has(svg.new))')) {
                document.querySelector('.ss-alert-modal-svg-container:not(:has(svg.new))').innerHTML = `<svg class="new" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C302.3 64 288 78.3 288 96L288 99.2C215 114 160 178.6 160 256L160 277.7C160 325.8 143.6 372.5 113.6 410.1L103.8 422.3C98.7 428.6 96 436.4 96 444.5C96 464.1 111.9 480 131.5 480L508.4 480C528 480 543.9 464.1 543.9 444.5C543.9 436.4 541.2 428.6 536.1 422.3L526.3 410.1C496.4 372.5 480 325.8 480 277.7L480 256C480 178.6 425 114 352 99.2L352 96C352 78.3 337.7 64 320 64zM258 528C265.1 555.6 290.2 576 320 576C349.8 576 374.9 555.6 382 528L258 528z"/></svg>`;
                if (document.querySelector('.ss-alert-modal-cta-button') && (document.querySelector('.ss-alert-modal-cta-button').href === window.location.href)) document.querySelector('.ss-alert-modal-cta-button').remove();
                setTimeout(() => {
                    document.querySelector('.alert-badge').classList.add('active');
                }, 100);
            };
            if (!document.querySelector('.ss-alert-modal-svg-container')) clearInterval(changeIconInterval);
        }, 500);
    });
    /* Array.from($0.querySelectorAll('img')).map(img => {
        img.style.height = 'fit-content';
        img.style.maxHeight = '75px';
        img.style.width = 'auto';
        return img.outerHTML;
    }).join('&nbsp;&nbsp;&nbsp;&nbsp;'); */
    const pageTitle = document.querySelector('title').textContent.toLowerCase();
    if (pageTitle.includes('partnership')) {
        document.querySelector('.ss-editor-content p:last-child').classList.add('partnerships');
    };
    document.addEventListener('keydown', (e) => {
        if (e.key === '0') document.documentElement.removeAttribute('font');
        if (e.key === '1') document.documentElement.setAttribute('font', '1');
        if (e.key === '2') document.documentElement.setAttribute('font', '2');
        if (e.key === '3') document.documentElement.setAttribute('font', '3');
        if (e.key === '4') document.documentElement.setAttribute('font', '4');
    });
    document.querySelector('footer a').href = 'https://maps.app.goo.gl/TPDs2TqNehEzxuMY8';
    document.querySelectorAll('a.btn').forEach(btn => {
        if (btn.querySelector('.ss-button-icon')) return;
        const icon = document.createElement('span');
        icon.setAttribute('aria-hidden', 'true');
        icon.className = 'ss-button-icon';
        btn.appendChild(icon);
    });
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.classList && node.classList.contains('modal-backdrop') && (document.querySelectorAll('.modal-backdrop').length > 1)) node.remove();
            });
        });
    });
    observer.observe(document.body, { childList: true });
});