//URL SETTINGS
let url = "http://remotelab.esi.cit.tum.de:8080/virtual-coffee-machine-1_13";
//EMPTY LIST FOR STEPS OF CURRENTLY ITERATED DRINK AND EMPTY OBJECT FOR OVERALL
var this_drink_steps = [];
var drink_steps = {};

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
    //CREATE OBSERVER
    thing.observeProperty("taskStatus", async (data) => { //DEFINE WHAT OBSERVER DOES
        tstat = await data.value();   //READ THE STEP
        this_drink_steps.push(tstat); //PUSH TO THE CURRENTLY ITERATED LIST
    })
    .then( async()=>{//AFTER CREATING OBSERVER
        //READ ALL DRINKS
        possible_drink_list = await (await thing.readProperty("possibleDrinks")).value();
        
        for (let aa=0; aa< possible_drink_list.length; aa++){//FOR ALL DRINKS
            
            await new Promise(resolve => setTimeout(resolve, 1000)); //WAIT A LITTLE BIT 
            //ORDER THIS DRINK
            d1 = await thing.invokeAction("makeDrink", {"drinkId": possible_drink_list[aa], "size":"s","quantity":1} );
            await new Promise(resolve => setTimeout(resolve, 5000));//WAIT A LITTLE BIT 
            drink_steps[possible_drink_list[aa]] = this_drink_steps; //PASS THE STEPS TO OVERALL OBJECT
            this_drink_steps = []; //EMPTY THE LIST
            
        }
        //LOG & EXIT
        const fs = require('fs');
        fs.writeFileSync("6_stepsLog.json", JSON.stringify(drink_steps))
        process.exit(0);
        }
    )
}).catch((err) => { console.error(err); }); 