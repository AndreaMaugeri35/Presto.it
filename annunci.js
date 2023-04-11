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

// fetch 
fetch('./annunci.json').then( (response)=> response.json() ).then( (data)=> {

    // cattura wrapper radio buttons    
    let categoryWrapper = document.querySelector('#categoryWrapper');
    
    // cattura wrapper delle cards annunci   
    let cardsWrapper = document.querySelector('#cardsWrapper');
    
    
    // funzione che crea i radio buttons  
    function setCategoryFilters(){   
    let categories = data.map( (annuncio)=> annuncio.category );
    
    // ho bisogno di un array con le categorie che non si ripetono, quindi.   
    let uniqueCategories = [];
    
    categories.forEach( (category)=>{
    
        if( !uniqueCategories.includes(category)){    
            uniqueCategories.push(category)    
            } 
        } )
        uniqueCategories.forEach( (category)=>{    
            let div = document.createElement('div');    
            div.classList.add('form-check');    
            div.innerHTML = `            
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
                        <label class="form-check-label" for="${category}">
                        ${category}
                        </label>                   
            `;     
            categoryWrapper.appendChild(div); 
            } )
        }
 
    setCategoryFilters();
       
    // funzione mostra cards   
    function showCards(array){    
        // svuotamento wrapper
        cardsWrapper.innerHTML = '';    
        // metto le card in ordine decrescente        
        array.sort((a, b) => Number(b.price - a.price));      
        array.forEach( (element)=>{       
            let div = document.createElement('div');   
            div.classList.add('col-12' , 'col-md-4' , 'col-lg-3' , 'my-5');    
            div.innerHTML = `            
                            <div class="announcement-card p-3 text-secondaryC text-center">
                                <div>
                                    <p class="h3 text-primaryC my-2">${element.name}</p>
                                    <h3>${element.category}</h3>
                                    </div>    
                                    <img class = "w-75 background-primaryC" src="${element.image}" alt="">
                                <h3>${element.price} €</h3>                               
                            </div>          
            `;   
    
            cardsWrapper.appendChild(div);       
        } )   
        }    
        showCards(data);
     
        // funzione filtra per categoria, mostra cards (al click sul radio button)   
        function filterbyCategory(categoria){   
            if(categoria != 'All'){  
                let filtered = data.filter( (annuncio)=> annuncio.category == categoria ); 
                showCards(filtered);
            } else {
                showCards(data);
            }
        }
    
        // cattura radio buttons 
        let checkInputs = document.querySelectorAll('.form-check-input')
        checkInputs.forEach( (checkInput)=>{
            checkInput.addEventListener('click', ()=>{
                filterbyCategory(checkInput.id);
            })
        })
    
        // cattura range input and number
        let inputPrice = document.querySelector('#inputPrice');
        let incrementNumber = document.querySelector('#incrementNumber');
    
        // funzione settaggio valore input price massimo
        function setInputPrice(){ 
            let prices = data.map( (annuncio)=> Number(annuncio.price) );
            let maxPrice = Math.max(...prices);
            inputPrice.max = Math.ceil(maxPrice);
            inputPrice.value = Math.ceil(maxPrice);
            incrementNumber.innerHTML = Math.ceil(maxPrice);
        }
        setInputPrice();
    
        // funzione che filtra per prezzo  
        function filterbyPrice(prezzo){
            let filtered = data.filter( (annuncio)=> annuncio.price <= Math.ceil(prezzo) );        
            showCards(filtered);
        }
    
        //  evento al cambio dell'input range 
        inputPrice.addEventListener('input', ()=>{
            filterbyPrice(inputPrice.value);
            incrementNumber.innerHTML = inputPrice.value;
        } )
    
        // cattura word input per filtro per parola 
        let wordInput = document.querySelector('#wordInput');
    
        // funzione filtra per parola
        function filterbyWord(nome){
            let filtered = data.filter ( (annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()) );
            showCards(filtered);
        }
    
        // evento digitazione parola sull'input
        wordInput.addEventListener('input', ()=>{
            filterbyWord(wordInput.value);
        })
    } )