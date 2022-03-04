const details = document.querySelector('.details_arrow');
const btnTest = document.querySelector('.btn-test');
const contentHidden = document.querySelector('.main-page__content_hidden');
const menuBtn = document.querySelector('.sandwich');
const menuCover = document.querySelector('.main-page__menu');
const exitBtn = document.querySelector('.menu_exit-btn');

details.addEventListener('click', showHideDetails);
menuBtn.addEventListener('click', showHideMenu);
exitBtn.addEventListener('click', showHideMenu);


function showHideDetails() {
    if (contentHidden.style.display === 'none') {
        contentHidden.style.display = 'block';
        details.style.transform = 'none';
    } else {
        contentHidden.style.display = 'none';
        details.style.transform = 'rotate(180deg)';
    }
}

function showHideMenu() {
    if (menuCover.style.display === 'none') {
        contentHidden.style.display = 'none'; 
        menuCover.style.display = 'block';
    } else {
        menuCover.style.display = 'none';
    }
}