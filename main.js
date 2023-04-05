// cattura icona mano navbar
let navIcon = document.querySelector('#navIcon');
navIcon.addEventListener('click', ()=>{
        navIcon.classList.toggle('fa-rotate-180');
})


// cattura navbar
let mainNavbar = document.querySelector('#mainNavbar');
let logoA = document.querySelector('#logoA');
let logoB = document.querySelector('#logoB');
// evento NAVBAR
window.addEventListener('scroll', ()=>{
    if(window.scrollY > 0){
        mainNavbar.classList.remove('bg-transparent');
        mainNavbar.classList.add('background-whiteC');
        logoB.classList.remove('d-none');
        logoA.classList.add('d-none');
    } else {
        mainNavbar.classList.remove('background-whiteC');
        mainNavbar.classList.add('bg-transparent');
        logoA.classList.remove('d-none');
        logoB.classList.add('d-none');
    }
})