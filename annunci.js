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
    
    
        array.forEach( (element, i)=>{
    
    
            let div = document.createElement('div');
    
            div.classList.add('col-12' , 'col-md-3' , 'my-5');
    
            div.innerHTML = `
            
                            <div class="announcement-card text-center">
                                <img class="img-card-custom" src="${element.image}" alt="">
                                <div
                                <p class="h3 text-secondaryC">${element.name}</p>
                                <h3 class="text-primaryC">${element.category}</h3>
                                <h3 class="text-primaryC">${element.price} €</h3>
                                </div>
                            </div>
            
            `;
    
    
            cardsWrapper.appendChild(div);
    
    
    
        } )
    
        }
    
        showCards(data);
    
    
        // funzione filtra per categoria, mostra cards (al click sul radio button)
    
        function filterByCategory(array){
    
    
            // trasformiamo la node list in un array, sfruttando il papà di tutti gli array che si chiama Array e il suo metodo .from() che mi trasforma una nodelist (in questo caso specifico) in un array
    
            // dopo di che uso il metodo .find() che mi serve per trovare un solo elemento che rispetti una condizione che io pongo.
    
            // infine mi prendo l'id del bottone che userò come categoria
    
            // let categoria = Array.from(checkInputs).find( (button)=> button.checked).id;
    
            let arrayFromNodelist = Array.from(checkInputs);
    
            let button = arrayFromNodelist.find((bottone)=> bottone.checked);
    
            let categoria = button.id;
    
            // console.log(categoria);
    
    
            if(categoria != 'All'){
    
                let filtered = array.filter( (annuncio)=> annuncio.category == categoria );
    
                return filtered;
    
            } else {
    
                return data;
    
            }
    
            
    
        }
    
            // cattura radio buttons
    
        let checkInputs = document.querySelectorAll('.form-check-input')
    
        checkInputs.forEach( (checkInput)=>{
    
    
            checkInput.addEventListener('click', ()=>{
    
                globalFilter();
    
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
    
        function filterByPrice(array){
    
            let filtered = array.filter( (annuncio)=> annuncio.price <= +(inputPrice.value) );   
    
            console.log(filtered);
    
            return filtered;
    
        }
    
        //  evento al cambio dell'input range
    
        inputPrice.addEventListener('input', ()=>{
    
            incrementNumber.innerHTML = inputPrice.value;
    
            globalFilter();
            
        } )
    
        // cattura word input per filtro per parola
    
        let wordInput = document.querySelector('#wordInput');
    
        // funzione filtra per parola
    
        function filterByWord(array){
    
            let nome = wordInput.value;
        
    
            let filtered = array.filter ( (annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()) );
    
            return filtered;
    
        }
    
        // evento digitazione parola sull'input
       
        wordInput.addEventListener('input', ()=>{
    
            globalFilter();
    
        })
    
    
        // filtro dei filtri, funzione globale
    
        function globalFilter(){
        
            let filteredByCategory = filterByCategory(data);
        
            let filteredByPrice = filterByPrice(filteredByCategory);
        
            let filteredByWord = filterByWord(filteredByPrice);
        
            showCards(filteredByWord);
        
        
        }
    })