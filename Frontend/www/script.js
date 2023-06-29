import pizzaCollection from './pizzaCollection.json' assert {type: "json"};

// (!!!) - ПРОХЕНДЛИТИ ВІД'ЄМНІ ЗНАЧЕННЯ
// (!!!) - ПРИКРІПИТИ LOCAL STORAGE
// (!!!) - ОЧИЩАТИ КОШИК
// (!!!) - ОНОВЛЮВАТИ ЗАГАЛЬНУ СУМУ
initializeMenu();

// Задає дані про пци в меню
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


//Створює панель піци в меню й вставляє на сторінку
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
            <img class="pizza-image" src=${icon}>

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
                                <span class="big-size">${bigSize}</span>
                            </div>
                            <div>
                                <img src="assets/images/weight.svg" alt="">
                                <span class="big-weight">${bigWeight}</span>
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
            <img class="pizza-image" src=${icon}>

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
                                <span class="big-size">${bigSize}</span>
                            </div>
                            <div>
                                <img src="assets/images/weight.svg" alt="">
                                <span class="big-weight">${bigWeight}</span>
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
        divCol6.querySelector("#bigButton").replaceWith(bigButton);
    }
    else if(bigPrice==undefined){
        divCol6.innerHTML = 
        `<div class="thumbnail pizza-card">
            <img class="pizza-image" src=${icon}>

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
}


//Створює панель замовлення та ставить в сторінку
function createOrderPanel(name, image, size, weight, price, pricePerOne, weightPerOne){

    let orderDiv = document.createElement("div");
    orderDiv.className = "order-wrapper";

    let plus = document.createElement("button");
    plus.className = "plus";
    plus.innerText = '+';
   

    let minus = document.createElement("button");
    minus.className = "minus";
    minus.innerText = '-';
    // minus.style.display = 'none';

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerText = 'x';

    orderDiv.innerHTML = ` <div class="order-info">
        <div class="col-1">
            <span class="order-name">${name}</span>
        </div>
        <div class="col-2">
            <img class="size-icon" src="assets\\images\\size-icon.svg" alt="Діаметр піци">
            <span class="diameter">${size}</span>
            <img class="weight-icon" src="assets\\images\\weight.svg" alt="Вага">
            <span class="grams">${weight}</span>
        </div>
        <div class="col-3">
            <span class="price">${price}</span>
            <button class="minus">-</button>
            <span class="amount">1</span>
            <button class="plus">+</button>
            <button class="delete">x</button>
        </div>
    </div>
    <img class="pizza-img" src="${image}" alt="">`;

    orderDiv.querySelector('.plus').replaceWith(plus);
    orderDiv.querySelector('.minus').replaceWith(minus);
    orderDiv.querySelector('.delete').replaceWith(deleteButton);

    plus.addEventListener("click", function() {
        increase(orderDiv, pricePerOne, weightPerOne);
    });

    minus.addEventListener("click", function() {
        decrease(orderDiv, pricePerOne, weightPerOne);
    });

    deleteButton.addEventListener("click", function() {
        removeOrder(orderDiv);
    });

    let ordersDiv = document.querySelector('#orders');
    ordersDiv.appendChild(orderDiv, );
}


// Задає інфу про замовлення піци
function orderPizza(e){
    let button = e.target;
    let clickedPanel = button.parentElement.parentElement.parentElement.parentElement;
    let image = clickedPanel.querySelector(".pizza-image").getAttribute("src");

    let name, size, weight, price;

    if(button.className.includes("small")){

        name = clickedPanel.querySelector("h3").innerText + " (мала)";
        size = clickedPanel.querySelector(".small-size").innerText;
        weight = clickedPanel.querySelector(".small-weight").innerText;
        price = clickedPanel.querySelector(".small-pizza-price").innerText;
    }
    else if(button.className.includes("big")){
        name = clickedPanel.querySelector("h3").innerText + " (велика)";
        size = clickedPanel.querySelector(".big-size").innerText;
        weight = clickedPanel.querySelector(".big-weight").innerText;
        price = clickedPanel.querySelector(".big-pizza-price").innerText;

    }
    createOrderPanel(name, image, size, weight, price, price, weight);
}


// Оновлює меню під впливом фільтру
function filterMenu(event){

    event.preventDefault();
    let filter = event.target.id;
    console.log(filter);

    let pizzaPanels = document.querySelectorAll(".col-sm-6.col-md-4");
    pizzaPanels.forEach(panel =>{
        panel.remove();
    });


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

// Задає інфу для панелі піци
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

// Збільшує ціну, вагу за к-сть піц
function increase(orderDiv, pricePerOne, weightPerOne){

    let pizzasAmount = orderDiv.querySelector(".amount");
    let pizzasPrice = orderDiv.querySelector(".price");
    let pizzasWeight = orderDiv.querySelector(".grams");

    let currentAmount = parseInt(pizzasAmount.innerText, 10);
    let currentPrice = parseInt(price.innerText, 10); 
    let currentWeight = parseInt(pizzasWeight.innerText, 10);     

    currentAmount += 1; 
    currentPrice = pricePerOne * currentAmount;
    currentWeight = weightPerOne * currentAmount;
    
    pizzasAmount.innerText = currentAmount.toString(); 
    pizzasPrice.innerText = currentPrice.toString();
    pizzasWeight.innerText = currentWeight.toString();
}

// Збільшує ціну, вагу за к-сть піц
function decrease(orderDiv, pricePerOne, weightPerOne){

    let pizzasAmount = orderDiv.querySelector(".amount");
    let pizzasPrice = orderDiv.querySelector(".price");
    let pizzasWeight = orderDiv.querySelector(".grams");

    let currentAmount = parseInt(pizzasAmount.innerText, 10);
    let currentPrice = parseInt(price.innerText, 10); 
    let currentWeight = parseInt(pizzasWeight.innerText, 10);     

    currentAmount -= 1; 
    currentPrice = pricePerOne * currentAmount;
    currentWeight = weightPerOne * currentAmount;
    
    pizzasAmount.innerText = currentAmount.toString(); 
    pizzasPrice.innerText = currentPrice.toString();
    pizzasWeight.innerText = currentWeight.toString();
}

function removeOrder(orderDiv){
    orderDiv.remove();
}