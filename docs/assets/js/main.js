/* hide header */
let scrollWidthFunc = () => {
    let scrollWidth = window.innerWidth - document.body.clientWidth;
    document.querySelector('html').style.paddingRight = scrollWidth + 'px';
    document.querySelector('header').style.paddingRight = scrollWidth + 'px';
}
const scrollTop = document.querySelector('.scroll-top');
if (scrollTop)
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

['load', 'resize'].forEach((event) => {
    window.addEventListener(event, function () {
        let headerHeight = header.clientHeight;
        const plashka = header.querySelector('.header__plashka');
        const headerTop = header.querySelector('.header__top');
        if (plashka) {
            var originalHeightPlashka = plashka.offsetHeight;
            var originalHeightHeaderTop = headerTop.offsetHeight;
        }
        window.onscroll = function (e) {
            if (window.scrollY > headerHeight) {
                if (!plashka.classList.contains('hide')) {
                    plashka.classList.add('hide');
                    plashka.style.height = '0px';
                    plashka.style.opacity = '0';
                    plashka.style.overflow = 'hidden';

                    if(window.innerWidth > 1150) {
                        headerTop.classList.add('hide');
                        headerTop.style.height = '0px';
                        headerTop.style.opacity = '0';
                        headerTop.style.overflow = 'hidden';
                    }
                }
            }
            else {
                plashka.style.height = originalHeightPlashka + 'px';
                plashka.classList.remove('hide');
                plashka.style.opacity = '1';
                plashka.style.overflow = 'auto';

                headerTop.style.height = originalHeightHeaderTop + 'px';
                headerTop.classList.remove('hide');
                headerTop.style.opacity = '1';
                headerTop.style.overflow = 'auto';
            }
        };
    })
})
/* hide header */


document.addEventListener("DOMContentLoaded", function () {
    /* burger menu */
    const burgerMenu = document.querySelector('.burger__menu');
    if (burgerMenu) {
        const headerMobile = document.querySelector('.header__menu');
        const header = document.querySelector('.header');
        const plashka = document.querySelector('.header__plashka');
        burgerMenu.addEventListener("click", () => {
            if (burgerMenu.classList.contains('burger__menu--active')) {
                plashka.style.display = 'block';
                document.body.classList.remove('burger-lock');
            }
            else {
                plashka.style.display = 'none';
                document.body.classList.add('burger-lock');
            }
            headerMobile.classList.toggle("header__menu--active");
            burgerMenu.classList.toggle("burger__menu--active");
            header.classList.toggle("header--active");

            document.querySelector('html').classList.toggle('burger-lock');
        });
    }
    /* end burger menu */


    /* close header__discount */
    const discountBlockButton = document.querySelector('.header__discount_close');
    const discountBlock = document.querySelector('.plashka.header__discount');
    const mainContent = document.querySelector('main');
    if (discountBlockButton) {
        discountBlockButton.addEventListener('click', function() {
            discountBlock.classList.add('hidden');
            mainContent.classList.add('shifted');
        });
    }
    /* end close header__discount */


    /*  open menu  */
    const headerNavList = document.querySelectorAll('.hide-item');
	const header = document.querySelector('.header');

	function accordion(e) {
		e.stopPropagation();
		const isActive = this.classList.contains('hide-item--active');
		headerNavList.forEach(item => item.classList.remove('hide-item--active'));

		if (!isActive) {
			this.classList.add('hide-item--active');
			document.body.classList.add('lock');
			document.querySelector('html').classList.add('burger-lock');
		} else {
			document.body.classList.remove('lock');
			document.querySelector('html').classList.remove('burger-lock');
		}
		header.classList.toggle('header--active', !isActive);
	}

	headerNavList.forEach(item => {
		item.addEventListener('click', accordion);
	});

	document.addEventListener('click', function (e) {
		if (!e.target.closest('.header__bottom_nav') && !e.target.closest('.tab__btn')) {
			headerNavList.forEach(item => item.classList.remove('hide-item--active'));
			header.classList.remove('header--active');
			document.body.classList.remove('lock');
			document.querySelector('html').classList.remove('burger-lock');
		}
	});
    /*  end menu  */



	/* open more submenu-lvl3  */
    function updateHeaderMoreButtons() {
        const maxHeightSubmenu = 140; 
        requestAnimationFrame(() => {
            document.querySelectorAll('.header__submenu_more-btn').forEach(button => {
                const sublist = button.previousElementSibling;
                if (sublist.scrollHeight <= maxHeightSubmenu) {
                    button.style.display = 'none';
                } else {
                    button.style.display = 'block';
                }
            });
        });
    }

    document.querySelector('.hide-item_service').addEventListener('click', (button) => {
        if (button) {
            updateHeaderMoreButtons();
        }
    });

	document.querySelectorAll('.header__submenu_more-btn').forEach(button => {
        if (button) {
            button.addEventListener('click', function(event) {
                event.stopPropagation();
                const sublist = this.previousElementSibling; 
                if (sublist && sublist.classList.contains('header__tab-content_item')) {
                    sublist.classList.toggle('open'); 
                    
                    if (sublist.classList.contains('open')) {
                        this.textContent = 'Скрыть';
                    } else {
                        this.textContent = 'Еще';
                    }
                }
            }); 
        }
	});
	/* end open more submenu  */



    /* header tabs */
    const headerSubmenuBtns = document.querySelectorAll('.header__submenu_tab-btn');
    const headerSubmenuContents = document.querySelectorAll('.header__submenu_tab-content');

    headerSubmenuBtns.forEach(button => {
        if(button) {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); 
                const target = document.getElementById(button.dataset.tab);
                headerSubmenuBtns.forEach(btn => btn.classList.remove('active'));
                headerSubmenuContents.forEach(content => content.classList.remove('active'));
                button.classList.add('active');
                target.classList.add('active');

                updateHeaderMoreButtons(); //open more submenu-lvl3
            });            
        }
    });

    if (headerSubmenuBtns.length > 0) {
        headerSubmenuBtns[0].click();
    }
    /* end header tabs */



	/*  Popups  */
	function popupClose(popupActive) {
		popupActive.classList.remove('open')
		document.body.classList.remove('lock')
		document.querySelector('html').removeAttribute('style')
		document.querySelector('html').classList.remove('lock')
		document.querySelector('header').removeAttribute('style')
	}

	const popupOpenBtns = document.querySelectorAll('.popup-btn')
	const popups = document.querySelectorAll('.popup')
	const closePopupBtns = document.querySelectorAll('.close-popup-btn')
	closePopupBtns.forEach(function (el) {
		el.addEventListener('click', function (e) {
			popupClose(e.target.closest('.popup'))
		})
	})

	popupOpenBtns.forEach(function (el) {
		el.addEventListener('click', function (e) {
			e.preventDefault()
			const path = e.currentTarget.dataset.path
			const currentPopup = document.querySelector(`[data-target="${path}"]`)
			if (currentPopup) {
				popups.forEach(function (popup) {
					popupClose(popup)
					popup.addEventListener('click', function (e) {
						if (!e.target.closest('.popup__content')) {
							popupClose(e.target.closest('.popup'))
						}
					})
				})
				currentPopup.classList.add('open')
				document.querySelector('html').classList.add('lock')
			}
		})
	})
	/*  end popups  */


	/* Mask phone */
	;[].forEach.call(
		document.querySelectorAll('input[type=tel]'),
		function (input) {
			let keyCode
			function mask(event) {
				event.keyCode && (keyCode = event.keyCode)
				let pos = this.selectionStart
				if (pos < 3) event.preventDefault()
				let matrix = '+7 (___) ___ ____',
					i = 0,
					def = matrix.replace(/\D/g, ''),
					val = this.value.replace(/\D/g, ''),
					new_value = matrix.replace(/[_\d]/g, function (a) {
						return i < val.length ? val.charAt(i++) || def.charAt(i) : a
					})
				i = new_value.indexOf('_')
				if (i != -1) {
					i < 5 && (i = 3)
					new_value = new_value.slice(0, i)
				}
				let reg = matrix
					.substr(0, this.value.length)
					.replace(/_+/g, function (a) {
						return '\\d{1,' + a.length + '}'
					})
					.replace(/[+()]/g, '\\$&')
				reg = new RegExp('^' + reg + '$')
				if (
					!reg.test(this.value) ||
					this.value.length < 5 ||
					(keyCode > 47 && keyCode < 58)
				)
					this.value = new_value
				if (event.type == 'blur' && this.value.length < 5) this.value = ''
			}

			input.addEventListener('input', mask, false)
			input.addEventListener('focus', mask, false)
			input.addEventListener('blur', mask, false)
			input.addEventListener('keydown', mask, false)
		}
	)
	/* End Mask phone */



    /* clear input */
    function clearInput(button) {
        const input = button.parentNode.querySelector('input');
        input.value = '';
        toggleClearButton(button);
    }

    function toggleClearButton(button) {
        const input = button.parentNode.querySelector('input');
        const clearButton = button;
        if (input.value.length > 0) {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
        }
    }

    const clearInputButtons = document.querySelectorAll('.input-clear');
    clearInputButtons.forEach(button => {
        const input = button.parentNode.querySelector('input');
        input.addEventListener('input', () => toggleClearButton(button));
        toggleClearButton(button);
        button.addEventListener('click', () => clearInput(button));
    });
    /* end clear input */



    /* select */
    const selects = document.querySelectorAll('.select');

    selects.forEach(select => {
        const head = select.querySelector('.select__head');
        const p = head.querySelector('p'); 
        const list = select.querySelector('.select__list');
        
        head.addEventListener('click', () => {
            const isOpen = head.classList.contains('open');
            document.querySelectorAll('.select__head').forEach(el => el.classList.remove('open'));
            document.querySelectorAll('.select__list').forEach(el => el.style.display = 'none');
            
            if (!isOpen) {
                head.classList.add('open');
                list.style.display = 'block';
            }
        });

        select.addEventListener('click', (e) => {
            if (e.target.classList.contains('select__item')) {
                head.classList.remove('open');
                list.style.display = 'none';
                p.textContent = e.target.textContent;
                const input = select.querySelector('.select__input');
                if (input) input.value = e.target.textContent;
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.select')) {
            document.querySelectorAll('.select__head').forEach(el => el.classList.remove('open'));
            document.querySelectorAll('.select__list').forEach(el => el.style.display = 'none');
        }
    });
    /* end select */


    // close cookie 
	const cookieBtn = document.querySelector('.popup-cookie__btn')
    if (cookieBtn) {
        cookieBtn.addEventListener('click', () => {
            document.querySelector('.popup-cookie').style.display = 'none';
        })
    }


    /*  search */
	const inputSearch = document.querySelectorAll('input[type=search]')
	if (inputSearch.length > 0) {
		inputSearch.forEach(elem => {
			const wrapper = elem.closest('.search-wrapper')
			if (wrapper) {
				const searchResultBlock = wrapper.querySelector('.popup__search-result')
				const popularCitiesBlock = wrapper.querySelector('.popup__search')
				const noResultsMessage = searchResultBlock.querySelector('.no-results-message')

				function search() {
					let filter = elem.value.toUpperCase()
					let ul = wrapper.querySelectorAll('.search-list')
					let totalResults = 0

					ul.forEach(item => {
						let li = item.getElementsByTagName('li')
						for (let i = 0; i < li.length; i++) {
							let a = li[i].querySelector('.search-name')
							if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
								li[i].classList.remove('none')
								totalResults++
							} else {
								li[i].classList.add('none')
							}
						}
					})
                    noResultsMessage.classList.toggle('none', totalResults > 0);

					if (elem.value.trim() === '') {
						searchResultBlock.classList.add('none')
						popularCitiesBlock.classList.remove('none')
					} else {
						searchResultBlock.classList.remove('none')
						popularCitiesBlock.classList.add('none')
					}
				}
				elem.addEventListener('input', search)
			}
		})
	}
    /*  end search  */


    /* yandex map */
    const mapPlaceholder = document.getElementById('map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('mouseenter', loadMap, { once: true });
        mapPlaceholder.addEventListener('click', loadMap, { once: true });
    }

    function loadMap() {
        if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            initMap();
        }
    }
    
    function initMap() {
        const mapPlaceholder = document.getElementById('map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.remove();
        }
    
        ymaps.ready(function () {
            const myMap = new ymaps.Map('map', {
                center: [47.231129, 39.728721],
                zoom: 13,
                controls: []
            });
    
            const myPlacemark = new ymaps.Placemark(
                [47.231129, 39.728721],
                {
                    hintContent: 'Ростов-на-Дону, ул. Красноармейская, д. 227',
                    balloonContent: 'Ростов-на-Дону, ул. Красноармейская, д. 227'
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: 'assets/img/icons/map-pin.png',
                    iconImageSize: [21, 26],
                    iconImageOffset: [-15, -31],
                }
            );
    
            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable(['scrollZoom']);
        });
    }
    /* end yandex map */



    /* Swipers */
    const introSwiper = new Swiper(".introSwiper", {
        slidesPerView: 1.06,
        spaceBetween: 10,
        navigation: {
            nextEl: ".intro__swiper-button-next",
            prevEl: ".intro__swiper-button-prev",
        },
        pagination: {
            el: ".intro__swiper-pagination",
        },
        breakpoints: {
			688: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
		},
    });

    const intro4Swiper = new Swiper(".intro4Swiper", {
        navigation: {
            nextEl: ".intro__swiper-button-next",
            prevEl: ".intro__swiper-button-prev",
        },
        pagination: {
            el: ".intro__swiper-pagination",
            type: "fraction",
        },
        scrollbar: {
            el: ".intro__swiper-scrollbar",
        },
    });

    const substockSwiper = new Swiper(".substockSwiper", {
        slidesPerView: 1.09,
        spaceBetween: 10,
        navigation: {
            nextEl: ".substock__swiper-button-next",
            prevEl: ".substock__swiper-button-prev",
        },
        scrollbar: {
            el: ".substock__swiper-scrollbar",
        },
        breakpoints: {
			920: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			550: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
		},
    });


	const servicesCardTitle = document.querySelectorAll('.services__card_title')
    const services4Swiper = new Swiper(".services4Swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: ".services__swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + ((servicesCardTitle[index]) ? servicesCardTitle[index].textContent : "") + "</span>";
            },
        },
        navigation: {
            nextEl: ".services__swiper-button-next",
            prevEl: ".services__swiper-button-prev",
        },
        breakpoints: {
			1040: {
                slidesPerView: 1.3,
				spaceBetween: 20,
			},
            840: {
                slidesPerView: 1.1,
			},
		},
    });


    const reviews2Swiper = new Swiper(".reviews2Swiper", {
        slidesPerView: 1.09,
        spaceBetween: 10,
        navigation: {
            nextEl: ".reviews__swiper-button-next",
            prevEl: ".reviews__swiper-button-prev",
        },
        breakpoints: {
			920: {
				slidesPerView: 1.2,
				spaceBetween: 20,
			},
		},
    });

    const reviews4Swiper = new Swiper(".reviews4Swiper", {
        slidesPerView: 1.02,
        spaceBetween: 10,
        navigation: {
            nextEl: ".reviews__swiper-button-next",
            prevEl: ".reviews__swiper-button-prev",
        },
        scrollbar: {
            el: ".reviews__swiper-scrollbar",
        },
        breakpoints: {
			980: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
            720: {
				slidesPerView: 1.4,
				spaceBetween: 20,
			},
		},
    });

    var gallery1Swiper = new Swiper(".gallery1Swiper", {
        slidesPerView: 4,
        grid: {
            rows: 2,
        },
        spaceBetween: 20,
        navigation: {
            nextEl: ".gallery__swiper-button-next",
            prevEl: ".gallery__swiper-button-prev",
        },
    });


    const gallery5Swiper = new Swiper(".gallery5Swiper", {
        slidesPerView: 1.02,
        spaceBetween: 10,
        navigation: {
            nextEl: ".gallery__swiper-button-next",
            prevEl: ".gallery__swiper-button-prev",
        },
        scrollbar: {
            el: ".gallery__swiper-scrollbar",
        },
        breakpoints: {
			980: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
            688: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		},
    });

    const doctors3Swiper = new Swiper(".doctors3Swiper", {
        slidesPerView: 1.02,
        spaceBetween: 10,
        navigation: {
            nextEl: ".doctors__swiper-button-next",
            prevEl: ".doctors__swiper-button-prev",
        },
        scrollbar: {
            el: ".doctors__swiper-scrollbar",
        },
        breakpoints: {
			1060: {
				slidesPerView: 2.4,
				spaceBetween: 20,
			},
            850: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
            688: {
				slidesPerView: 1.4,
				spaceBetween: 15,
			},
		},
    });

    const articlesSwiper = new Swiper(".articlesSwiper", {
        slidesPerView: 1.02,
        spaceBetween: 10,
        navigation: {
            nextEl: ".articles__swiper-button-next",
            prevEl: ".articles__swiper-button-prev",
        },
        scrollbar: {
            el: ".articles__swiper-scrollbar",
        },
        breakpoints: {
			1070: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
            688: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		},
    });

    const stocksSwiper = new Swiper(".stocksSwiper", {
        slidesPerView: 1.02,
        spaceBetween: 10,
        navigation: {
            nextEl: ".stocks__swiper-button-next",
            prevEl: ".stocks__swiper-button-prev",
        },
        scrollbar: {
            el: ".stocks__swiper-scrollbar",
        },
        breakpoints: {
			1130: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
            688: {
				slidesPerView: 1.3,
				spaceBetween: 20,
			},
		},
    });

    var licensesSwiper = new Swiper(".licensesSwiper", {
        direction: "vertical",
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var licensesSwiper2 = new Swiper(".licensesSwiper2", {
        slidesPerView: 1.1,
        spaceBetween: 10,
        thumbs: {
            swiper: licensesSwiper,
        },
        breakpoints: {
			900: {
				slidesPerView: 1,
			},
            600: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		},
    });


    const doctorDiplomasSwiper = new Swiper(".doctorDiplomasSwiper", {
        slidesPerView: 1.02,
        spaceBetween: 10,
        navigation: {
            nextEl: ".doctor__diplomas_swiper-button-next",
            prevEl: ".doctor__diplomas_swiper-button-prev",
        },
        scrollbar: {
            el: ".doctor__diplomas_swiper-scrollbar",
        },
        breakpoints: {
			850: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
            688: {
				slidesPerView: 1.3,
				spaceBetween: 20,
			},
		},
    });

    /* End swipers */


    /*  open faq  */
    document.querySelectorAll('.faq__button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
        });
    });

    const faqTabBtns =  document.querySelector('.faq__tab_btns')
    document.querySelectorAll('.faq__tab_btn').forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                faqTabBtns.classList.toggle('active');
            });
        }
    });


    /*  accordion  */
	const acc = document.getElementsByClassName('accordion')
	for (let i = 0; i < acc.length; i++) {
		acc[i].addEventListener('click', function () {
			const accContent = this.querySelector('.accordion__content')
			if (accContent.classList.contains('accordion__content--active')) {
                accContent.classList.remove('accordion__content--active');
                this.classList.remove('accordion--active');
			} else {
                accContent.classList.add('accordion__content--active');
                this.classList.add('accordion--active');
			}
		})
	}
	/*  end accordion   */




    /*  tab  */
	const showTab = elTabBtn => {
		const elTab = elTabBtn.closest('.tab');
		if (elTabBtn.classList.contains('tab__btn--active')) {
			return;
		}
		const targetId = elTabBtn.dataset.id;
		const elTabPanes = elTab.querySelectorAll(`.tabcontent[data-id="${targetId}"]`);

		const elTabBtnActive = elTab.querySelector('.tab__btn--active');
		if (elTabBtnActive) {
			elTabBtnActive.classList.remove('tab__btn--active');
		}

		const elTabPaneShow = elTab.querySelectorAll('.tabcontent--active');
		elTabPaneShow.forEach(pane => pane.classList.remove('tabcontent--active'));

		elTabBtn.classList.add('tab__btn--active');
		elTabPanes.forEach(pane => pane.classList.add('tabcontent--active'));
	};

    const tabButtons = document.querySelectorAll('.tab__btn')
	tabButtons.forEach(btn => {
        if(btn) {
            btn.addEventListener('click', function (e) {
                showTab(this);
                quantityElem();
            });   
        }
	});
	/*  end tab */


    /*  filter  */
    document.querySelectorAll('.sort__item input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            filterItems('.sort__card', '.sort__block', '.sort__quantity span');
        });
    });
    filterItems('.sort__card', '.sort_block', '.sort__quantity span');
    
    function filterItems(itemSelector, filterGroupSelector, quantitySelector) {
        const filterGroups = Array.from(document.querySelectorAll(filterGroupSelector)).map(group => {
            return Array.from(group.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.id);
        });
    
        document.querySelectorAll(itemSelector).forEach(function(item) {
            const itemCategories = item.dataset.categories ? item.dataset.categories.split(' ') : [];
            const matchesFilter = filterGroups.every(filters => {
                if (filters.length === 0) return true;
                return filters.some(filter => itemCategories.includes(filter));
            });
            if (matchesFilter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    
        const visibleItems = document.querySelectorAll(`${itemSelector}:not([style*="display: none"])`).length;
        const quantityElement = document.querySelector(quantitySelector);
        if (quantityElement) {
            quantityElement.textContent = visibleItems;
        }
    }
    /*  end filter  */


    /*  btn more  */
    const moreBtns = document.querySelectorAll('.btn-more');
    moreBtns.forEach(moreBtn => {
        if (moreBtn) {
            const moreContent = moreBtn.previousElementSibling;

            if (moreContent.scrollHeight <= moreContent.clientHeight) {
                moreBtn.style.display = 'none'; 
            } else {
                const textBtn = moreBtn.innerHTML; 
                moreBtn.addEventListener('click', function() {
                    const heightMoreContent = moreContent.style.maxHeight; 
                    this.classList.toggle('active');

                    if (moreContent.style.maxHeight) {
                        moreContent.style.maxHeight = null;
                        this.textContent = textBtn;
                    } else {
                        moreContent.style.maxHeight = moreContent.scrollHeight + "px"; 
                        this.textContent = 'Свернуть';
                    }
                });
            }
        }
    });

    /*  end btn more  */


    const footerNavAccordeon = document.querySelectorAll('.footer__nav_acc');
    footerNavAccordeon.forEach(footerBtn => {
        if (footerBtn) {
            footerBtn.addEventListener('click', function() {
                const footerContent = footerBtn.nextElementSibling;
                footerContent.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    });

    const politicTitleAccordeon = document.querySelectorAll('.text-politic__title');
    politicTitleAccordeon.forEach(politicTitle => {
        if (politicTitle) {
            politicTitle.addEventListener('click', function() {
                const politicContent = politicTitle.nextElementSibling;
                politicContent.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    });

    /*   scrollTop  */
	const buttonsUp = document.querySelectorAll('.scroll-up')
    buttonsUp.forEach(buttonUp => {
        if (buttonUp) {
            buttonUp.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            })
        }
    });
    /*   end scrollTop  */



    /* navigation */
    const articleNavigation = document.querySelector('.article__navigation');
    if (articleNavigation) {
        const jsScrollBlockList = document.querySelectorAll(
            '.text__content h1, .text__content h2, .text__content h3, .text__content h4'
        );
    
        if (jsScrollBlockList.length > 0) {
            let currentH2List = null;
            for (let i = 0; i < jsScrollBlockList.length; i += 1) {
                const jsScrollBlock = jsScrollBlockList[i];
                const titleBlock = jsScrollBlock.textContent;
                const articleNavigationList = document.querySelector('.article__navigation_item ul');
                const articleNavigationItem = document.createElement('li');
                const articleNavigationLink = document.createElement('a');
                articleNavigationItem.classList.add('navigation__list-item');
                articleNavigationLink.classList.add('navigation__link');
                jsScrollBlock.setAttribute('id', `${i}`);
                articleNavigationLink.setAttribute('href', `#${i}`);
                articleNavigationLink.textContent = ' ' + titleBlock;
                articleNavigationItem.append(articleNavigationLink);
    
                if (jsScrollBlock.tagName === 'H2') {
                    currentH2List = document.createElement('ul');
                    currentH2List.classList.add('article__subnavigation_list');  
                    articleNavigationItem.append(currentH2List);
                    articleNavigationList.append(articleNavigationItem);
                } else if (jsScrollBlock.tagName === 'H3' && currentH2List || jsScrollBlock.tagName === 'H4' && currentH2List) {
                    const subListItem = document.createElement('li');
                    subListItem.classList.add('navigation__sublist-item');
                    subListItem.append(articleNavigationLink);
                    currentH2List.append(subListItem);
                } else {
                    articleNavigationList.append(articleNavigationItem);
                }
            }
            
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    let href = this.getAttribute('href').substring(1);
                    const scrollTarget = document.getElementById(href);
                    const topOffset = 280;
                    const elementPosition = scrollTarget.getBoundingClientRect().top;
                    const offsetPosition = elementPosition - topOffset;
                    window.scrollBy({
                        top: offsetPosition,
                        behavior: 'smooth',
                    });
                });
            });
        } else {
            articleNavigation.querySelector('.navigation__item').remove();
        }
    }
    /* end navigation  */


    // quantity-card
    function quantityElem() {
        const quantityCards = document.querySelectorAll('.quantity-card');
        const quantityElement = document.querySelector('.quantity span');
        if (quantityElement) {
            let visibleCards = 0;
            quantityCards.forEach(card => {
                if (card.offsetParent !== null) {
                    visibleCards++;
                }
            });
            quantityElement.textContent = visibleCards;
        }
    }
    quantityElem();


    const headerMobileSearch = document.querySelector('.header-mobile__search')
    if (headerMobileSearch) {
        headerMobileSearch.addEventListener('click', function () {
            const headerMobileSearchContent = document.querySelector('.header-mobile__search_content')
            headerMobileSearch.classList.toggle('active');
            headerMobileSearchContent.classList.toggle('active');
        })
    }



    /* search in page */
    document.getElementById('searchInput').addEventListener('input', function () {
        const searchValue = this.value.toLowerCase();
        const rows = document.querySelectorAll('.search-page-item'); 
    
        rows.forEach(function (row) {
            const serviceName = row.querySelector('.search-page-name').textContent.toLowerCase();
    
            if (serviceName.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        quantityElem();
    });

})