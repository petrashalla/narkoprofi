const headerTop = document.querySelector('.header__top-wrap');
if (headerTop) {
  headerTop.classList.add('header__icicles-wrapper_mobile');
  headerTop.classList.add('header__icicles-wrapper');
  const mobileIcicle = document.createElement('div');
  mobileIcicle.classList.add('header__icicles');
  mobileIcicle.classList.add('header__icicles_mobile');
  headerTop.appendChild(mobileIcicle);
}