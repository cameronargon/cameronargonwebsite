///* go top *///
if (document.querySelector(".go-top")) {
    const goTopBtn = document.querySelector(".go-top");

    window.addEventListener("scroll", trackScroll);
    goTopBtn.addEventListener("click", goTop);

    function trackScroll() {
        const scrolled = window.pageYOffset;
        const coords = document.documentElement.clientHeight;
        if (scrolled > coords) {
            goTopBtn.classList.add("show");
        } else {
            goTopBtn.classList.remove("show");
        }
    }
    
    function goTop() {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -25);
            setTimeout(goTop, 0);
        }
    }
}

///* fancybox *///
if (document.querySelector("[data-fancybox]")) {
    Fancybox.bind("[data-fancybox]", { });
}

///* smooth scroll *///
if (document.querySelector('a[href^="#"]')) {
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            var id = smoothLink.getAttribute('href');
            var element = document.getElementById(id.replace('#', ''));
            var headerOffset = document.querySelector('header').offsetHeight;
            var elementPosition = element.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
           });
        });
    };
}

///* home page scroll *///
if (document.querySelector(".header-main")) {
    window.addEventListener("scroll", onScroll);
    
    function onScroll() {
        var h = document.querySelector(".header-main");
        var y = window.pageYOffset;

        if (y > 70) {
            h.classList.add("scroll");
        } else {
            h.classList.remove("scroll");
        }
    }

    ///* fixed sections script *///
    function fixedSections() {
        var sections = document.querySelectorAll(".section-home");
        var stickySections = document.querySelectorAll(".section-home.sticky");
        var sectionsH = [];
        var scrollPositions = [];
        var stickyHeight = 0;
        var stickyAmount = 0;

        function sectionOpacity() {
            stickySections = document.querySelectorAll(".section-home.sticky");

            if (stickySections ) {
                var lastStickySection = stickySections[stickySections.length-1] ? stickySections[stickySections.length-1] : sections[0];
                var startScreenOverlay = lastStickySection.querySelector(".section-overlay");
                var startScreenH = lastStickySection.offsetHeight;
                var opacityVal = 0.5;
                var s = Math.round((window.pageYOffset - lastStickySection.offsetTop) / (startScreenH / 100)) / 200;

                if (s <= opacityVal) {                    
                    startScreenOverlay.style.opacity = opacityVal + s;
                }
            }
        }

        function sectionsPicker() {
            for (var i=0; i<sections.length; i++) {
                var thisHeight = sections[i].offsetHeight;
                var thisPosition = sections[i].offsetTop;

                sectionsH.push(thisHeight);
                scrollPositions.push(thisPosition);
            }
        }

        function stickyCounter() {
            stickyHeight = 0;

            for (var i=0; i<stickyAmount; i++) {
                stickyHeight += sectionsH[i];
            }
        }


        function stickyCheckerAdd() {
            if (window.pageYOffset > stickyHeight) {    
                sections[stickyAmount].classList.add("sticky");
                refreshSticky("plus");
            }
        }

        function stickyCheckerRemove(){
            stickySections = document.querySelectorAll(".section-home.sticky");
            var lastSticky = stickySections[stickySections.length-1];
            var lastStickyPosition = scrollPositions[stickySections.length-1];
            if (window.pageYOffset < lastStickyPosition && window.pageYOffset > 0 ) {
                lastSticky.classList.remove("sticky");
                refreshSticky("minus");
            }
        }            

        function refreshSticky(sum) {
            stickySections = document.querySelectorAll(".section-home.sticky");
            
            if ( sum === 'plus' ) {
                stickyAmount++;
            }
            else if ( sum === 'minus' ) {
                stickyAmount--;
            }
            stickyCounter();
        }

        sectionsPicker();
        stickyCheckerAdd();   
        stickyCheckerRemove();       

        window.onscroll = function() {
            stickyCheckerAdd();
            stickyCheckerRemove();
            sectionOpacity();
        };

        window.onresize = function() {
            fixedSections();
            stickyCheckerAdd();
            stickyCheckerRemove();
            sectionOpacity();
        };
    }

    fixedSections();
}

///* typing text *///
if (document.querySelector(".welcome .section-title")) {
    var text = document.querySelector(".welcome .section-title span");
    text.innerHTML = text.innerHTML.replace(/\S/g, '<span class="letter">$&</span>');

    let textWrapper = text.querySelectorAll("span.letter");
    textWrapper.forEach(function(i, index) {    
        setTimeout(function(){ 
            i.classList.add("letter-show"); 
        }, 120 * index);
    })
}

///* mobile menu *///
document.addEventListener("click", mobileMenu);

function mobileMenu(e) {
    if(window.screen.width <= 768) {
        let menuBox = document.querySelector(".header-menu");
        let body = document.querySelector("body");

        if(e.target.classList.contains("header-btn")) {
            if(!e.target.classList.contains("active")) {
                e.target.classList.add("active");
                menuBox.classList.add("active");
                body.classList.add("menu-opened");
            } else {
                e.target.classList.remove("active");
                menuBox.classList.remove("active");
                body.classList.remove("menu-opened");
            }
        }         
   }    
}