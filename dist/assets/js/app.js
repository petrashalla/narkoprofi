
function search() {
  let inputSearch = document.getElementById("search");
  if (inputSearch) {
  let filter = inputSearch.value.toUpperCase();
  let ul = document.querySelectorAll('.search-list');
  ul.forEach((item) => {
      let li = item.getElementsByTagName("li");
      for (let i = 0; i < li.length; i++) {
          let a = li[i].getElementsByTagName("a")[0];
          if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
              li[i].style.display = "";
          } else {
              li[i].style.display = "none";
          }
      }
  })
      
      document.addEventListener('keyup', search);
  }
}
search();

let scrollWidthFunc = () => {
    let scrollWidth = window.innerWidth - document.body.clientWidth;
    document.querySelector('html').style.paddingRight = scrollWidth + 'px';
    if (document.querySelector('header').classList.contains('fixed')) {
        document.querySelector('header').style.paddingRight = scrollWidth + 'px';
    }
    
}
const scrollTop = document.querySelector('.scroll-top');
if (scrollTop) 
scrollTop.addEventListener('click', ()=> {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

  

const header = document.querySelector('.header');
const headerWrapper = header.querySelector('.header-wrapper');
const main = document.querySelector('.main');
if (headerWrapper) {
    var headerHeight = header.offsetHeight;
    var headerWrapperHeight = headerHeight - headerWrapper.offsetHeight;
    window.onscroll = function (e) {
        if (window.innerWidth > 1400) {
            if (window.scrollY > headerWrapperHeight) {
                if (!headerWrapper.classList.contains('fixed')) {
                    headerWrapper.classList.add('fixed');
                    main.style.paddingTop = headerWrapper.offsetHeight + 'px';
                }
            }
            else {
                main.removeAttribute('style');
                headerWrapper.classList.remove('fixed');
            } 
        }
      
    };
}





document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector('.header');
  const burgerMenu = header.querySelector('.burger__menu');
  if (burgerMenu) {
    const headerMobile = header.querySelector('.header__content');
    burgerMenu.addEventListener("click", () => {
        let headerHeight = header.offsetHeight;
        if (!headerMobile.classList.contains("active")) {
            headerMobile.style.top = headerHeight + 'px';
            if (window.innerWidth < 1101) {
                headerMobile.style.height = 'calc(100vh - ' + headerHeight + 'px';
            }
          
        }
        headerMobile.classList.toggle("active");
        burgerMenu.classList.toggle("active");
        burgerMenu.querySelector('.ham').classList.toggle("active");
        header.classList.toggle("active");
        document.querySelector('html').classList.toggle('burger-lock');
        if (burgerMenu.classList.contains("active")) {
            document.querySelector('html').addEventListener('click', function (e) {
                if (!e.target.closest('.header')) {
                    headerMobile.classList.remove("active");
                    burgerMenu.classList.remove("active");
                    burgerMenu.querySelector('.ham').classList.remove("active");
                    header.classList.remove("active");
                    document.querySelector('html').classList.remove('burger-lock');
                    document.querySelector('html').removeEventListener('click');
                }
            });
        }
    });
  }
  
  ['load', 'resize'].forEach((event) => {
    window.addEventListener(event, function () {
        if (window.innerWidth > 1100) {
            const headerMobile = document.querySelector('.header__content');
            headerMobile.removeAttribute('style');
            if (headerMobile.classList.contains('active')) {
                headerMobile.classList.remove("active");
          
                document.querySelector('.burger__menu').classList.remove("active");
                document.querySelector('header').classList.remove("active");
                document.querySelector('html').classList.remove('burger-lock');
                document.querySelector('.burger__menu').querySelector('.ham').classList.toggle("active");
            }
           
        }
        else {
            main.removeAttribute('style');
            headerWrapper.classList.remove('fixed');
        }
    })
});
    
   
 /* Mask phone */
 [].forEach.call(document.querySelectorAll('input[type=tel]'), function (input) {
  let keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false)

});
/* End Mask phone */
  // Popups
  function popupClose(popupActive) {
      popupActive.classList.remove('open');
      document.body.classList.remove('lock');
      document.querySelector('html').style.paddingRight = 0;
      document.querySelector('html').classList.remove('lock');
      document.querySelector('header').removeAttribute('style');
      
  }
  const popupOpenBtns = document.querySelectorAll('.popup-btn');
  const popups = document.querySelectorAll('.popup');
  const originalTitlePopup2 = document.querySelector('.original-title').innerHTML;
  const closePopupBtns = document.querySelectorAll('.close-popup');
  closePopupBtns.forEach(function (el) {
      el.addEventListener('click', function (e) {
          popupClose(e.target.closest('.popup'));
      });
  });
  popupOpenBtns.forEach(function (el) {
      el.addEventListener('click', function (e) {
          e.preventDefault();
          const path = e.currentTarget.dataset.path;
          const currentPopup = document.querySelector(`[data-target="${path}"]`);
          if (currentPopup) {
              popups.forEach(function (popup) {
                  popupClose(popup);
                  popup.addEventListener('click', function (e) {
                      if (!e.target.closest('.popup__content')) {
                          popupClose(e.target.closest('.popup'));
                      }
                  });
                  
              });
              
              currentPopup.classList.add('open');
              if (currentPopup.getAttribute('data-target') == 'popup-change') {
                  let originaTitle = currentPopup.querySelector('.original-title');
                  if (el.classList.contains('change__item-btn')) {
                      if (el.classList.contains('doctor__btn')) {
                          let currentItem = el.closest('.change__item-title');
                          let currentTitile = currentItem.querySelector('.current-title');
                          originaTitle.innerHTML = 'Записаться на приём к врачу:' + currentTitile.innerHTML
                      }
                      else {
                          if (el.classList.contains('change__item-btn_current')) {
                              originaTitle.textContent = el.textContent;
                          }
                          else {
                              let currentItem = el.closest('.change__item-title');
                              let currentTitile = currentItem.querySelector('.current-title');
                              originaTitle.innerHTML = currentTitile.innerHTML
                          }
                      }
                  }
                  else {
                      originaTitle.innerHTML = originalTitlePopup2;
                  }
              }
              if (el.classList.contains('reviews__btn')) {
                let currentItem = el.closest('.reviews__slide');
                console.log(currentItem);
                let originalTop = currentPopup.querySelector('.reviews__top_original');
                let originalText = currentPopup.querySelector('.reviews__text_original');
                originalTop.innerHTML = currentItem.querySelector('.reviews__top').innerHTML;
                originalText.innerHTML = currentItem.querySelector('.reviews__text').innerHTML;
            };
              scrollWidthFunc();
              document.querySelector('html').classList.add('lock');
          }
      });
  });
  /* end popups */
  /* tabs */
  class Tabs {
      container;
      tab_button_class;
      tab_content_class;
      tab_attribute_key;
      tab_attribute_target;
      tab_active_name;
      constructor({ container = '.tabs-container', tabs_wrapper_class = '.tabs__wrapper', button_class = '.tab', content_class = '.tab-content', attribute_key = 'path', attribute_target = 'target', name_active = '.tabs__active' } = {}) {
          this.container = container;
          this.tabs_wrapper_class = tabs_wrapper_class;
          this.tab_button_class = button_class;
          this.tab_content_class = content_class;
          this.tab_attribute_key = attribute_key;
          this.tab_attribute_target = attribute_target;
          this.tab_active_name = name_active;
      }
      initTabs() {
          document.querySelectorAll(this.container).forEach((wrapper) => {
              this.initTabsWrapper(wrapper);
          });
      }
      initTabsWrapper(wrapper) {
          const tabsWrapper = wrapper.querySelector(this.tabs_wrapper_class);
          const tabsButtonList = wrapper.querySelectorAll(this.tab_button_class);
          const tabsContentList = wrapper.querySelectorAll(this.tab_content_class);
          const tabActiveName = wrapper.querySelector(this.tab_active_name);
          const tabsClose = document.querySelectorAll('.tabs__close');
          let currentTab = 0;
          if (tabActiveName) {
              tabActiveName.querySelector('.tabs__active-text').textContent = tabsButtonList[currentTab].textContent;
          }
          for (let index = 0; index < tabsButtonList.length; index++) {
              if (tabsButtonList[index].dataset.start === true) {
                  currentTab = index;
              }
              tabsButtonList[index].addEventListener('click', () => {
                  if (tabsContentList[index]) {
                      currentTab = index;
                      this.showTabsContent({
                          list_tabs: tabsContentList,
                          list_buttons: tabsButtonList,
                          index: currentTab,
                      });
                      if (tabActiveName) {
                          tabActiveName.querySelector('.tabs__active-text').textContent = tabsButtonList[index].textContent;
                          tabActiveName.closest('.tabs').classList.remove('active');
                          document.body.classList.remove('lock');
                      }
                  }
              });
          }
          this.showTabsContent({
              list_tabs: tabsContentList,
              list_buttons: tabsButtonList,
              index: currentTab,
          });
          if (tabActiveName) {
              tabActiveName.addEventListener('click', function () {
                  tabActiveName.closest('.tabs').classList.add('active');
                  document.body.classList.add('lock');
              });
          }
          if (tabsClose.length > 0) {
              for (let i = 0; i < tabsClose.length; i += 1) {
                  const tabClose = tabsClose[i]
                  tabClose.addEventListener('click', function () {
                      tabClose.closest('.tabs').classList.remove('active');
                      document.body.classList.remove('lock');
                  });
              }
          }
          tabsWrapper.closest('.tabs__container').addEventListener('click', function (e) {
              if (!e.target.closest('.tabs__wrapper')) {
                  tabsWrapper.closest('.tabs').classList.remove('active');
                  document.body.classList.remove('lock');
              }
          });
      }
      hideTabsContent({ list_tabs, list_buttons }) {
          list_buttons.forEach((el) => {
              el.classList.remove('active');
          });
          list_tabs.forEach((el) => {
              el.classList.remove('active');
          });
      }
      showTabsContent({ list_tabs, list_buttons, index }) {
          this.hideTabsContent({
              list_tabs,
              list_buttons
          });
          if (list_tabs[index]) {
              list_tabs[index].classList.add('active');
          }
          if (list_buttons[index]) {
              list_buttons[index].classList.add('active');
          }
      }
  }
  new Tabs().initTabs();

 /* end tabs*/
 /* yandex map */
 let flagMap = false;
 document.addEventListener('scroll', function () {
     const blockMap = document.getElementById('map');
     if (blockMap) {
         const posTop = blockMap.getBoundingClientRect().top;

         if (posTop < window.innerHeight && !flagMap) {
             if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
                 const script = document.createElement('script');
                 script.type = 'text/javascript';
                 script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
                 document.head.appendChild(script);
             }
             setTimeout(function(){
             ymaps.ready(init);
             function init() {
                 const map = document.querySelector('#map');

                 if (map) {
                     var myMap = new ymaps.Map("map", {
                         center: [22, 22, 22],
                         zoom: 14,

                     });

                     myGeoObject = new ymaps.GeoObject();
                     myMap.geoObjects.add(new ymaps.Placemark(myMap.getCenter(), {
                        preset: 'islands#redDotIconWithCaption',
                        iconLayout: 'default#image',
                        iconImageHref: 'assets/img/map-pin_map.svg',
                        iconImageSize: [31, 31],
                        iconImageOffset: [-5, -38]
                    }));
                     myMap.behaviors.disable(['scrollZoom']);
                 }
             }
            }, 300)
             flagMap = true;
           
         }
     }


 });
 /* end yandex map */

 // разные функции
 let panel =  document.querySelectorAll('.panels');
 if (panel.length > 0) {
    panel.forEach((elem) => {
        let panelItem = elem.querySelectorAll('.panel-title');
        if (panelItem.length > 0) {
          bodyItem = elem.querySelectorAll('.panel-body');
          panelItem.__proto__.forEach = [].__proto__.forEach;
          let activePanel;
          panelItem.forEach(function (item, i, panelItem) {
              item.addEventListener('click', function (e) {
                  this.classList.add('active');
                  this.nextElementSibling.classList.add('active');
                  if (activePanel) {
                      activePanel.classList.remove('active');
                      activePanel.nextElementSibling.classList.remove('active');
                  }
                  activePanel = (activePanel === this) ? 0 : this;
              });
          });
        }
    })
 
 }
const hideItems = document.querySelectorAll('.hide-items');
if (hideItems.length > 0) {
    hideItems.forEach((elem) => {
        const hideItem = elem.querySelectorAll('.hide-item');
        const hideTitles = elem.querySelectorAll('.hide-item__title');
        const hideContents = elem.querySelectorAll('.hide-item__content');
        hideItem.forEach((item) => {
            let title = item.querySelector('.hide-item__title');
            let content = item.querySelector('.hide-item__content');
            title.addEventListener('click', () => {
                if (title.classList.contains('active')) {
                    title.classList.remove('active');
                    content.classList.remove('active');
                    content.style.maxHeight = '0';
                }
                else {
                    hideTitles.forEach((element) => {
                        element.classList.remove('active');
                    })
                    hideContents.forEach((element) => {
                        element.classList.remove('active');
                        element.style.maxHeight = '0';
                    })
                    let height = content.querySelector('.hide-item_max-height').offsetHeight;
                    title.classList.add('active');
                    content.classList.add('active');
                    content.style.maxHeight = height + 'px';
                }
            })
        })
    })
}
const showCheck = document.querySelectorAll('.show-more__btn');
['resize', 'load'].forEach((event) => {
  window.addEventListener(event, function () {
          if (showCheck.length > 0) {
              showCheck.forEach((item) => {
                  const showContent = item.closest('.show-items');
                  const items = showContent.querySelectorAll('.show-item');
                  let itemsNoActive = [];
                  item.addEventListener( 'click', () => {
                      for (let i = 0; i < items.length; i++) {
                          if (!items[i].classList.contains('show')) {
                              itemsNoActive.push(items[i]);
                          }
                      }
                  for (let j = 0; j < 2 && j < itemsNoActive.length; j++) {
                      itemsNoActive[j].classList.add('show');
                  }
                  if (itemsNoActive.length < 3) {
                    item.classList.add('active');
                }
                  itemsNoActive = []
              })
              })
          }
  })
})

// sliders
const introSliderCheck = document.querySelectorAll('.intro');
if (introSliderCheck.length > 0) {
    introSliderCheck.forEach((slider) => {
      const swiperintro = new Swiper(slider.querySelector('.intro__inner'), {
          direction: 'horizontal',
          //autoHeight: true,
          effect: 'fade',
          autoplay: {
            delay: 5000,
          },
          navigation: {
              nextEl: slider.querySelector('.intro__slider-button_next'),
              prevEl: slider.querySelector('.intro__slider-button_prev'),
          },
          pagination: {
            el: '.intro__pagination',
            clickable: true,
        }, 
          slidesPerView: 1,
          spaceBetween: 0,   
          grabCursor: true
      });
  })
}
const aboutSliderCheck = document.querySelectorAll('.about');
if (aboutSliderCheck.length > 0) {
    aboutSliderCheck.forEach((slider) => {
      const swiperAbout = new Swiper(slider.querySelector('.swiper'), {
          direction: 'horizontal',
          pagination: {
            el: slider.querySelector('.about__pagination'),
        }, 
        paginationClickable: true,
          slidesPerView: 1,
          spaceBetween: 0,   
          grabCursor: true
      });
  })
}

const doctorsSliderCheck = document.querySelectorAll('.doctors');
if (doctorsSliderCheck.length > 0) {
    doctorsSliderCheck.forEach((slider) => {
      const swiperDoctors = new Swiper(slider.querySelector('.swiper'), {
          direction: 'horizontal',
          navigation: {
            nextEl: slider.querySelector('.doctors__slider-button_next'),
            prevEl: slider.querySelector('.doctors__slider-button_prev'),
        },
        autoplay: {
            delay: 5000,
          },
          slidesPerView: 1,
          spaceBetween: 10,
          breakpoints: {
              1320: {
                  slidesPerView:5,
                  spaceBetween: 25,   
              },
              1100: {
                slidesPerView: 4,
                spaceBetween: 20,   
            },
              900: {
                  slidesPerView: 3,
                  spaceBetween: 10,   
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 10,   
            },
          }
      });
  })
}

const reviewsSliderCheck = document.querySelectorAll('.reviews');
if (reviewsSliderCheck.length > 0) {
    reviewsSliderCheck.forEach((slider) => {
      const swiperReviews = new Swiper(slider.querySelector('.swiper'), {
          direction: 'horizontal',
          navigation: {
            nextEl: slider.querySelector('.reviews__slider-button_next'),
            prevEl: slider.querySelector('.reviews__slider-button_prev'),
        },
        pagination: {
            el: slider.querySelector('.reviews__pagination'),
        }, 
        spaceBetween: 20,   
          slidesPerView: 1,
          breakpoints: {
            1100: {
              slidesPerView: 3, 
          },
            800: {
              slidesPerView: 2,
          },
        }
      });
  })
}

// end Sliders 

// navigation
const articleNavigation = document.querySelector('.article__content');

if (articleNavigation) {
    const jsScrollBlockList = document.querySelectorAll('.text__content h1, .text__content h2, .text__content h3, .text__content h4, .text__content h5, .text__content h6');

    if (jsScrollBlockList.length > 0) {
        for (let i = 0; i < jsScrollBlockList.length; i += 1) {
            const jsScrollBlock = jsScrollBlockList[i];
            const titleBlock = jsScrollBlock.textContent;
            const articleNavigationList = document.querySelector('.article__content ol');
            const articleNavigationItem = document.createElement('li');
            const articleNavigationLink = document.createElement('a');
            articleNavigationItem.classList.add('article__content-item');
            articleNavigationLink.classList.add('article__content-link');
            jsScrollBlock.setAttribute('id', `${i}`)
            articleNavigationLink.setAttribute('href', `#${i}`);
            articleNavigationLink.textContent = ' ' + titleBlock;
            articleNavigationItem.append(articleNavigationLink);
            articleNavigationList.append(articleNavigationItem);
        }

        document.querySelectorAll('a[href^="#"').forEach(link => {

            link.addEventListener('click', function (e) {
                e.preventDefault();

                let href = this.getAttribute('href').substring(1);
                const scrollTarget = document.getElementById(href);
                const topOffset = 180;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    } else {
        articleNavigation.querySelector('.article__content-item').remove();
    }
}

// end navigation
// animation 
const animationItems = document.querySelectorAll('.animation-item');
if (animationItems.length > 0) {
  function onEntry(e) {
      e.forEach(e => {
          e.isIntersecting && e.target.classList.add("animation-active")
      }
      )
  }
  let options = {
      threshold: [.5]
  }, observer = new IntersectionObserver(onEntry, options)
  for (let e of animationItems)
      observer.observe(e);
}
// end animation
function reviewsHide() {
    const reviews = document.querySelectorAll(".reviews__slide");
    if (reviews.length > 0) {
        reviews.forEach((item) => {
            if (!item.classList.contains('reviews__slide_original')) {
                const reviewsText = item.querySelector('.reviews__text');
                const reviewsBtn = item.querySelector('.reviews__btn');
                if (reviewsBtn) {
                    if (reviewsText.offsetHeight > 180) {
                        reviewsText.classList.add('hidden');
                        reviewsBtn.classList.add('active');
                    }
                }
            }
        })
    }
}
setTimeout(()=> {
    reviewsHide() 
}, 100)
})