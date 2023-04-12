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
        mainNavbar.classList.add('background-primaryC');
        logoB.classList.remove('d-none');
        logoA.classList.add('d-none');
    } else {
        mainNavbar.classList.remove('background-primaryC');
        mainNavbar.classList.add('bg-transparent');
        logoA.classList.remove('d-none');
        logoB.classList.add('d-none');
    }
})

// cattura opener
let opener = document.querySelector('.opener');

// cattura div moved
let movedDivs = document.querySelectorAll('.moved');

// variabile d'appoggio per far tornare indietro i moved

let conferma = false;

// array di oggetti, docenti

let teachers = [


    { name : 'Valerio', languages : ['HTML', 'CSS', 'JS', 'Pokémon'], url : './media/manager.png'},
    { name : 'Francesco', languages : ['HTML', 'CSS', 'Bootstrap', 'DOM'], url : './media/manager.png'},
    { name : 'Paola', languages : ['PHP', 'OOP', 'Laravel', 'Galga'], url : './media/manager.png'},
    { name : 'Robbolo', languages : ['React', 'Database', 'Manga'], url : './media/manager.png'},


]

// cattura cardWrapper
let cardWrapper = document.querySelector('#cardWrapper');


movedDivs.forEach((moved, i)=>{


    moved.style.backgroundImage = `url('${teachers[i].url}')`;

    // evento click per far apparire gli amici docenti

    moved.addEventListener('click', ()=>{


        // console.log(teachers[i]);

        cardWrapper.innerHTML = '';

        let div = document.createElement('div');
        
        div.classList.add('teacher-card');

        div.innerHTML = `
                    <p class="h3 text-accentC fw-bold fs-2">${teachers[i].name}</p>
                    <p class="text-accentC fw-bold fs-4">${teachers[i].languages}</p>
        `;

        cardWrapper.appendChild(div);


        // catturo la singola card per cambiare immagine

        let card = document.querySelector('.teacher-card');
        
        card.style.backgroundImage=`url('${teachers[i].url}')`;


    })

})


// evento su opener

opener.addEventListener('click', ()=>{


    if(conferma == false){


        conferma = true;

        movedDivs.forEach( (moved, i)=>{

            let angle = (360 * i) / movedDivs.length;
    
            moved.style.transform = `rotate(${angle}deg) translate(190px) rotate(-${angle}deg)`;

            opener.innerHTML = `<i class="fa-solid fa-minus text-secondaryC fa-5x"></i>`;
    
    
        })

    } else {

        conferma = false;

        cardWrapper.innerHTML = '';

        movedDivs.forEach( (moved)=>{

            // let angle = (360 * i) / movedDivs.length;
    
            moved.style.transform = `rotate(0deg) translate(0px)`;

            opener.innerHTML = `<i class="fa-solid fa-plus text-secondaryC fa-5x"></i>`;
    
    
        })


    }

  


})