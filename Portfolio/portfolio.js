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

/* PORTFOLIO AREA */
filterSelection('all');

// list 아이템 클릭 시 해당 필터에 해당하는 포트폴리오 목록 표시
function filterSelection(id) {
    let x = document.getElementsByClassName('listItem');
    
    for(let i = 0; i < x.length; i++) {
        removeClass(x[i], 'active');
    }

    addClass(document.getElementById(id), 'active');

    x = document.getElementsByClassName('filterItem');
    
    if(id == 'all') {
        id = '';
    }

    for(let i = 0; i < x.length; i++) {
        removeClass(x[i], 'show');
        if(x[i].className.indexOf(id) > -1) {
            addClass(x[i], 'show');
        }
    }
}

function addClass(element, name) {
    if(element.className.indexOf(name) == -1) {
        element.className += " " + name;
    }
}

function removeClass(element, name) {
    let arr = element.className.split(" ");

    while(arr.indexOf(name) > -1) {
        arr.splice(arr.indexOf(name), 1);
    }

    element.className = arr.join(" ");
}

document.getElementById('all').addEventListener('click', filterSelection.bind(null, 'all'));
document.getElementById('uiux').addEventListener('click', filterSelection.bind(null, 'uiux'));
document.getElementById('java').addEventListener('click', filterSelection.bind(null, 'java'));
document.getElementById('db').addEventListener('click', filterSelection.bind(null, 'db'));

function viewPortfolio(event) {
    let polyNode = event.target;

    if(polyNode.tagName.toLowerCase() == 'i') {
        polyNode = polyNode.parentNode;
    }

    const overlayNode = polyNode;
    const imageNode = overlayNode.nextElementSibling;

    const itemNode = overlayNode.parentNode;
    const mainNode = itemNode.nextElementSibling;
    const subNode = mainNode.nextElementSibling;
    const textNode = subNode.nextElementSibling;
    
    document.getElementById('modalImage').src = imageNode.src;
    document.getElementById('modalMain').innerHTML = mainNode.innerHTML;
    document.getElementById('modalSub').innerHTML = subNode.innerHTML;
    document.getElementById('modalText').innerHTML = textNode.innerHTML;

    document.getElementById('portfolioModal').style.display = 'block';
    
}

document.getElementById('modalClose').addEventListener('click', function(){
    document.getElementById('portfolioModal').style.display = 'none';
})

const filterItems = document.getElementsByClassName('overlay');

for(let i = 0; i < filterItems.length; i++) {
    filterItems[i].addEventListener('click', viewPortfolio);
}