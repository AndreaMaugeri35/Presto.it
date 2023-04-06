//cattura icona mano navbar
let navIcon = document.querySelector('#navIcon');
navIcon.addEventListener('click', ()=>{
        navIcon.classList.toggle('fa-rotate-180');
})


//navbar
let mainNavbar = document.querySelector('#mainNavbar');
let logoA = document.querySelector('#logoA');
let logoB = document.querySelector('#logoB');

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


// CHIAMATA ASINCRONA DI JAVASCRIPT
function createInterval(finalNumber, element){
    let counter = 0;
    let interval = setInterval( ()=>{
        if(counter < finalNumber){
            counter=counter+11;
            element.innerHTML = counter;
        } else {
            clearInterval(interval);
        }
    },1)
}

createInterval();

//cattura degli span con numero 0
let firstSpan = document.querySelector('#first-span');
let secondSpan = document.querySelector('#second-span');
let thirdSpan = document.querySelector('#third-span');

let h2Test = document.querySelector('#h2Test');
// variabile d'appoggio per cessare l'incremento dei numeri
let intersectionCheck = true;
// funzione intersection observe
let observed = new IntersectionObserver(
    (entries)=>{
        entries.forEach( (entry)=>{
            if(entry.isIntersecting && intersectionCheck == true){
                createInterval(7659, firstSpan);
                createInterval(9996, secondSpan);
                createInterval(4567, thirdSpan);
                intersectionCheck = false;
            }
        } )
    }
)  
observed.observe(h2Test);
