const details = document.querySelector('.details_arrow');
const btnTest = document.querySelector('.btn-test');
const contentHidden = document.querySelector('.main-page__content');
const menuBtn = document.querySelector('.sandwich');
const menuCover = document.querySelector('.main-page__menu');
const exitBtn = document.querySelector('.menu_exit-btn');
const testBtn = document.querySelectorAll('.btn-test')

// details.addEventListener('click', showHideDetails);
menuBtn.addEventListener('click', showHideMenu);
exitBtn.addEventListener('click', showHideMenu);
testBtn.forEach(btn => (
    btn.addEventListener('click', function() {
        window.location.href = './q1/q1.html'
    })
))


// function showHideDetails() {
//     contentHidden.classList.toggle('hidden')
//     if (!contentHidden.classList.contains('hidden')) {
//         details.classList.add('arrow-up')
//     } else details.classList.remove('arrow-up')
// }

function showHideMenu() {
    menuCover.classList.toggle('show-menu');
    // if (!contentHidden.classList.contains('hidden')) {
    //     console.log('pook')
    //     contentHidden.classList.add('hidden')
    //     details.classList.remove('arrow-up')
    // }
}