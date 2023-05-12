'use strict';

//Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(window.scrollY)
    // console.log(navbarHeight)
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    }else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {

    const target = event.target;
    const link = target.dataset.link;
    if(link==null){
        return;
    }else{
        navbarMenu.classList.remove('open');
        scrollIntoView(link);
        selectNavItem(target);
    }
});


// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', ()=> {
    navbarMenu.classList.toggle('open');
})


//Handle click on "contact me" button 
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
      scrollIntoView('#contact');
});

//Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{
    home.style.opacity = 1-window.scrollY/homeHeight; 
})

//Show 'arrow up' button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=> {
    if(window.scrollY > homeHeight/2) { 
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible');
    }
});

//Handle click on the 'arrow up' button
arrowUp.addEventListener('click', ()=> {
    scrollIntoView('#home');
});

//Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (event)=> {
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
    if(filter==null){
        return;
    }

    //Remove selection from the prev item and select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = event.target.nodeName === 'BUTTON' ? event.target : 
    event.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(()=> {
        projects.forEach((project) => {
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            }else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
});

// 1. Bring all elements in the section 
const sectionIds = [
    '#home', 
    '#about', 
    '#skills', 
    '#work', 
    '#contact'
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => 
    document.querySelector(`[data-link="${id}"]`)
);

// 2. Spy all sections by using IntersectionObserver
// 3. Activate its menu item when its section is shown
 let selectedNavIndex;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // Page comes up when scrolling down
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            }else {
                selectedNavIndex = index - 1;
            }

        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', ()=> {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    }else if (
        Math.round(window.scrollY + window.innerHeight) >= 
        document.body.clientHeight
    ){
        selectedNavIndex = navItems.length -1;
    }
    selectNavItem(navItems[selectedNavIndex]);
})