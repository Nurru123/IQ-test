const details = document.querySelector('.details_arrow');
const btnTest = document.querySelector('.btn-test');
const contentHidden = document.querySelector('.main-page__content');
const menuBtn = document.querySelector('.sandwich');
const menuCover = document.querySelector('.main-page__menu');
const exitBtn = document.querySelector('.menu_exit-btn');

details.addEventListener('click', showHideDetails);
menuBtn.addEventListener('click', showHideMenu);
exitBtn.addEventListener('click', showHideMenu);


function showHideDetails() {
    contentHidden.classList.toggle('hidden')
    if (!contentHidden.classList.contains('hidden')) {
        details.classList.add('arrow-up')
    }
}

function showHideMenu() {
    menuCover.classList.toggle('show-menu');
    if (!contentHidden.classList.contains('hidden')) {
        contentHidden.classList.add('hidden')
        details.classList.remove('arrow-up')
    }
}