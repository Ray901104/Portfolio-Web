/* HEADER */
window.onload = function () { scrollFunction() };
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    const header = document.getElementById('header');

    if (document.documentElement.scrollTop > 70) {
        if (!header.classList.contains('navbar-fixed')) {
            header.classList.add('navbar-fixed');
            document.getElementsByTagName('body')[0].style.marginTop = '70px';
            header.style.display = 'none';
            setTimeout(function () {
                header.style.display = 'block';
            }, 40);
        }
    } else {
        if (header.classList.contains('navbar-fixed')) {
            header.classList.remove('navbar-fixed');
            document.getElementsByTagName('body')[0].style.marginTop = '0';
        }
    }
}

function menuToggle() {
    document.getElementById('menu').classList.toggle('show');
}

document.getElementById('toggleBtn').addEventListener('click', menuToggle);

/* WELCOME AREA */
let imageSlideIndex = 1;

showImageSlides(imageSlideIndex);

function imageSlideTimer() {
    plusImageSlides(1);
}

/* 3초마다 다음 슬라이드로 넘어가도록 타이머 설정 */
let imageTimer = setInterval(() => {
    imageSlideTimer();
}, 3000);

function plusImageSlides(n) {
    /* 사용자가 화살표버튼을 클릭 시 자동 슬라이드처리 새로 시작 */
    clearInterval(imageTimer);
    imageTimer = setInterval(() => {
        imageSlideTimer();
    }, 3000);

    showImageSlides(imageSlideIndex += n);
}

function currentImageSlide(n) {
    /* 사용자가 특정 dot을 클릭 시 자동 슬라이드처리 새로 시작 */
    clearInterval(imageTimer);
    imageTimer = setInterval(() => {
        imageSlideTimer();
    }, 3000);

    showImageSlides(imageSlideIndex = n)
}

function showImageSlides(n) {
    const slides = document.getElementsByClassName('image-slide');
    const dots = document.getElementsByClassName('dot');

    if (n > slides.length) {
        imageSlideIndex = 1;
    }

    if (n < 1) {
        imageSlideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }

    slides[imageSlideIndex - 1].style.display = 'block';
    dots[imageSlideIndex - 1].className += ' active';
}

/* prev, next 버튼 클릭 이벤트 */
document.getElementById('imagePrev').addEventListener('click', plusImageSlides.bind(null, -1));
document.getElementById('imageNext').addEventListener('click', plusImageSlides.bind(null, 1));

/* dot 버튼 클릭 이벤트 */
document.getElementById('firstDot').addEventListener('click', currentImageSlide.bind(null, 1));
document.getElementById('secondDot').addEventListener('click', currentImageSlide.bind(null, 2));
document.getElementById('thirdDot').addEventListener('click', currentImageSlide.bind(null, 3));
document.getElementById('forthDot').addEventListener('click', currentImageSlide.bind(null, 4));