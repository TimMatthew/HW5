import pizzaCollection from './pizzaCollection.json' assert {type: "json"};

initializeMenu();

function initializeMenu(){

    for(let pizza of pizzaCollection) {
       
        let title = pizza.title;
        let type = pizza.type;
        let icon = pizza.icon;

        let smallWeight = pizza.small_size.weight;
        let smallSize = pizza.small_size.size;
        let smallPrice = pizza.small_size.price;

        let bigWeight = pizza.big_size.weight;
        let bigSize = pizza.big_size.size;
        let bigPrice = pizza.big_size.price;

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
    // let pizzaObject = pizzaCollection[0];
    // console.log(pizzaObject);
    // let titles = pizzaCollection.map(pizza => pizza.title);
    // titles.forEach(title => console.log(title));
}

function createPizzaPanel(title, type, icon, content, smallWeight, smallSize,
    smallPrice, bigWeight, bigSize, bigPrice, isNew, isPopular){

    let divCol6 = document.createElement("div");
    divCol6.setAttribute("class", "col-sm-6 col-md-4");
    
    let divThumb = document.createElement("div");
    divThumb.setAttribute("class", "thumbnail pizza-card");
    
    let pizzaImg = document.createElement("img");
    pizzaImg.setAttribute("src", icon);

    let caption = document.createElement("div");
    caption.setAttribute("class", "caption");
    
    let h3 = document.createElement("h3");
    h3.innerText = title;
    
    let pizzaType = document.createElement("p");
    pizzaType.setAttribute("class", "pizza-type");
    pizzaType.innerText = type;

}