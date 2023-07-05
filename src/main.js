// Dark Header when scrolling down

const header = document.querySelector('.header');
const headerHeight = header.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > headerHeight){
        header.classList.add('header--dark');
    }else {
        header.classList.remove('header--dark');
    }
})

// Made Home section transparent when scrolling down

const home = document.querySelector('.home__container');
const homeHeight = home.offsetHeight;
document.addEventListener('scroll', ()=> {
    home.style.opacity = 1 - window.scrollY / homeHeight; 
});

