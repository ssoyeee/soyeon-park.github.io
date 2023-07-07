'use strict';

// Project filter
const categories = document.querySelector('.categories');
const projects = document.querySelectorAll('.project');
const projectsContainer = document.querySelector('.projects');
categories.addEventListener('click', (event) => {
   const filter = event.target.dataset.category;
   if (filter == null) {
    return;
   } 

   // Active menu
   const active = document.querySelector('.category--selected');
   active.classList.remove('category--selected');
   event.target.classList.add('category--selected');

   // Project filter
   projectsContainer.classList.add('anim-out');
   projects.forEach(project => {
    if(filter === 'all' || filter === project.dataset.type) {
        project.style.display = 'block';
    }else {
        project.style.display = 'none';
    }
   });
   setTimeout(()=>{
    projectsContainer.classList.remove('anim-out');
   }, 250)
});