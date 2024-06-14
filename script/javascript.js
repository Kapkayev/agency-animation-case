window.addEventListener('load', function() {
    let headerTitle = document.querySelector('.container-header__title');
    headerTitle.classList.add('active');
});

document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector('.container-header__subtitle');
    container.classList.add('active');
});

document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector('.container-header__text');
    container.classList.add('active');
});

document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector('.container-preview');
    setTimeout(() => {
        container.classList.add('active');
    }, 2000)
});