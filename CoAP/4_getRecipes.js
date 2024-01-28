//URL SETTINGS
let url = "coap://remotelab.esi.cit.tum.de:8080/virtual-coffee-machine-2_9";

//EMPTY OBJECTS FOR CURRENTLY ITERATED DRINK AND ALL DRINKS
var drink_recipes = {};
var this_recipe = {};

//CREATE THE SERVIENT WITH ITS REQUIREMENTS
const { Servient } = require("@node-wot/core");
const { CoapClientFactory } = require("@node-wot/binding-coap");
const servient = new Servient();
servient.addClientFactory(new CoapClientFactory(null));

//SERVIENT FUNCTIONALITY
servient.start().then(async (WoT) => {
    //GET TD AND CREATE THING
    const td = await WoT.requestThingDescription(url);
    let thing = await WoT.consume(td);

    //READ ALL DRINKS
    possible_drink_list = await (await thing.readProperty("possibleDrinks")).value();
    
    for (let aa=0; aa< possible_drink_list.length; aa++){   //FOR ALL DRINKS
        
        this_recipe = {}; //EMPTY THE CURRENTLY ITERATED RECIPE OBJECT
        //GET THE AMOUNT OF RESOURCES BEFORE MAKING THE DRINK
        before_obj = await (await thing.readProperty("allAvailableResources")).value();
        //MAKING THE DRINK
        d1 = await thing.invokeAction("makeDrink", {"drinkId": possible_drink_list[aa], "size":"s","quantity":1} );
        //GET THE AMOUNT OF RESOURCES AFTER MAKING THE DRINK
        after_obj = await (await thing.readProperty("allAvailableResources")).value();

        //CALCULATING THE RECIPE FOR EACH INGREDIENT BY SUBTRACTION
        for (ingredient in after_obj){
            this_recipe[ingredient] = before_obj[ingredient] - after_obj[ingredient];
        }
        // PASSING THE OBJECT TO THE OVERALL OBJECT    
        drink_recipes[possible_drink_list[aa]] = this_recipe;
        
    }
    //LOGGING AND EXIT
    const fs = require('fs');
    fs.writeFileSync("4_recipesLog.json", JSON.stringify(drink_recipes));
    process.exit(0);

}).catch((err) => { console.error(err); });



