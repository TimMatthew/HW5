import pizzaCollection from './pizzaCollection.json' assert {type: "json"};

initializeMenu();

function initializeMenu(){

    for(let pizza of pizzaCollection) {
       
        let title = pizza.title;
        let type = pizza.type;
        let icon = pizza.icon;

        let smallSize, smallPrice, smallWeight, bigWeight, bigSize, bigPrice;

         if(pizza.hasOwnProperty("small_size")){
            smallWeight = pizza.small_size.weight;
            smallSize = pizza.small_size.size;
            smallPrice = pizza.small_size.price;
         }

        if(pizza.hasOwnProperty("big_size")){
            bigWeight = pizza.big_size.weight;
            bigSize = pizza.big_size.size;
            bigPrice = pizza.big_size.price;
        }         

        let content = "";

        for(let contentGroup in pizza.content){
            if(pizza.content.hasOwnProperty(contentGroup)){
                content += pizza.content[contentGroup]+',';
            }
        }
        content = content.substring(0, content.length-1);
        content += '.';

        let isNew, isPopular;

        if(pizza.hasOwnProperty("is_new"))
            isNew=true;
        else 
            isNew = false;
        
        if(pizza.hasOwnProperty("is_popular"))
            isPopular = true;
        else
            isPopular = false;
        
        createPizzaPanel(title, type, icon, content, smallWeight, smallSize, 
            smallPrice, bigWeight, bigSize, bigPrice, isNew, isPopular);
    }

    let filters = document.querySelectorAll(".filters");
    for(let filter of filters){
        filter.addEventListener("click", filterMenu);
    }
}

function createPizzaPanel(title, type, icon, content, smallWeight, smallSize,
    smallPrice, bigWeight, bigSize, bigPrice, isNew, isPopular){

    let parentElement = document.querySelector('.row');

    let divCol6 = document.createElement("div");
    divCol6.setAttribute('class', 'col-sm-6 col-md-4')

    let smallButton = document.createElement("a");
    smallButton.setAttribute('class', 'small btn btn-default');
    smallButton.setAttribute('href', '#');
    smallButton.innerText = "Купити";
    smallButton.addEventListener("click", orderPizza);

    let bigButton = document.createElement("a");
    bigButton.setAttribute('class', 'big btn btn-default');
    bigButton.setAttribute('href', '#');
    bigButton.innerText = "Купити";
    bigButton.addEventListener("click", orderPizza);

    console.log(smallButton.outerHTML);
    console.log(bigButton.outerHTML);

    if(smallPrice != undefined && bigPrice!=undefined){
        divCol6.innerHTML = 
        `<div class="thumbnail pizza-card">
            <img src=${icon}>

            <div class="caption">
                
                <h3>${title}</h3>
                
                <p class="pizza-type">
                    ${type}
                </p>

                <p class="description">
                    ${content}
                </p>

                <div class="pizza-info">
                    <div class="small">
                        <div class="small-info">
                            <div>
                                <img src="assets\images\size-icon.svg" alt="">
                                <span class="small-size">${smallSize}</span>
                            </div>
                            <div>
                                <img src="assets/images/weight.svg" alt="">
                                <span class="small-weight">${smallWeight}</span>
                            </div>
                        </div>
                        <div class="small-price">
                            <span class="small-pizza-price">${smallPrice}</span>
                        </div>
                        <a id="smallButton" href="#" class="small btn btn-primary">Купити</a>
                    </div>
                    
                    <div class="big">
                        <div class="big-info">
                            <div>
                                <img src="assets\images\size-icon.svg" alt="">
                                <span>${bigSize}</span>
                            </div>
                            <div>
                                <img src="assets/images/weight.svg" alt="">
                                <span>${bigWeight}</span>
                            </div>
                        </div>
                        <div class="big-price">
                            <span class="big-pizza-price">${bigPrice}</span>
                        </div>
                        <a id="bigButton" href="#" class="big btn btn-primary">Купити</a>
                    </div>
                </div>
            </div>
        </div>`;

        divCol6.querySelector("#smallButton").replaceWith(smallButton);
        divCol6.querySelector("#bigButton").replaceWith(bigButton);
    }
    else if(smallPrice==undefined){
        divCol6.innerHTML = 
        `<div class="thumbnail pizza-card">
            <img src=${icon}>

            <div class="caption">
                
                <h3>${title}</h3>
                
                <p class="pizza-type">
                    ${type}
                </p>

                <p class="description">
                    ${content}
                </p>

                <div class="pizza-info">    
                    <div class="big">
                        <div class="big-info">
                            <div>
                                <img src="assets\images\size-icon.svg" alt="">
                                <span>${bigSize}</span>
                            </div>
                            <div>
                                <img src="assets/images/weight.svg" alt="">
                                <span>${bigWeight}</span>
                            </div>
                        </div>
                        <div class="big-price">
                            <span class="big-pizza-price">${bigPrice}</span>
                        </div>
                        <a id="bigButton" href="#" class="big btn btn-default">Купити</a>
                    </div>
                </div>
            </div>
        </div>`;
        divCol6.querySelector("#bigButton").replaceWith(bigButton);
    }
    else if(bigPrice==undefined){
        divCol6.innerHTML = 
        `<div class="thumbnail pizza-card">
            <img src=${icon}>

            <div class="caption">
                
                <h3>${title}</h3>
                
                <p class="pizza-type">
                    ${type}
                </p>

                <p class="description">
                    ${content}
                </p>

                <div class="pizza-info">
                    <div class="small">
                        <div class="small-info">
                            <div>
                                <img src="assets\images\size-icon.svg" alt="">
                                <span class="small-size">${smallSize}</span>
                            </div>
                            <div>
                                <img src="assets/images/weight.svg" alt="">
                                <span class="small-weight">${smallWeight}</span>
                            </div>
                        </div>
                        <div class="small-price">
                            <span class="small-pizza-price">${smallPrice}</span>
                        </div>
                        <a id="smallButton" href="#" class="small btn btn-primary">Купити</a>
                    </div>
                </div>
            </div>
        </div>`;
        divCol6.querySelector("#smallButton").replaceWith(smallButton);
    }

    parentElement.append(divCol6);
    console.log(divCol6);
}

function orderPizza(orderedPizza){
    window.alert("You`ve ordered pizza!");
}

function filterMenu(event){

    event.preventDefault();
    let filter = event.target.id;
    console.log(filter);

    let pizzaPanels = document.querySelectorAll(".col-sm-6.col-md-4");
    pizzaPanels.forEach(panel =>{
        panel.remove();
    });

    updatePanels(filter);
}

function updatePanels(filter){

        if(filter == "mushrooms"){
            for(let pizza of pizzaCollection){
                if(pizza.content.hasOwnProperty("mushroom")){
                    setPizzaPanelInfo(pizza);
                }
            }
        }
        else if(filter == "pineapple"){
            for(let pizza of pizzaCollection){
                if(pizza.content.hasOwnProperty("pineapple")){
                    setPizzaPanelInfo(pizza);
                }
            }
        }
        else if(filter == "all"){
            initializeMenu();
        }
        else{
            for(let pizza of pizzaCollection){
                if(filter == pizza.type){
                    setPizzaPanelInfo(pizza);
                }
            }
        }
}

function setPizzaPanelInfo(pizza){
    let title = pizza.title;
        let type = pizza.type;
        let icon = pizza.icon;

        let smallSize, smallPrice, smallWeight, bigWeight, bigSize, bigPrice;

         if(pizza.hasOwnProperty("small_size")){
            smallWeight = pizza.small_size.weight;
            smallSize = pizza.small_size.size;
            smallPrice = pizza.small_size.price;
         }

        if(pizza.hasOwnProperty("big_size")){
            bigWeight = pizza.big_size.weight;
            bigSize = pizza.big_size.size;
            bigPrice = pizza.big_size.price;
        }         

        let content = "";

        for(let contentGroup in pizza.content){
            if(pizza.content.hasOwnProperty(contentGroup)){
                content += pizza.content[contentGroup]+',';
            }
        }
        content = content.substring(0, content.length-1);
        content += '.';

        let isNew, isPopular;

        if(pizza.hasOwnProperty("is_new"))
            isNew=true;
        else 
            isNew = false;
        
        if(pizza.hasOwnProperty("is_popular"))
            isPopular = true;
        else
            isPopular = false;
        
        createPizzaPanel(title, type, icon, content, smallWeight, smallSize, 
            smallPrice, bigWeight, bigSize, bigPrice, isNew, isPopular);
}