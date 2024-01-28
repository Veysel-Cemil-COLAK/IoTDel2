//URL SETTINGS
let url = "coap://remotelab.esi.cit.tum.de:8080/virtual-coffee-machine-2_10";

//EMPTY OBJECT
var drink_times = {};

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
    

    for (let aa=0; aa< possible_drink_list.length; aa++){//FOR ALL DRINKS

        start = Date.now(); //MEASURE THE TIMESTAMP BEFORE
        //MAKING THE DRINK
        d1 = await thing.invokeAction("makeDrink", {"drinkId": possible_drink_list[aa], "size":"s","quantity":1} );
        end = Date.now(); //MEASURE THE TIMESTAMP AFTER
        drink_times[possible_drink_list[aa]] = ((end -start)/1000) +"s" ; //THE DIFFERENCE IS DURATION
            
    }
    //LOGGING AND EXIT
    const fs = require('fs');
    fs.writeFileSync("5_durationsLog.json", JSON.stringify(drink_times));
    process.exit(0);

}).catch((err) => { console.error(err); });