import pizzaCollection from './pizzaCollection.json' assert {type: "json"};

// (?) - ПОРІШАТИ З РОЗМІРАМИ МЕНЮ

var orderArray = new Array();

initializeSite();

window.addEventListener('load', function() {
    let testArray = JSON.parse(localStorage.getItem('storedOrders'));

    if(localStorage.getItem('storedOrders') && testArray.length>0){
        orderArray = testArray;

        for(let order of orderArray){
            uploadOrderPanel(order.title, order.quant, order.icon, order.diameter, order.grams, order.cost, order.isBig);
            let ordersAmount = document.querySelector("#title-amount");
            let ordersAmountInt=parseInt(ordersAmount.innerText,10);
            ordersAmountInt++;
            ordersAmount.innerText = ordersAmountInt.toString();
        }
    }
});

// Налаштовує стартові умови сторінки. Задає дані про піци в меню, 
// додає події до 'очистити замовлення', 'замовити'
function initializeSite(){

    let clearOrders = document.querySelector('#cancel');

    clearOrders.addEventListener("click", function(){

        let ordersPanel = document.querySelector("#orders");
        ordersPanel.innerHTML = '';

        let ordersAmount = document.querySelector("#title-amount");
        let ordersAmountInt=0;

        ordersAmount.innerText = ordersAmountInt.toString();
        
        let totalPrice = document.querySelector("#price").innerHTML.replace("грн", "");
        updateTotal(totalPrice, true);
        orderArray.length = 0;
        localStorage.setItem('storedOrders', JSON.stringify(orderArray));
    });

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

    let popularBadge = document.createElement("span");
    popularBadge.innerText = "Популярна";
    popularBadge.setAttribute('class', 'popular');

    let newBadge = document.createElement("span");
    newBadge.innerText = "Нова";
    newBadge.setAttribute('class', 'new');


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
                                <img src="assets/images/size-icon.svg" alt="">
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
                                <img src="assets/images/size-icon.svg" alt="">
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
        console.log(parentElement.outerHTML);

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
                                <img src="assets/images/size-icon.svg" alt="">
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
                                <img src="assets/images/size-icon.svg" alt="">
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

    let badgesDiv = document.createElement("div");
    badgesDiv.setAttribute("class", "badges");

    if(isPopular) badgesDiv.appendChild(popularBadge);
    if(isNew) badgesDiv.appendChild(newBadge);

    divCol6.appendChild(badgesDiv);

    parentElement.append(divCol6);
}

function uploadOrderPanel(name, amount, image, size, weight, price, isBig){
    let orderDiv = document.createElement("div");
    orderDiv.className = "order-wrapper";

    let plus = document.createElement("button");
    plus.className = "plus";
    plus.innerText = '+';
   

    let minus = document.createElement("button");
    minus.className = "minus";
    minus.innerText = '-';
    if(amount==1) minus.style.display = 'none';
    else minus.style.display = 'inline-block';

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
            <span class="price-icon">₴</span>
            <button class="minus">-</button>
            <span class="amount">${amount}</span>
            <button class="plus">+</button>
            <button class="delete">x</button>
        </div>
    </div>
    <img class="pizza-img" src="${image}" alt="">`;

    orderDiv.querySelector('.plus').replaceWith(plus);
    orderDiv.querySelector('.minus').replaceWith(minus);
    orderDiv.querySelector('.delete').replaceWith(deleteButton);

    let orderObj;
    if(name.includes('Маргарита')){
        orderObj = {
            title: name,
            diameter: size,
            grams: weight,
            cost: price,
            quant: amount,
            icon: image,
            scale: false
        }
    }
    else if(name.includes('Дольче маре')){
        orderObj = {
            title: name,
            diameter: size,
            grams: weight,
            cost: price,
            quant: amount,
            icon: image,
            scale: true
        }
    }
    else{
        orderObj = {
            title: name,
            diameter: size,
            grams: weight,
            cost: price,
            quant: amount,
            icon: image,
            scale: isBig
        }
    }

    let menuPizzas = document.querySelectorAll('.thumbnail');
    let pricePerOne, weightPerOne;

    for(let menuPizza of menuPizzas) {
        let h3 = menuPizza.querySelector('h3').innerText;

        if(name.includes(h3)) {
            if(isBig){
                pricePerOne = menuPizza.querySelector('.big-pizza-price').innerText;
                weightPerOne = menuPizza.querySelector('.big-weight').innerText;
            } 
            else{
                pricePerOne = menuPizza.querySelector('.small-pizza-price').innerText;
                weightPerOne = menuPizza.querySelector('.small-weight').innerText;
            }
        }
    }

    plus.addEventListener("click", function() {
        increase(orderDiv, pricePerOne, weightPerOne, isBig, orderObj);
    });

    minus.addEventListener("click", function() {
        decrease(orderDiv, pricePerOne, weightPerOne, isBig, orderObj);
    });

    deleteButton.addEventListener("click", function() {
        removeOrder(orderDiv, orderObj);
    });

    let ordersDiv = document.querySelector('#orders');
    ordersDiv.appendChild(orderDiv);

    updateTotal(price, false);
    // orderArray.push(orderDiv);
}

//Створює панель замовлення та ставить y сторінку
function createOrderPanel(name, image, size, weightPerOne, pricePerOne, isBig){

    let orderDiv = document.createElement("div");
    orderDiv.className = "order-wrapper";

    let plus = document.createElement("button");
    plus.className = "plus";
    plus.innerText = '+';
   

    let minus = document.createElement("button");
    minus.className = "minus";
    minus.innerText = '-';
    minus.style.display = 'none';

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
            <span class="grams">${weightPerOne}</span>
        </div>
        <div class="col-3">
            <span class="price">${pricePerOne}</span>
            <span class="price-icon">₴</span>
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

    let orderObj;
    if(name.includes('Маргарита')){
        orderObj = {
            title: name,
            diameter: size,
            grams: weightPerOne,
            cost: pricePerOne,
            quant: 1,
            icon: image,
            scale: false
        }
    }
    else if(name.includes('Дольче маре')){
        orderObj = {
            title: name,
            diameter: size,
            grams: weightPerOne,
            cost: pricePerOne,
            quant: 1,
            icon: image,
            scale: true
        }
    }
    else{
        orderObj = {
            title: name,
            diameter: size,
            grams: weightPerOne,
            cost: pricePerOne,
            quant: 1,
            icon: image,
            scale: isBig
        }
    }

    plus.addEventListener("click", function() {
        increase(orderDiv, pricePerOne, weightPerOne, isBig, orderObj);
    });

    minus.addEventListener("click", function() {
        decrease(orderDiv, pricePerOne, weightPerOne, isBig, orderObj);
    });

    deleteButton.addEventListener("click", function() {
        removeOrder(orderDiv, orderObj);
    });

    let ordersAmount = document.querySelector("#title-amount");
    let ordersAmountInt=parseInt(ordersAmount.innerText,10);
    ordersAmountInt++;
    ordersAmount.innerText = ordersAmountInt.toString();

    let ordersDiv = document.querySelector('#orders');
    ordersDiv.appendChild(orderDiv);

    orderArray.push(orderObj);
    localStorage.setItem('storedOrders', JSON.stringify(orderArray));
}

function updateArray(pizzasAmount, pizzaPrice, pizzaWeight, pizzaScale, orderObj){
    for(let arrayObj of orderArray){
        if(orderObj.title == arrayObj.title){
            arrayObj.cost = pizzaPrice;
            arrayObj.grams = pizzaWeight;
            arrayObj.isBig = pizzaScale;
            arrayObj.quant = pizzasAmount;
        }
    }
    console.log(orderArray);
    localStorage.setItem('storedOrders', JSON.stringify(orderArray));
    console.log(localStorage);
}

// Задає інфу про замовлення піци
function orderPizza(e){

    let clickedPizzaName, image, size, weightPer1, pricePer1, isBig;

    let button = e.target;
    let clickedPanel = button.parentElement.parentElement.parentElement.parentElement;
    image = clickedPanel.querySelector(".pizza-image").getAttribute("src");

    clickedPizzaName = clickedPanel.querySelector("h3").innerText;

    if(button.className.includes("big")){
        clickedPizzaName += " (велика)";
        weightPer1 = clickedPanel.querySelector('.big-weight').innerText;
        pricePer1 = clickedPanel.querySelector('.big-pizza-price').innerText;
        size = clickedPanel.querySelector(".big-size").innerText;
        isBig = true;
    }
    else if(button.className.includes("small")){
        clickedPizzaName += " (мала)";
        weightPer1 = clickedPanel.querySelector('.small-weight').innerText;
        pricePer1 = clickedPanel.querySelector('.small-pizza-price').innerText;
        size = clickedPanel.querySelector(".small-size").innerText;
        isBig = false;
    }

    let ordersCollection = document.querySelectorAll('.order-wrapper');

    if(ordersCollection.length != 0){
        let isPresent = false;

        for(let order of ordersCollection){
            let orderName = order.querySelector('.order-name').innerText;

            if(clickedPizzaName === orderName){
                isPresent=true;

                let orderObj;
                for(let order of orderArray){
                    if(clickedPizzaName === order.title){
                        orderObj = order;
                    }
                }
                increase(order, pricePer1, weightPer1, isBig, orderObj);
            }
        }
        if(isPresent == false){ 
            createOrderPanel(clickedPizzaName, image, size, weightPer1, pricePer1, isBig);
            updateTotal(pricePer1);
        }
    }
    else{
        createOrderPanel(clickedPizzaName, image, size, weightPer1, pricePer1, isBig);
        updateTotal(pricePer1);
    }

}


// Оновлює меню під впливом фільтру
function filterMenu(event){

    let filter = event.target.id;

    let pizzaPanels = document.querySelectorAll(".col-sm-6.col-md-4");
    pizzaPanels.forEach(panel =>{
        panel.remove();
    });
    let menuCounter = document.querySelector('#pizza-types');
    let menuCounterInt = 0;
    let filterName = document.querySelector("#header p");;
        if(filter == "mushrooms"){
            filterName.innerText = "З грибами ";

            for(let pizza of pizzaCollection){
                if(pizza.content.hasOwnProperty("mushroom")){
                    setPizzaPanelInfo(pizza);
                    menuCounterInt++;
                }
            }
        }
        else if(filter == "pineapple"){
            filterName.innerText = "З ананасами ";

            for(let pizza of pizzaCollection){
                if(pizza.content.hasOwnProperty("pineapple")){
                    setPizzaPanelInfo(pizza);
                    menuCounterInt++;
                }
            }
        }
        else if(filter == "all"){
            initializeSite();
            menuCounterInt=8;
            filterName.innerText = "Усі піци ";
        }
        else{
            for(let pizza of pizzaCollection){

                if(filter == pizza.type){
                    setPizzaPanelInfo(pizza);
                    menuCounterInt++;

                    switch(pizza.type){
                        case "М’ясна піца":
                            filterName.innerText = "М'ясні ";
                            break;
                        case "Морська піца":
                            filterName.innerText = "З морепродуктами ";
                            break;
                        case "Вега піца":
                            filterName.innerText = "Веганські ";
                            break;
                    }
                }
            }
        }
    menuCounter.innerText = menuCounterInt.toString();
    filterName.appendChild(menuCounter);
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
function increase(orderDiv, pricePerOne, weightPerOne, pizzaScale, orderObj){

    let minus = orderDiv.querySelector('.minus');
    minus.style.display = 'inline-block';

    let pizzasAmount = orderDiv.querySelector(".amount");
    let pizzasPrice = orderDiv.querySelector(".price");
    let pizzasWeight = orderDiv.querySelector(".grams");

    let currentAmount = parseInt(pizzasAmount.innerText, 10);
    let currentPrice = parseInt(pizzasPrice.innerText, 10); 
    let currentWeight = parseInt(pizzasWeight.innerText, 10);     

    currentAmount += 1; 
    currentPrice = pricePerOne * currentAmount;
    currentWeight = weightPerOne * currentAmount;
    
    pizzasAmount.innerText = currentAmount.toString(); 
    pizzasPrice.innerText = currentPrice.toString();
    pizzasWeight.innerText = currentWeight.toString();

    updateTotal(pricePerOne, false);
    updateArray(pizzasAmount.innerText, pizzasPrice.innerText, pizzasWeight.innerText, pizzaScale, orderObj);
}

// Збільшує ціну, вагу за к-сть піц
function decrease(orderDiv, pricePerOne, weightPerOne, pizzaScale, orderObj){

    let minus = orderDiv.querySelector('.minus');
    
    let pizzasAmount = orderDiv.querySelector(".amount");
    let pizzasPrice = orderDiv.querySelector(".price");
    let pizzasWeight = orderDiv.querySelector(".grams");

    let currentAmount = parseInt(pizzasAmount.innerText, 10);
    let currentPrice = parseInt(pizzasPrice.innerText, 10); 
    let currentWeight = parseInt(pizzasWeight.innerText, 10);    

    if(currentAmount-1==1){
        minus.style.display = 'none';
    }
    currentAmount -= 1; 
    currentPrice = pricePerOne * currentAmount;
    currentWeight = weightPerOne * currentAmount;

    
    pizzasAmount.innerText = currentAmount.toString(); 
    pizzasPrice.innerText = currentPrice.toString();
    pizzasWeight.innerText = currentWeight.toString();

    updateTotal(pricePerOne, true);
    updateArray(pizzasAmount.innerText, pizzasPrice.innerText, pizzasWeight.innerText, pizzaScale, orderObj);
}

function updateTotal(priceChange, isSubtract) {
    let totalPriceElem = document.querySelector("#price");
    let totalPrice = parseInt(totalPriceElem.innerText, 10);
    priceChange = parseInt(priceChange, 10);

    if(isSubtract) totalPrice -= priceChange;
    else totalPrice += priceChange;

    totalPriceElem.innerText = totalPrice.toString()+" грн";
}

function removeOrder(orderDiv, orderObj) {
    let orderPrice = orderDiv.querySelector(".price").innerText;
    orderDiv.remove();
    updateTotal(orderPrice, true);
    orderArray = orderArray.filter(function(order){
        return order.title !== orderObj.title;
    });

    let ordersAmount = document.querySelector("#title-amount");
    let ordersAmountInt=parseInt(ordersAmount.innerText,10);
    ordersAmountInt--;
    ordersAmount.innerText = ordersAmountInt.toString();

    localStorage.setItem('storedOrders', JSON.stringify(orderArray));
}