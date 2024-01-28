//URL AND COFFEE SETTINGS
let url = "http://remotelab.esi.cit.tum.de:8080/virtual-coffee-machine-1_9";
let coffee_name = "americano" ;
let coffee_quantity =5;

var flag =1;   //FLAF TO INDICATE SUFFICIENT RESOURCE
//RECIPES COPIED FROM "4_recipesLog.json"
let requirement_obj = {
    espresso: { milk: 0, water: 1, chocolate: 0, coffeeBeans: 2 },
    americano: { milk: 0, water: 2, chocolate: 0, coffeeBeans: 2 },
    cappuccino: { milk: 1, water: 1, chocolate: 0, coffeeBeans: 2 },
    latte: { milk: 2, water: 1, chocolate: 0, coffeeBeans: 2 },
    hotChocolate: { milk: 0, water: 1, chocolate: 1, coffeeBeans: 0 },
    hotWater: { milk: 0, water: 1, chocolate: 0, coffeeBeans: 0 }
  };
//CREATE THE SERVIENT WITH ITS REQUIREMENTS
const { Servient } = require("@node-wot/core");
const { HttpClientFactory } = require("@node-wot/binding-http");
const servient = new Servient();
servient.addClientFactory(new HttpClientFactory(null));


//SERVIENT FUNCTIONALITY
servient.start().then(async (WoT) => {

    //GET TD AND CREATE THING
    const td = await WoT.requestThingDescription(url);
    let thing = await WoT.consume(td);
    
    //READ ALL RESOURCES
    current_obj = await (await thing.readProperty("allAvailableResources")).value();
    console.log(current_obj);

    for (ingredient in current_obj){// FOR EACH INGREDIENT

        //IF INGREDIENT IS INSUFFICIENT DISPLAY AND SET FLAG TO 0
        if (current_obj[ingredient]<coffee_quantity*requirement_obj[coffee_name][ingredient]){

            console.log("Insufficient", ingredient, ":", current_obj[ingredient], 
                    "instead of", coffee_quantity, "*" , requirement_obj[coffee_name][ingredient],
                    "=", coffee_quantity*requirement_obj[coffee_name][ingredient] );
            flag = 0;
        }
        
    }

    console.log(flag);

    if (flag===1){//IF RESOURCES ARE SUFFICIENT, MAKE DRINK AND EXIT
        d1 = await thing.invokeAction("makeDrink", {"drinkId": coffee_name, "size":"s","quantity":coffee_quantity} );
        process.exit(0);
    }
    else{//EXIT IF RESOURCES ARE NOT SUFFICIENT
        process.exit(0);
    }
    
    
       
}).catch((err) => { console.error(err); });



