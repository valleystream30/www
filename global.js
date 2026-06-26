var startTime = new Date().getTime();

document.querySelector('header img').src = host.includes('https') ? (host + 'images/logo-new.png') : 'https://faisaln.com/share/1780427119.png'; // remove after approval, requires https

function resetTranslate() {
    var iframe = document.getElementsByClassName('goog-te-banner-frame')[0] || document.getElementById(':1.container');
    if (!iframe) return;
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var restore_el = innerDoc.getElementsByTagName("button");
    for (var i = 0; i < restore_el.length; i++) {
        if (restore_el[i].id.indexOf("restore") >= 0) {
            restore_el[i].click();
            return;
        };
    };
};

async function onReady(callback) {
    function waitForCondition(checkFn, timeout = 2000, interval = 100) {
        return new Promise(resolve => {
            try {
                if (checkFn()) return resolve(true);
            } catch (e) { };
            const stop = () => {
                clearInterval(iv);
                clearTimeout(to);
                resolve(false);
            };
            const iv = setInterval(() => {
                try {
                    if (checkFn()) {
                        stop();
                        resolve(true);
                    };
                } catch (e) { };
            }, interval);
            const to = setTimeout(stop, timeout);
        });
    };
    if (document.readyState !== 'complete') {
        const loadPromise = new Promise(resolve => window.addEventListener('load', resolve, { once: true }));
        await Promise.race([loadPromise, new Promise(r => setTimeout(r, 1500))]);
    };
    await waitForCondition(() => {
        return !!document.querySelector('#GoogleTranslate, .calendar-event, .slick-slide, .ss-alert-modal-svg-container');
    }, 2000, 100);
    try {
        await callback();
    } catch (e) {
        console.error(e);
    };
};

var header = document.querySelector('header');
var nav = Array.from(header.querySelectorAll('nav')).find(nav => (nav.clientHeight * ((window.innerWidth <= 1000) ? 0.8 : 1)));
var pageSections = [];
var loggedInUser = {
    visitor: null,
    email: null,
    full_name: null,
};
var currentSlug = null;
var currentSectionTimer = null;
var intersecting = new Set();

onReady(async () => {
    try {
        try {
            loggedInUser = JSON.parse(String('{' + (document.querySelector('.adminBar script') ? '\'' + document.querySelector('.adminBar script').innerText.trim().split(`visitor: {`)[1].split('}')[0].trim().replaceAll('  ', '').replaceAll('\n', ' ').slice(0, -1).replaceAll(', ', ', \'').replaceAll(':', '\':') : '') + '}').replaceAll('\'', '"'));
        } catch { };
        if (loggedInUser.full_name) document.documentElement.setAttribute('user', loggedInUser.full_name.split(' ')[0]);
        const tasks = [];
        function addTask(taskFactory) {
            tasks.push(taskFactory);
        };
        // document.querySelector('header .ss-site-header-school-tagline').classList.add('customFont');
        // header.prepend(nav);
        // header.style.paddingTop = `${(nav.clientHeight * ((window.innerWidth <= 1000) ? 0.8 : 1))}px`;
        header.append(nav);
        if ((window.innerWidth > 1000) && header.querySelector('.ss-site-header-main-links-container .translate a')) {
            nav.append(header.querySelector('.ss-site-header-main-links-container .translate a'));
            for (var translate of header.querySelectorAll('.ss-site-header-main-links-container .translate')) translate.style.display = 'none';
        };
        var searchBar = document.createElement('div');
        searchBar.className = 'searchBar';
        searchBar.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Search..." id="siteSearchInput" /><button id="siteSearchButton"><i class="fa-solid fa-arrow-right"></i></button>`;
        header.querySelector('.ss-site-header-main-container').insertBefore(searchBar, header.querySelector('.ss-site-header-main-container').lastElementChild);
        document.getElementById('siteSearchButton').addEventListener('click', () => {
            var query = document.getElementById('siteSearchInput').value;
            if (query) window.location.href = `/search?s=${encodeURIComponent(query)}`;
        });
        document.getElementById('siteSearchInput').addEventListener('keydown', (event) => {
            if (event.key === 'Enter') document.getElementById('siteSearchButton').click();
        });
        if (window.innerWidth <= 1000) {
            var nav2 = document.createElement('nav');
            nav2.className = 'ss-site-header-main-links-container';
            nav2.style.display = 'flex';
            nav2.style.justifyContent = 'center';
            for (var schoolLink of Array.from(document.querySelectorAll('#ss-schools-modal a')).sort((a, b) => a.innerText.localeCompare(b.innerText))) {
                var newLink = schoolLink.cloneNode(true);
                newLink.innerText = newLink.innerText.replace(' School', '').replace(' Avenue', ' Ave');
                if (newLink.innerText.toLowerCase().includes('shaw')) newLink.classList.add('shaw');
                if (newLink.innerText.toLowerCase().includes('clear')) newLink.classList.add('clearStream');
                if (newLink.innerText.toLowerCase().includes('forest')) newLink.classList.add('forest');
                nav2.append(newLink);
            };
            header.querySelector('.ss-site-header-main-container').appendChild(nav2);
        } else {
            for (var nav2 of document.querySelectorAll('.ss-site-header-main-links-container')) {
                for (var schoolLink of Array.from(document.querySelectorAll('#ss-schools-modal a')).sort((a, b) => b.innerText.localeCompare(a.innerText))) {
                    var newLink = schoolLink.cloneNode(true);
                    newLink.innerHTML = `<p>${newLink.innerText.replace(' School', '')}</p>`;
                    if (newLink.innerText.toLowerCase().includes('shaw')) newLink.classList.add('shaw');
                    if (newLink.innerText.toLowerCase().includes('clear')) newLink.classList.add('clearStream');
                    if (newLink.innerText.toLowerCase().includes('forest')) newLink.classList.add('forest');
                    nav2.prepend(newLink);
                };
            };
        };
        // var newLink = document.createElement('a');
        // newLink.className = 'ss-site-header-title-container';
        // newLink.href = '/';
        // newLink.append(...header.querySelectorAll('.ss-site-header-title-container *'));
        // header.querySelector('.ss-site-header-title-container').replaceWith(newLink);
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
        var breadcrumbs = document.querySelector('main > .row:has(.breadcrumb)');
        if (breadcrumbs) {
            var breadcrumbsMargin = (document.body.clientWidth - breadcrumbs.clientWidth) / 2;
            if (breadcrumbsMargin > 0) {
                breadcrumbs.style.marginLeft = `-${breadcrumbsMargin}px`;
                breadcrumbs.style.width = '100vw';
            };
        };
        const pageTitle = document.querySelector('title').textContent.toLowerCase();
        if (pageTitle.includes('partnership')) {
            document.querySelector('.ss-editor-content p:last-child').classList.add('partnerships');
        } else if (pageTitle.includes('schools')) {
            addTask(() => new Promise(resolve => {
                var schoolsPageInterval = setInterval(() => {
                    if ((document.querySelectorAll('main .ss-component-column-wrapper.ss-three-column > :has(img) > :first-child a[style]').length === 3) || (document.querySelectorAll('main .ss-component-column-wrapper.ss-three-column > :has(img) > :first-child a img[height]').length === 3)) {
                        var minHeight = Array.from(document.querySelectorAll('main .ss-component-column-wrapper.ss-three-column > :has(img) > :first-child img')).map(img => img.clientHeight).sort()[0];
                        for (var img of document.querySelectorAll('main .ss-component-column-wrapper.ss-three-column > :has(img) > :first-child a')) {
                            img.style.height = `${minHeight}px`;
                            img.style.width = 'unset';
                            img.style.borderRadius = '10px';
                        };
                        clearInterval(schoolsPageInterval);
                        resolve();
                    };
                }, 100);
            }));
        } else if (pageTitle.includes('home new')) {
            var firstSection = document.querySelector('.stack_sort_area').children[0];
            if (firstSection.querySelector('.spotlight-container')) Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
                addTask(() => new Promise(resolve => {
                    var homepageShowcaseHeightInterval = setInterval(() => {
                        if (header.hasAttribute('style')) {
                            for (var slide of firstSection.querySelectorAll('.spotlight-slide')) {
                                if (window.innerWidth <= 1000) {
                                    slide.style.height = `calc(100vh - ${header.clientHeight + document.querySelector('.spotlight-nav-container').clientHeight}px)`;
                                } else if (window.innerWidth > 1300) {
                                    if (document.querySelector('.stack_sort_area > * + section').classList.contains('ss-icon-matrix')) {
                                        slide.style.height = `calc(100vh - ${header.clientHeight + document.querySelector('.stack_sort_area').children[1].clientHeight}px)`;
                                        document.querySelector('.spotlight-wrapper').style.height = `calc(100vh - ${header.clientHeight + document.querySelector('.stack_sort_area').children[1].clientHeight}px)`;
                                    } else {
                                        slide.style.height = `calc(100vh - ${header.clientHeight + document.querySelector('.spotlight-nav-container').clientHeight}px)`;
                                        document.querySelector('.spotlight-wrapper').style.height = `calc(100vh - ${header.clientHeight + document.querySelector('.spotlight-nav-container').clientHeight}px)`;
                                    };
                                } else {
                                    if (document.querySelector('.stack_sort_area > * + section').classList.contains('ss-icon-matrix')) {
                                        slide.style.minHeight = `calc(100vh - ${header.clientHeight + document.querySelector('.stack_sort_area').children[1].clientHeight}px)`;
                                        document.querySelector('.spotlight-wrapper').style.minHeight = `calc(100vh - ${header.clientHeight + document.querySelector('.stack_sort_area').children[1].clientHeight}px)`;
                                    } else {
                                        slide.style.minHeight = `calc(100vh - ${header.clientHeight + document.querySelector('.spotlight-nav-container').clientHeight}px)`;
                                        document.querySelector('.spotlight-wrapper').style.minHeight = `calc(100vh - ${header.clientHeight + document.querySelector('.spotlight-nav-container').clientHeight}px)`;
                                    };
                                };
                            };
                            clearInterval(homepageShowcaseHeightInterval);
                            resolve();
                        };
                    }, 100);
                }));
            });
            addTask(() => new Promise(resolve => {
                var homepageAboutImagesInterval = setInterval(() => {
                    if ((document.querySelectorAll('.ss-image-link[style]').length === 3) || (document.querySelectorAll('.ss-image-link img[height]').length === 3)) {
                        document.querySelector('section:has(.ss-image-link[style]), section:has(.ss-image-link img[height])').style.padding = 'min(70px, 7vh) min(20px, 2vw)';
                        for (var img of document.querySelectorAll('.ss-image-link, .ss-image-link img')) {
                            img.style.width = '100%';
                            img.removeAttribute('height');
                        };
                        var minHeight = Array.from(document.querySelectorAll('.ss-image-link img')).map(img => img.clientHeight).sort()[0];
                        if (minHeight > 0) {
                            for (var img of document.querySelectorAll('.ss-image-link')) {
                                img.style.height = `${minHeight}px`;
                                img.style.borderRadius = '10px';
                                if (window.innerWidth <= 1000) img.style.width = '100%';
                            };
                            clearInterval(homepageAboutImagesInterval);
                            resolve();
                        };
                    };
                }, 100);
            }));
            var statsSection = document.querySelectorAll('section:has(.ss-im-icons-list)')[1];
            if (statsSection) {
                statsSection.style.overflow = 'hidden';
                var parallaxSection = statsSection.nextElementSibling;
                if (parallaxSection) {
                    var parallaxImage = parallaxSection.querySelector('img.rellax');
                    if (parallaxImage) {
                        statsSection.appendChild(parallaxImage);
                        parallaxSection.remove();
                        parallaxImage.src = getComputedStyle(statsSection)['background-image'].split('"')[1].split('"')[0];
                        parallaxImage.classList.add('parallax-image');
                        statsSection.style.background = 'none';
                    };
                };
            };
        } else if (pageTitle.includes('site map')) {
            var siteMapSearch = document.createElement('input');
            siteMapSearch.type = 'text';
            siteMapSearch.placeholder = 'Search site map...';
            siteMapSearch.className = 'sitemap-search';
            document.querySelector('.pageBody').prepend(siteMapSearch);
            siteMapSearch.focus();
            siteMapSearch.addEventListener('input', (event) => {
                const searchTerm = event.target.value.toLowerCase();
                for (var block of document.querySelectorAll('.sitemap-block')) block.style.display = block.innerText.toLowerCase().includes(searchTerm) ? 'flex' : 'none';
            });
            var masonry = document.createElement('div');
            masonry.className = 'sitemap-masonry desktop';
            var mobileMasonry = document.createElement('div');
            mobileMasonry.className = 'sitemap-masonry mobile';
            var tabletMasonry = document.createElement('div');
            tabletMasonry.className = 'sitemap-masonry tablet';
            var column1 = document.createElement('div');
            var column2 = document.createElement('div');
            var column3 = document.createElement('div');
            var tabletColumn1 = document.createElement('div');
            var tabletColumn2 = document.createElement('div');
            column1.className = 'sitemap-column';
            column2.className = 'sitemap-column';
            column3.className = 'sitemap-column';
            tabletColumn1.className = 'sitemap-column';
            tabletColumn2.className = 'sitemap-column';
            var blocks = [];
            function createSitemapBlock(block) {
                var blockLink = block.querySelector('a');
                var newLink = document.createElement('div');
                newLink.className = 'sitemap-block';
                newLink.innerHTML = `<a href="${blockLink.href}">${blockLink.innerText}</a>`;
                if (block.querySelector('ul')) {
                    var leaves = Array.from(block.querySelector('ul').children).filter(li => !li.querySelector('ul'));
                    var branches = Array.from(block.querySelector('ul').children).filter(li => li.querySelector('ul'));
                    // console.log(link.innerText, leaves.length, branches.length);
                    if (leaves.length) {
                        newLink.innerHTML += `<hr>`;
                        for (var leaf of leaves) {
                            var subLink = leaf.querySelector('a');
                            var newSubLink = document.createElement('a');
                            newSubLink.className = 'sitemap-sublink';
                            newSubLink.href = subLink.href;
                            newSubLink.innerText = subLink.innerText;
                            newLink.appendChild(newSubLink);
                        };
                    };
                    for (var branch of branches) createSitemapBlock(branch);
                };
                blocks.push({
                    'name': blockLink.innerText,
                    'element': newLink,
                });
            };
            for (var block of document.querySelectorAll('.pageBody > ul > li')) createSitemapBlock(block);
            blocks.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            });
            for (var currentBlock in blocks) {
                var block = blocks[currentBlock];
                if ((currentBlock % 3) === 0) {
                    column1.appendChild(block.element);
                } else if ((currentBlock % 3) === 1) {
                    column2.appendChild(block.element);
                } else {
                    column3.appendChild(block.element);
                };
                if ((currentBlock % 2) === 0) {
                    tabletColumn1.appendChild(block.element.cloneNode(true));
                } else if ((currentBlock % 2) === 1) {
                    tabletColumn2.appendChild(block.element.cloneNode(true));
                };
                mobileMasonry.appendChild(block.element.cloneNode(true));
            };
            masonry.appendChild(column1);
            masonry.appendChild(column2);
            masonry.appendChild(column3);
            tabletMasonry.appendChild(tabletColumn1);
            tabletMasonry.appendChild(tabletColumn2);
            document.querySelector('.pageBody').appendChild(masonry);
            document.querySelector('.pageBody').appendChild(mobileMasonry);
            document.querySelector('.pageBody').appendChild(tabletMasonry);
            document.querySelector('.pageBody > ul').remove();
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('s')) {
                siteMapSearch.value = urlParams.get('s');
                siteMapSearch.dispatchEvent(new Event('input'));
            };
        } else if (pageTitle.includes('search results')) {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('s')) {
                document.getElementById('search_field').value = urlParams.get('s');
                document.querySelector('.search-btn button').click();
            };
        };
        var fontN = 0;
        var headerN = 0;
        // const fontValues = ['', '1', '2', '3', '4'];
        const fontValues = ['', '1', '2'];
        const headerValues = ['', '1', '2', '3', '4', '5'];
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowUp':
                    fontN = (fontN + 1) % fontValues.length;
                    updateAttribute('font', fontValues[fontN]);
                    break;
                case 'ArrowDown':
                    fontN = (fontN - 1 + fontValues.length) % fontValues.length;
                    updateAttribute('font', fontValues[fontN]);
                    break;
                case 'ArrowRight':
                    headerN = (headerN + 1) % headerValues.length;
                    updateAttribute('header', headerValues[headerN]);
                    break;
                case 'ArrowLeft':
                    headerN = (headerN - 1 + headerValues.length) % headerValues.length;
                    updateAttribute('header', headerValues[headerN]);
                    break;
            }
        });
        function updateAttribute(name, value) {
            if (value === '') {
                document.documentElement.removeAttribute(name);
            } else {
                document.documentElement.setAttribute(name, value);
            };
        };
        if (document.querySelector('footer a')) document.querySelector('footer a').href = 'https://maps.app.goo.gl/TPDs2TqNehEzxuMY8';
        for (var btn of document.querySelectorAll('a.btn')) {
            if (btn.querySelector('.ss-button-icon')) continue;
            const icon = document.createElement('span');
            icon.setAttribute('aria-hidden', 'true');
            icon.className = 'ss-button-icon';
            btn.appendChild(icon);
        };
        const bodyObserver = new MutationObserver(mutations => {
            for (var mutation of mutations) {
                for (var node of mutation.addedNodes) {
                    if (node.classList && node.classList.contains('modal-backdrop') && (document.querySelectorAll('.modal-backdrop').length > 1)) node.remove();
                };
            };
        });
        bodyObserver.observe(document.body, { childList: true });
        addTask(() => new Promise(resolve => {
            var languagesInterval = setInterval(() => {
                if (document.getElementById('GoogleTranslate')?.options.length) {
                    clearInterval(languagesInterval);
                    var languages = Array.from(document.getElementById('GoogleTranslate').options).slice(1).map(option => {
                        return {
                            'language': option.innerText,
                            'code': option.value,
                        };
                    });
                    languages.push({
                        'language': 'English',
                        'code': '',
                    });
                    if (languages.find(lang => lang.code === 'nhe')) languages.find(lang => lang.code === 'nhe').language = 'Nahuatl';
                    for (var lang of languages) {
                        if (lang.language.includes('(') && lang.language.includes(')')) {
                            const mainLanguage = lang.language.split('(')[0].trim();
                            const subLanguage = lang.language.split('(')[1].split(')')[0].trim();
                            lang.language = `${mainLanguage}, ${subLanguage}`;
                        } else if (lang.language.includes('(') || lang.language.includes(')')) {
                            lang.language = lang.language.replace('(', '').replace(')', '').trim();
                        };
                    };
                    languages.sort((a, b) => {
                        if (a.code === '') return -1;
                        if (b.code === '') return 1;
                        if (a.code === 'es') return -1;
                        if (b.code === 'es') return 1;
                        if (a.code === 'ur') return -1;
                        if (b.code === 'ur') return 1;
                        return 0;
                    });
                    document.querySelectorAll('header .translate > a, header > nav:not(.ss-site-header-main-nav-mobile) > a:last-of-type').forEach(translateButton => {
                        var languageSelector = document.createElement('div');
                        languageSelector.className = 'languageSelector notranslate';
                        languageSelector.innerHTML = `<b>Site Language</b><input type="text" id="languageSearch" placeholder="Search languages..." /><div class="languageOptions">${languages.map(lang => `<span data-code="${lang.code}">${lang.language}</span>`).join('')}</div>`;
                        translateButton.parentElement.appendChild(languageSelector);
                        translateButton.addEventListener('click', (event) => {
                            event.preventDefault();
                            var languageSelector = translateButton.parentElement.querySelector('.languageSelector');
                            languageSelector.classList.toggle('active');
                            if (languageSelector.classList.contains('active')) setTimeout(() => {
                                languageSelector.querySelector('#languageSearch').focus();
                                languageSelector.scrollTop = 0;
                            }, 100);
                            document.querySelector('.pageSections')?.classList.remove('active');
                        });
                        translateButton.parentElement.querySelector('.languageSelector #languageSearch').addEventListener('input', (event) => {
                            const searchTerm = event.target.value.toLowerCase();
                            for (var option of translateButton.parentElement.querySelectorAll('.languageSelector .languageOptions span')) option.style.display = option.innerText.toLowerCase().includes(searchTerm) ? 'block' : 'none';
                        });
                        translateButton.parentElement.querySelectorAll('.languageSelector .languageOptions span').forEach(option => {
                            if (option.getAttribute('data-code') === '') option.classList.add('active');
                            option.addEventListener('click', () => {
                                if (option.classList.contains('active')) return;
                                option.classList.add('active');
                                resetTranslate();
                                if (option.getAttribute('data-code')) {
                                    document.getElementById('GoogleTranslate').value = option.getAttribute('data-code');
                                    document.getElementById('GoogleTranslate').dispatchEvent(new Event('change'));
                                    translateButton.parentElement.querySelector('.languageSelector').classList.remove('active');
                                };
                            });
                        });
                    });
                    document.addEventListener('click', (event) => {
                        if (!event.target.closest('.languageSelector') && !event.target.closest('header .translate > a, header > nav:not(.ss-site-header-main-nav-mobile) > a:last-of-type')) for (var languageSelector of document.querySelectorAll('.languageSelector')) languageSelector.classList.remove('active');
                    });
                    document.addEventListener('keydown', (event) => {
                        if (event.key === 'Escape') for (var languageSelector of document.querySelectorAll('.languageSelector')) languageSelector.classList.remove('active');
                    });
                    const htmlObserver = new MutationObserver(mutations => {
                        for (var mutation of mutations) {
                            if (mutation.attributeName !== 'lang') continue;
                            var langCode = document.documentElement.getAttribute('lang');
                            var langName = languages.find(lang => lang.code === langCode)?.language || langCode;
                            console.log(`Language changing to ${langName} (${langCode})`);
                            for (var el of document.querySelectorAll('[lang]:not(html), a:not([tabindex]), img[alt]')) el.style.display = '';
                            if ((langCode !== 'auto') && (langCode !== 'en') && (langCode !== '')) {
                                for (var section of document.querySelectorAll('section')) {
                                    var totalFound = [];
                                    for (var el of section.querySelectorAll('[lang]:not(html)')) {
                                        if (el.getAttribute('lang') === langCode) {
                                            el.style.display = 'none';
                                        } else {
                                            totalFound.push(el);
                                        };
                                    };
                                    for (var el of section.querySelectorAll('a:not([tabindex])')) {
                                        if (!languages.map(lang => lang.language).some(lang => el.innerText.toLowerCase().includes(lang.toLowerCase()))) continue;
                                        if (!el.innerText.toLowerCase().includes(langName.toLowerCase())) {
                                            el.style.display = 'none';
                                        } else {
                                            totalFound.push(el);
                                        };
                                    };
                                    for (var el of section.querySelectorAll('img[alt]')) {
                                        if (!languages.map(lang => lang.language).some(lang => el.alt.toLowerCase().includes(lang.toLowerCase()))) continue;
                                        if (!el.alt.toLowerCase().includes(langName.toLowerCase())) {
                                            el.style.display = 'none';
                                        } else {
                                            totalFound.push(el);
                                        };
                                    };
                                    if (totalFound.length === 0) for (var el of section.querySelectorAll('[lang]:not(html), a:not([tabindex]), img[alt]')) el.style.display = '';
                                };
                            };
                            for (var translateButton of header.querySelectorAll('.translate > a, header > nav:not(.ss-site-header-main-nav-mobile) > a:last-of-type')) {
                                for (var option of translateButton.parentElement.querySelectorAll('.languageSelector .languageOptions span')) option.classList.toggle('active', (option.getAttribute('data-code') === langCode) || ((option.getAttribute('data-code') === '') && (langCode === 'en')));
                            };
                            console.log(`Language changed to ${langName} (${langCode})`);
                        };
                    });
                    htmlObserver.observe(document.documentElement, { attributes: true });
                    resolve();
                }
            }, 500);
        }));
        pageSections = Array.from(document.querySelectorAll('section:not(.ss-hidden-component).ss-has-bg:has(.ss-component-content .ss-one-column .ss-component-column h3):not(:has(.stack_off)), section:not(.ss-hidden-component).ss-has-bg:has(.ss-component-content .ss-one-column .ss-component-column span):not(:has(.stack_off)), section:not(.ss-hidden-component):has(.ss-component-header-title)')).filter(section => section.querySelector('.ss-component-header-title') ? true : (section.querySelector('.ss-component-content .ss-one-column .ss-component-column').children.length === 1)).map(section => {
            var title = section.querySelector('.ss-component-content .ss-one-column .ss-component-column h3, .ss-component-content .ss-one-column .ss-component-column span, .ss-component-header-title').innerText;
            section.classList.add('pageSection');
            return {
                'element': section,
                'id': section.id,
                'title': title,
                'slug': title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
            };
        }).filter(section => (section.title.trim() !== '') && !section.title.toLowerCase().includes('customelement'));
        if (pageSections.length > 1) {
            var pageSectionsLink = document.createElement('a');
            pageSectionsLink.className = 'pageSectionsToggle';
            pageSectionsLink.setAttribute('role', 'button');
            pageSectionsLink.setAttribute('tabindex', '0');
            var pageSectionsIcon = document.createElement('i');
            pageSectionsIcon.classList = 'fa-solid fa-list';
            pageSectionsLink.appendChild(pageSectionsIcon);
            var pageSectionsDiv = document.createElement('div');
            pageSectionsDiv.className = 'pageSections';
            pageSectionsDiv.innerHTML = `<b>On This Page</b><ul class="pageSectionsList"></ul>`;
            for (var pageSection of pageSections) {
                var pageSectionLi = document.createElement('li');
                let pageSectionLink = document.createElement('a');
                pageSectionLink.href = `#${pageSection.slug}`;
                pageSectionLink.innerText = pageSection.title;
                pageSectionLi.appendChild(pageSectionLink);
                pageSectionsDiv.querySelector('.pageSectionsList').appendChild(pageSectionLi);
                pageSectionLi.addEventListener('click', () => {
                    if (window.location.hash === pageSectionLink.getAttribute('href')) scrollToHash();
                });
            };
            pageSectionsLink.appendChild(pageSectionsDiv);
            nav.prepend(pageSectionsLink);
            pageSectionsLink.addEventListener('click', (event) => {
                if (event.target.closest('.pageSectionsList a')) return;
                pageSectionsDiv.classList.toggle('active');
                for (var languageSelector of document.querySelectorAll('.languageSelector')) languageSelector.classList.remove('active');
            });
            pageSectionsLink.addEventListener('keydown', (event) => {
                if ((event.key === 'Enter') || (event.key === ' ')) {
                    event.preventDefault();
                    pageSectionsDiv.classList.toggle('active');
                };
            });
            document.addEventListener('click', (event) => {
                if (!event.target.closest('.pageSections') && !event.target.closest('.pageSectionsToggle')) pageSectionsDiv.classList.remove('active');
            });
        };
        for (var section of document.querySelectorAll('section:has(.ss-component-header-title)')) {
            var pageRedBar = section.querySelector('.ss-component-header-title');
            // console.log(section, pageRedBar, pageRedBar.innerText, pageRedBar.innerText.includes('customElement.'))
            if (pageRedBar.innerText.includes('customElement.')) {
                section.classList.add('customElement');
                for (var part of pageRedBar.innerText.split('customElement.')[1].split('.')) section.classList.add(part);
                var customElement = pageRedBar.innerText.split('customElement.')[1].split('.')[0];
                section.setAttribute('customElement', customElement);
                section.querySelector('.ss-component-header').remove();
            };
        };
        document.querySelectorAll('section.customElement[customelement]').forEach(section => {
            switch (section.getAttribute('customelement')) {
                case 'staff':
                    for (var wrapper of section.querySelectorAll('.ss-im-icon-wrapper-inner')) {
                        const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
                        const emailMatch = wrapper.innerText.match(emailPattern);
                        const email = emailMatch ? emailMatch[0] : null;
                        const phonePattern = /(?:\+?\d{1,3}\s*)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}(?:\s*(?:ext\.?|x)\s*\d+)?/i;
                        const phoneMatch = wrapper.innerText.match(phonePattern);
                        const phone = phoneMatch ? phoneMatch[0].replaceAll('.', '').replaceAll(' ', '').replaceAll('ext', ',').replaceAll('Ext', ',').replaceAll('(', '').replaceAll(')', '') : null;
                        if (email) {
                            const emailLink = document.createElement('a');
                            emailLink.href = `mailto:${email}`;
                            emailLink.innerHTML = '<i class="fa-solid fa-envelope"></i>';
                            emailLink.classList.add('email');
                            wrapper.appendChild(emailLink);
                        };
                        if (phone) {
                            const phoneLink = document.createElement('a');
                            phoneLink.href = `tel:${phone.replaceAll(' ', '').replaceAll('-', '').replaceAll('.', '')}`;
                            phoneLink.innerHTML = '<i class="fa-solid fa-phone"></i>';
                            phoneLink.classList.add('phone');
                            wrapper.appendChild(phoneLink);
                        };
                        if (wrapper.querySelector('.ss-icon-title') && (loggedInUser.email && email && (loggedInUser.email.toLowerCase() === email.toLowerCase())) || (loggedInUser.full_name && (wrapper.querySelector('.ss-icon-title').innerText.toLowerCase() === loggedInUser.full_name.toLowerCase()))) wrapper.querySelector('.ss-icon-title').innerText += ' (You)';
                    };
                    break;
                case 'spotlight':
                    var spotlightWrapper = document.createElement('div');
                    spotlightWrapper.className = 'spotlight-wrapper';
                    if (window.innerWidth > 1000) {
                        section.parentElement.insertBefore(spotlightWrapper, section);
                        spotlightWrapper.appendChild(section);
                    } else {
                        document.querySelector('.stack_sort_area').insertBefore(spotlightWrapper, document.querySelector('.stack_sort_area').children[2]);
                    };
                    var spotlightSidebar = document.createElement('div');
                    spotlightSidebar.className = 'spotlight-sidebar';
                    spotlightWrapper.appendChild(spotlightSidebar);
                    if (window.innerWidth > 1000) spotlightSidebar.innerHTML = `<div class="spotlight-info"><i class="fa-solid fa-chevron-left"></i><h3>${section.querySelector('.carousel-inner > .item.active .spotlight-slide-title').innerText}</h3><p>${section.querySelector('.carousel-inner > .item.active .spotlight-text-cta-container').innerText}</p></div>`;
                    addTask(() => new Promise(resolve => {
                        var homepageEventsInterval = setInterval(() => {
                            if (document.querySelectorAll('.customElement.spotlightCalendar .slick-slide:not(.slick-cloned) calendar-event').length) {
                                clearInterval(homepageEventsInterval);
                                var eventGroups = [];
                                for (var event of document.querySelectorAll('.customElement.spotlightCalendar .slick-slide:not(.slick-cloned) calendar-event')) {
                                    var eventDiv = event.shadowRoot.querySelector('.calendar-event-container');
                                    var eventDate = eventDiv.querySelector('.event-date-container').innerText.replaceAll('\n', ' ').trim();
                                    var eventTitleDiv = eventDiv.querySelector('.event-title a');
                                    var eventLink = eventTitleDiv.getAttribute('href');
                                    var eventTitle = eventTitleDiv.innerText.trim();
                                    var eventTime = eventDiv.querySelector('.event-time').innerText.trim();
                                    if (!eventGroups.find(eventGroup => eventGroup.name === eventDate) || !eventGroups.find(eventGroup => eventGroup.name === eventDate).events.find(event => (event.link === eventLink))) {
                                        if (!eventGroups.find(eventGroup => eventGroup.name === eventDate)) eventGroups.push({
                                            name: eventDate,
                                            events: [],
                                        });
                                        eventGroups.find(eventGroup => eventGroup.name === eventDate).events.push({
                                            link: eventLink,
                                            title: eventTitle,
                                            date: eventDate.slice(eventDate.indexOf(' ') + 1),
                                            time: eventTime
                                        });
                                    };
                                };
                                if (eventGroups.length) {
                                    var eventsContainer = document.createElement('div');
                                    eventsContainer.className = 'events-container';
                                    var now = new Date();
                                    var today = now.toLocaleDateString(undefined, { month: 'short', day: '2-digit' });
                                    var tomorrow = (new Date(now.getTime() + 24 * 60 * 60 * 1000)).toLocaleDateString(undefined, { month: 'short', day: '2-digit' });
                                    const months = {
                                        Jan: 'January',
                                        Feb: 'February',
                                        Mar: 'March',
                                        Apr: 'April',
                                        May: 'May',
                                        Jun: 'June',
                                        Jul: 'July',
                                        Aug: 'August',
                                        Sep: 'September',
                                        Oct: 'October',
                                        Nov: 'November',
                                        Dec: 'December',
                                    };
                                    if (window.innerWidth <= 1000) eventGroups = eventGroups.slice(0, 1);
                                    for (var eventGroupN in eventGroups) {
                                        var eventGroup = eventGroups[eventGroupN];
                                        var eventsTitle = Number(eventGroupN) ? document.createElement('p') : document.createElement('h2');
                                        if (eventGroup.name.endsWith(today)) {
                                            eventsTitle.innerText = `Today's Events`;
                                            eventsContainer.append(eventsTitle);
                                        } else if (eventGroup.name.endsWith(tomorrow)) {
                                            eventsTitle.innerText = 'Tomorrow';
                                            eventsContainer.append(eventsTitle);
                                        } else {
                                            var [day, mon, date] = eventGroup.name.split(' ');
                                            eventsTitle.innerText = `${day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}, ${months[mon]} ${parseInt(date, 10) + (["th", "st", "nd", "rd"][((["th", "st", "nd", "rd"] % 100) - 20) % 10] || ["th", "st", "nd", "rd"][(parseInt(date, 10) % 100)] || ["th", "st", "nd", "rd"][0])}`;
                                            eventsContainer.append(eventsTitle);
                                        };
                                        for (var event of eventGroup.events) {
                                            var eventLink = document.createElement('a');
                                            eventLink.href = event.link;
                                            eventLink.classList.add('event');
                                            eventLink.innerHTML = `<div class="event-date">${event.date.replace(' ', '<br>')}</div><div class="event-info"><b>${event.title}</b><p>${event.time}</p></div>`;
                                            eventsContainer.appendChild(eventLink);
                                        };
                                    };
                                    spotlightSidebar.prepend(eventsContainer);
                                };
                                document.querySelector('.customElement.spotlightCalendar')?.remove();
                                resolve();
                            };
                        }, 500);
                    }));
                    if (window.innerWidth <= 1000) break;
                    const carouselObserver = new MutationObserver(mutations => {
                        for (var mutation of mutations) {
                            if (mutation.attributeName !== 'class') continue;
                            if (mutation.target.classList.contains('item') && mutation.target.classList.contains('active') && !mutation.target.classList.contains('left')) {
                                document.querySelector('.spotlight-sidebar .spotlight-info h3').innerText = mutation.target.querySelector('.spotlight-slide-title').innerText.replaceAll('\n', '');
                                document.querySelector('.spotlight-sidebar .spotlight-info p').innerText = mutation.target.querySelector('.spotlight-text-cta-container').innerText.replaceAll('\n', '');
                            };
                        };
                    });
                    for (var item of section.querySelectorAll('.carousel-inner > .item')) carouselObserver.observe(item, { attributeFilter: ['class'] });
                    document.addEventListener('keydown', e => {
                        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
                        switch (e.key) {
                            case 'ArrowLeft':
                                section.querySelector('.carousel-nav-option-prev').click();
                                break;
                            case 'ArrowRight':
                                section.querySelector('.carousel-nav-option-next').click();
                                break;
                        };
                    });
                    break;
                case 'about':
                    // section.querySelector('.ss-column-one').innerHTML += '<p>&nbsp;</p>';
                    // var sectionsOnPageDiv = document.createElement('div');
                    // sectionsOnPageDiv.className = 'sectionsOnPage';
                    // sectionsOnPageDiv.innerHTML = `<b>On This Page</b><ul class="sectionsOnPageList"></ul>`;
                    // section.querySelector('.ss-column-one').append(sectionsOnPageDiv);
                    // for (var sectionInfo of pageSections.slice(1)) sectionsOnPageDiv.querySelector('ul').innerHTML += `<li><a href="#${sectionInfo.id}">${sectionInfo.title}</a></li>`;
                    for (var ul of section.querySelectorAll('.ss-column-one div > ul')) {
                        var lis = ul.querySelectorAll('li');
                        var removeLi = Array.from(lis).find(li => li.innerText.toLowerCase().includes('page sections here'));
                        if (!removeLi) continue;
                        for (var sectionInfo of pageSections.slice(1).reverse()) {
                            let newLi = document.createElement('li');
                            newLi.innerHTML = `<a href="#${sectionInfo.slug}">${sectionInfo.title}</a>`;
                            removeLi.parentNode.insertBefore(newLi, removeLi.nextSibling);
                            newLi.addEventListener('click', () => {
                                if (window.location.hash === newLi.querySelector('a').getAttribute('href')) scrollToHash();
                            });
                        };
                        removeLi.remove();
                    };
                    section.querySelectorAll('img, video').forEach(aboutImage => {
                        if (aboutImage && (window.innerWidth > 1000) && (aboutImage.style.maxWidth === 'min(750px, 100%)') && (aboutImage.style.borderRadius === '10px')) {
                            aboutImage.classList.add('aboutImage');
                            // aboutImage.style.transition = 'width .25s';
                            // var settingAboutImageSize = false;
                            // function setAboutImageSize() {
                            //     if (settingAboutImageSize) return;
                            //     settingAboutImageSize = true;
                            //     requestAnimationFrame(() => {
                            //         const rect = aboutImage.getBoundingClientRect();
                            //         const parentWidth = aboutImage.parentElement.getBoundingClientRect().width;
                            //         const newWidth = Math.max(Math.max(0, Math.min(rect.bottom, window.innerHeight || document.documentElement.clientHeight) - Math.max(rect.top, 0)) / rect.height * Math.min(750, parentWidth), Math.min(300, parentWidth)) + 'px';
                            //         aboutImage.style.width = newWidth;
                            //         settingAboutImageSize = false;
                            //     });
                            // };
                            // document.addEventListener('scroll', setAboutImageSize);
                            // setAboutImageSize();
                        };
                    });
                    break;
                case 'links':
                    if (!section.querySelector('.ss-editor-content').innerText.toLowerCase().includes('page sections here')) break;
                    section.querySelector('.ss-editor-content').innerHTML = section.querySelector('.ss-editor-content').innerHTML.replace(/page sections here/i, '');
                    if (section.querySelector('.ss-editor-content').innerText.trim() === '') section.querySelector('.ss-editor-content').remove();
                    for (var container of section.querySelectorAll('.stack-link-container:has(a)')) {
                        let link = container.querySelector('a');
                        if (pageSections.find(pageSection => pageSection.title.toLowerCase() === link.innerText.toLowerCase())) link.href = `#${pageSections.find(pageSection => pageSection.title.toLowerCase() === link.innerText.toLowerCase()).slug}`;
                        link.addEventListener('click', () => {
                            if (window.location.hash === link.getAttribute('href')) scrollToHash();
                        });
                        container.addEventListener('click', () => {
                            if (window.location.hash === link.getAttribute('href')) scrollToHash();
                            window.location.href = link.href;
                        });
                    };
                    break;
                case 'tabbedElements':
                    var tabs = section.querySelectorAll('.ss-tab');
                    var allTabsTargetElements = [];
                    for (var tab of tabs) {
                        var targetElements = [];
                        try {
                            targetElements = document.querySelectorAll(('.' + document.getElementById(tab.getAttribute('aria-controls')).innerText.trim()).replaceAll('..', '.'));
                        } catch (e) {
                            console.error(e);
                        };
                        // console.log(('.' + document.getElementById(tab.getAttribute('aria-controls')).innerText.trim()).replaceAll('..', '.'), targetElements)
                        allTabsTargetElements = allTabsTargetElements.concat(Array.from(targetElements));
                        if (targetElements.length) document.getElementById(tab.getAttribute('aria-controls')).style.display = 'none';
                        for (var targetElement of targetElements) {
                            if (targetElement.classList.contains('customElement')) {
                                if (!targetElement.classList.contains('ss-has-bg')) targetElement.classList.remove('break-out');
                            } else {
                                targetElement.style.display = 'none';
                            };
                        };
                        tab.addEventListener('click', (event) => {
                            for (var el of allTabsTargetElements) {
                                if (el.classList.contains('customElement')) {
                                    el.classList.remove('active');
                                } else {
                                    el.style.display = 'none';
                                };
                            };
                            var targetElements = [];
                            try {
                                targetElements = document.querySelectorAll(('.' + document.getElementById(event.target.getAttribute('aria-controls')).innerText.trim()).replaceAll('..', '.'));
                            } catch (e) {
                                console.error(e);
                            };
                            // console.log('to', targetElements)
                            for (var targetElement of targetElements) {
                                if (targetElement.classList.contains('customElement')) {
                                    targetElement.classList.add('active');
                                } else {
                                    targetElement.style.display = '';
                                };
                            };
                        });
                        tab.addEventListener('keydown', (event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                tab.click();
                            };
                        });
                    };
                    if (tabs.length) tabs[0].click();
                    break;
            };
        });
        for (var link of document.querySelectorAll('a[href]')) {
            if (link.getAttribute('href') === '') {
                var newLink = document.createElement('div');
                newLink.className = link.className;
                newLink.innerHTML = link.innerHTML;
                link.replaceWith(newLink);
            } else if ((link.getAttribute('href') === '#') || (link.getAttribute('href') === window.location.href)) {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            };
        };
        if (window.innerWidth <= 560) document.addEventListener('scroll', () => {
            document.querySelector('header .ss-site-header-main-links-container > a.forest').style.marginLeft = `-${Math.min(window.scrollY, 50)}px`;
            document.querySelector('header .ss-site-header-main-links-container > a.shaw').style.marginTop = `-${Math.min(window.scrollY, 45)}px`;
        });
        const signInLink = loggedInUser.full_name && document.querySelector('footer .school-footer-col:last-of-type nav:last-of-type ul:last-of-type li:last-of-type');
        try {
            signInLink.querySelector('a').innerText = 'Log Out';
            signInLink.querySelector('a').href = `${location.origin}/?logout=true`;
        } catch {
            signInLink?.remove();
        };
        (loggedInUser.full_name && document.querySelector('.adminBar') && document.querySelector('.adminBar').lastElementChild)?.setAttribute('logged-in-as', loggedInUser.full_name);
        async function sequentialRun(taskFactories) {
            const runWithTimeout = (taskFn, t) => Promise.race([
                (async () => {
                    try {
                        return await taskFn();
                    } catch (e) {
                        console.error(e);
                        return null;
                    };
                })(),
                new Promise(resolve => setTimeout(() => resolve(null), t))
            ]);
            try {
                for (const factory of taskFactories) {
                    const taskFn = (typeof factory === 'function') ? factory : () => factory;
                    await runWithTimeout(taskFn, 2000);
                };
            } catch (e) {
                console.error(e);
            };
        };
        try {
            await sequentialRun(tasks, 2000, 5000);
        } catch (err) {
            console.error(err);
        };
        afterReady();
    } catch (err) {
        console.error(err);
        afterReady();
    };
});

function afterReady() {
    if (nav.clientHeight > 75) {
        afterReady();
        return;
    };
    console.log(`Proceeding in ${(new Date().getTime() - startTime) / 1000} seconds`);
    try {
        header.style.paddingBottom = `min(${(nav.clientHeight * ((window.innerWidth <= 1000) ? 0.8 : 1))}px, 59px)`;
        document.documentElement.style.scrollPadding = `${(nav.clientHeight * ((window.innerWidth <= 1000) ? 0.8 : 1))}px`;
        var navMaxTop = header.clientHeight - (nav.clientHeight * ((window.innerWidth <= 1000) ? 0.8 : 1));
        setTimeout(() => {
            navMaxTop = header.clientHeight - (nav.clientHeight * ((window.innerWidth <= 1000) ? 0.8 : 1));
            if (window.scrollY >= navMaxTop) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            };
        }, 100);
        window.addEventListener('scroll', () => {
            if (window.scrollY >= navMaxTop) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            };
        });
        if (window.innerWidth > 1000) header.querySelector('.ss-site-header-hero-container').style.minWidth = `${header.querySelector('.ss-site-header-main-links-container:has(.search)').clientWidth}px`;
        if (location.href.includes('index.php?pageID=') && !location.href.includes('&adminArea')) window.history.replaceState({}, '', location.href.replace('index.php?pageID=', ''));
        setTimeout(() => {
            document.documentElement.classList.add('ready');
            setTimeout(() => {
                document.querySelector('.adminBar').classList.add('visible');
                setTimeout(() => {
                    document.querySelector('.adminBar').classList.remove('visible');
                }, 2500);
            }, 1750);
        }, 100);
    } catch (e) {
        console.error(e);
        document.querySelector('.adminBar').classList.add('visible');
        setTimeout(() => {
            document.querySelector('.adminBar').classList.add('visible');
            setTimeout(() => {
                document.querySelector('.adminBar').classList.remove('visible');
            }, 2500);
        }, 1750);
    };
    var finishTime = new Date().getTime();
    console.log(`Page loaded in ${(finishTime - startTime) / 1000} seconds`);
    scrollToHash();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const matched = pageSections.find(section => section.element === entry.target);
            if (!matched) return;
            if (entry.isIntersecting) {
                intersecting.add(matched);
            } else {
                intersecting.delete(matched);
            };
        });
        if (intersecting.size === 0) {
            clearTimeout(currentSectionTimer);
            currentSectionTimer = null;
            return;
        };
        clearTimeout(currentSectionTimer);
        currentSectionTimer = setTimeout(() => {
            const topmost = [...intersecting].reduce((best, section) => {
                const rect = section.element.getBoundingClientRect();
                return (!best || (rect.top < best.top)) ? {
                    section,
                    top: rect.top
                } : best;
            }, null).section;
            if (topmost && topmost.slug !== currentSlug) {
                currentSlug = topmost.slug;
                window.history.replaceState({}, '', `#${currentSlug}`);
            };
            currentSectionTimer = null;
        }, 2500);
    }, {
        root: null,
        rootMargin: `0px 0px ${window.innerHeight / 5}px`,
        threshold: 0
    });
    pageSections.forEach(section => observer.observe(section.element));
};

var resizeTimeout;
var previousWidth = window.innerWidth;
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    var needsReloading = false;
    if (((previousWidth > 1300) && (newWidth <= 1300)) || ((previousWidth <= 1300) && (newWidth > 1300)) ||
        ((previousWidth > 1023) && (newWidth <= 1023)) || ((previousWidth <= 1023) && (newWidth > 1023)) ||
        ((previousWidth > 1000) && (newWidth <= 1000)) || ((previousWidth <= 1000) && (newWidth > 1000)) ||
        ((previousWidth > 800) && (newWidth <= 800)) || ((previousWidth <= 800) && (newWidth > 800)) ||
        ((previousWidth > 767) && (newWidth <= 767)) || ((previousWidth <= 767) && (newWidth > 767)) ||
        ((previousWidth > 576) && (newWidth <= 576)) || ((previousWidth <= 576) && (newWidth > 576))) needsReloading = true;
    if (needsReloading) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            window.location.reload();
        }, 500);
    } else {
        previousWidth = newWidth;
    };
});

function scrollToHash() {
    if (!window.location.hash || !window.location.hash.split('#')[1]) return;
    var pageSection = pageSections.find(pageSection => pageSection.slug.toLowerCase() === window.location.hash.split('#')[1]);
    if (pageSection) setTimeout(() => {
        pageSection.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
};

window.addEventListener('hashchange', scrollToHash);