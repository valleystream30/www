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
function onReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    };
};
onReady(() => {
    try {
        // document.querySelector('header .ss-site-header-school-tagline').classList.add('customFont');
        var nav = Array.from(document.querySelectorAll('header nav')).find(nav => nav.clientHeight);
        document.querySelector('header').prepend(nav);
        document.querySelector('header').style.paddingTop = `${nav.clientHeight}px`;
        if (window.innerWidth <= 1000) {
            var nav2 = document.createElement('nav');
            nav2.className = 'ss-site-header-main-links-container';
            nav2.style.display = 'flex';
            nav2.style.justifyContent = 'center';
            Array.from(document.querySelectorAll('#ss-schools-modal a')).sort((a, b) => a.innerText.localeCompare(b.innerText)).forEach(schoolLink => {
                var newLink = schoolLink.cloneNode(true);
                newLink.innerText = newLink.innerText.replace(' School', '').replace(' Avenue', ' Ave');
                nav2.append(newLink);
            });
            document.querySelector('header .ss-site-header-main-container').appendChild(nav2);
        } else {
            document.querySelectorAll('.ss-site-header-main-links-container').forEach(nav2 => {
                Array.from(document.querySelectorAll('#ss-schools-modal a')).sort((a, b) => b.innerText.localeCompare(a.innerText)).forEach(schoolLink => {
                    var newLink = schoolLink.cloneNode(true);
                    newLink.innerText = newLink.innerText.replace(' School', '');
                    nav2.prepend(newLink);
                });
            });
        };
        // var newLink = document.createElement('a');
        // newLink.className = 'ss-site-header-title-container';
        // newLink.href = '/';
        // newLink.append(...document.querySelectorAll('header .ss-site-header-title-container *'));
        // document.querySelector('header .ss-site-header-title-container').replaceWith(newLink);
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
            var schoolsPageInterval = setInterval(() => {
                if ((document.querySelectorAll('main .ss-component-column-wrapper.ss-three-column > :has(img) > :first-child a[style]').length === 3) || (document.querySelectorAll('main .ss-component-column-wrapper.ss-three-column > :has(img) > :first-child a img[height]').length === 3)) {
                    var minHeight = Array.from(document.querySelectorAll('main .ss-component-column-wrapper.ss-three-column > :has(img) > :first-child img')).map(img => img.clientHeight).sort()[0];
                    document.querySelectorAll('main .ss-component-column-wrapper.ss-three-column > :has(img) > :first-child a').forEach(img => {
                        img.style.height = `${minHeight}px`;
                        img.style.width = 'unset';
                        img.style.borderRadius = '10px';
                    });
                    clearInterval(schoolsPageInterval);
                };
            }, 100);
        } else if (pageTitle.includes('home')) {
            Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
                var firstSection = document.querySelector('.stack_sort_area').children[0];
                if (firstSection.querySelector('.spotlight-container')) {
                    firstSection.querySelectorAll('.spotlight-slide').forEach(slide => {
                        if (window.innerWidth <= 1000) {
                            slide.style.height = `calc(100vh - ${document.querySelector('header').clientHeight + document.querySelector('.spotlight-nav-container').clientHeight}px)`;
                        } else {
                            slide.style.minHeight = `calc(100vh - ${document.querySelector('header').clientHeight + document.querySelector('.stack_sort_area').children[1].clientHeight}px)`;
                        };
                    });
                };
            });
            var homepageAboutImagesInterval = setInterval(() => {
                if ((document.querySelectorAll('.ss-image-link[style]').length === 3) || (document.querySelectorAll('.ss-image-link img[height]').length === 3)) {
                    document.querySelector('section:has(.ss-image-link[style]), section:has(.ss-image-link img[height])').style.padding = 'min(70px, 7vh) min(20px, 2vw)';
                    document.querySelectorAll('.ss-image-link, .ss-image-link img').forEach(img => {
                        img.style.width = 'unset';
                        img.removeAttribute('height');
                    });
                    var minHeight = Array.from(document.querySelectorAll('.ss-image-link img')).map(img => img.clientHeight).sort()[0];
                    document.querySelectorAll('.ss-image-link').forEach(img => {
                        img.style.height = `${minHeight}px`;
                        img.style.borderRadius = '10px';
                        if (window.innerWidth <= 1000) img.style.width = '100%';
                    });
                    clearInterval(homepageAboutImagesInterval);
                };
            }, 100);
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
                document.querySelectorAll('.sitemap-block').forEach(block => {
                    block.style.display = block.innerText.toLowerCase().includes(searchTerm) ? 'flex' : 'none';
                });
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
                var link = block.querySelector('a');
                var newLink = document.createElement('div');
                newLink.className = 'sitemap-block';
                newLink.innerHTML = `<a href="${link.href}">${link.innerText}</a>`;
                if (block.querySelector('ul')) {
                    var leaves = Array.from(block.querySelector('ul').children).filter(li => !li.querySelector('ul'));
                    var branches = Array.from(block.querySelector('ul').children).filter(li => li.querySelector('ul'));
                    console.log(link.innerText, leaves.length, branches.length);
                    if (leaves.length) {
                        newLink.innerHTML += `<hr>`;
                        leaves.forEach(leaf => {
                            var subLink = leaf.querySelector('a');
                            var newSubLink = document.createElement('a');
                            newSubLink.className = 'sitemap-sublink';
                            newSubLink.href = subLink.href;
                            newSubLink.innerText = subLink.innerText;
                            newLink.appendChild(newSubLink);
                        });
                    };
                    branches.forEach(branch => {
                        createSitemapBlock(branch);
                    });
                };
                blocks.push({
                    'name': link.innerText,
                    'element': newLink,
                });
            };
            document.querySelectorAll('.pageBody > ul > li').forEach(block => {
                createSitemapBlock(block);
            });
            blocks.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            });
            var currentBlock = 0;
            blocks.forEach(block => {
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
                currentBlock++;
            });
            masonry.appendChild(column1);
            masonry.appendChild(column2);
            masonry.appendChild(column3);
            tabletMasonry.appendChild(tabletColumn1);
            tabletMasonry.appendChild(tabletColumn2);
            document.querySelector('.pageBody').appendChild(masonry);
            document.querySelector('.pageBody').appendChild(mobileMasonry);
            document.querySelector('.pageBody').appendChild(tabletMasonry);
            document.querySelector('.pageBody > ul').remove();
        };
        var font = 0;
        var header = 0;
        // const fontValues = ['', '1', '2', '3', '4'];
        const fontValues = ['', '1', '2'];
        const headerValues = ['', '1', '2', '3', '4', '5'];
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowUp':
                    font = (font + 1) % fontValues.length;
                    updateAttribute('font', fontValues[font]);
                    break;
                case 'ArrowDown':
                    font = (font - 1 + fontValues.length) % fontValues.length;
                    updateAttribute('font', fontValues[font]);
                    break;
                case 'ArrowRight':
                    header = (header + 1) % headerValues.length;
                    updateAttribute('header', headerValues[header]);
                    break;
                case 'ArrowLeft':
                    header = (header - 1 + headerValues.length) % headerValues.length;
                    updateAttribute('header', headerValues[header]);
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
        document.querySelector('footer a').href = 'https://maps.app.goo.gl/TPDs2TqNehEzxuMY8';
        document.querySelectorAll('a.btn').forEach(btn => {
            if (btn.querySelector('.ss-button-icon')) return;
            const icon = document.createElement('span');
            icon.setAttribute('aria-hidden', 'true');
            icon.className = 'ss-button-icon';
            btn.appendChild(icon);
        });
        const bodyObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.classList && node.classList.contains('modal-backdrop') && (document.querySelectorAll('.modal-backdrop').length > 1)) node.remove();
                });
            });
        });
        bodyObserver.observe(document.body, { childList: true });
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
                languages.forEach(lang => {
                    if (lang.language.includes('(') && lang.language.includes(')')) {
                        const mainLanguage = lang.language.split('(')[0].trim();
                        const subLanguage = lang.language.split('(')[1].split(')')[0].trim();
                        lang.language = `${mainLanguage}, ${subLanguage}`;
                    } else if (lang.language.includes('(') || lang.language.includes(')')) {
                        lang.language = lang.language.replace('(', '').replace(')', '').trim();
                    };
                });
                languages.sort((a, b) => {
                    if (a.code === '') return -1;
                    if (b.code === '') return 1;
                    if (a.code === 'es') return -1;
                    if (b.code === 'es') return 1;
                    if (a.code === 'ur') return -1;
                    if (b.code === 'ur') return 1;
                    return 0;
                });
                document.querySelectorAll('header .translate > a').forEach(translateButton => {
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
                        }, 100);
                    });
                    translateButton.parentElement.querySelector('.languageSelector #languageSearch').addEventListener('input', (event) => {
                        const searchTerm = event.target.value.toLowerCase();
                        translateButton.parentElement.querySelectorAll('.languageSelector .languageOptions span').forEach(option => {
                            option.style.display = option.innerText.toLowerCase().includes(searchTerm) ? 'block' : 'none';
                        });
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
                    if (!event.target.closest('.languageSelector') && !event.target.closest('.translate')) document.querySelectorAll('.languageSelector').forEach(languageSelector => {
                        languageSelector.classList.remove('active');
                    });
                });
                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape') document.querySelectorAll('.languageSelector').forEach(languageSelector => {
                        languageSelector.classList.remove('active');
                    });
                });
                const htmlObserver = new MutationObserver(mutations => {
                    mutations.forEach(mutation => {
                        if (mutation.attributeName !== 'lang') return;
                        var langCode = document.documentElement.getAttribute('lang');
                        var langName = languages.find(lang => lang.code === langCode)?.language || langCode;
                        console.log(`Language changing to ${langName} (${langCode})`);
                        document.querySelectorAll('[lang]:not(html), a:not([tabindex])').forEach(el => {
                            el.style.display = '';
                        });
                        if ((langCode !== 'auto') && (langCode !== 'en') && (langCode !== '')) {
                            document.querySelectorAll('section').forEach(section => {
                                var totalFound = [];
                                section.querySelectorAll('[lang]:not(html)').forEach(el => {
                                    if (el.getAttribute('lang') === langCode) {
                                        el.style.display = 'none';
                                    } else {
                                        totalFound.push(el);
                                    };
                                });
                                section.querySelectorAll('a:not([tabindex])').forEach(el => {
                                    if (!languages.map(lang => lang.language).some(lang => el.innerText.includes(lang))) return;
                                    if (!el.innerText.includes(langName)) {
                                        el.style.display = 'none';
                                    } else {
                                        totalFound.push(el);
                                    };
                                });
                                if (totalFound.length === 0) section.querySelectorAll('[lang]:not(html), a:not([tabindex])').forEach(el => {
                                    el.style.display = '';
                                });
                            });
                        };
                        document.querySelectorAll('header .translate > a').forEach(translateButton => {
                            translateButton.parentElement.querySelectorAll('.languageSelector .languageOptions span').forEach(option => {
                                option.classList.toggle('active', (option.getAttribute('data-code') === langCode) || ((option.getAttribute('data-code') === '') && (langCode === 'en')));
                            });
                        });
                        console.log(`Language changed to ${langName} (${langCode})`);
                    });
                });
                htmlObserver.observe(document.documentElement, { attributes: true });
            };
        }, 500);
        document.querySelectorAll('section:has(.ss-component-header-title)').forEach(section => {
            var header = section.querySelector('.ss-component-header-title');
            if (header.innerText.includes('customElement.')) {
                var customElement = header.innerText.split('customElement.')[1].trim();
                section.classList.add('customElement', customElement);
                section.querySelector('.ss-component-header').remove();
                switch (customElement) {
                    case 'staff':
                        section.querySelectorAll('.ss-im-icon-wrapper-inner').forEach(wrapper => {
                            const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
                            const emailMatch = wrapper.innerText.match(emailPattern);
                            const email = emailMatch ? emailMatch[0].replaceAll('ext', '#').replaceAll('.', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '') : null;
                            const phonePattern = /(?:\+?\d{1,3}\s*)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}(?:\s*(?:ext\.?|x)\s*\d+)?/i;
                            const phoneMatch = wrapper.innerText.match(phonePattern);
                            const phone = phoneMatch ? phoneMatch[0] : null;
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
                        });
                        break;
                };
            };
        });
        document.querySelectorAll('a[href=""]').forEach(link => {
            var newLink = document.createElement('div');
            newLink.className = link.className;
            newLink.innerHTML = link.innerHTML;
            link.replaceWith(newLink);
        });
        document.querySelectorAll('.customElement.links li').forEach(li => {
            var link = li.querySelector('a');
            if (link) li.addEventListener('click', () => {
                window.location.href = link.href;
            });
        });
        document.documentElement.classList.add('ready');
    } catch (e) {
        console.error(e);
    };
});