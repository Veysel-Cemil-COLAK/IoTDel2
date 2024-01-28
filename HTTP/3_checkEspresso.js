/*
NOTE: SINCE THE CODE ITSELF DOES NOT GENERATE OUTPUT,
I ADDED AN OPTIONAL TASK STATUS OBSERVER/DISPLAYER.
TO ACTIVATE, UNCOMMENT THE COMMENTED LINES.

IF THE LINES ARE AT THE COMMENT, STILL NO PROBLEM, IT WORKS.

*/ 


//URL & DRINK CONFIGURATION
let url = "http://remotelab.esi.cit.tum.de:8080/virtual-coffee-machine-1_10";
let coffee_name = "espresso" ;
let coffee_size = "s";
let coffee_quantity =1;
let order_spec = {"drinkId": coffee_name, 
                "size":coffee_size,
                "quantity":coffee_quantity
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
    /*//CREATE OBSERVER
        thing.observeProperty("taskStatus", async (data) => { //DEFINE WHAT OBSERVER DOES
        tstat = await data.value();
        console.log("stausTsk:", tstat);
        if (tstat ==="finished"){process.exit(0);}
    }).then(async function() { //AFTER CREATING OBSERVER
        await new Promise(resolve => setTimeout(resolve, 1000));*/ //WAIT A LITTLE BIT THE OBSERVER TO SET
        status_var = await thing.readProperty("status"); //CHECK STATUS
        status_string = await status_var.value();
        if (status_string === "idle"){ //IF IDLE
            d1 = await thing.invokeAction("makeDrink", order_spec); //INVOKE MAKE DRINK FOR DEFINED ORDER
            //await new Promise(resolve => setTimeout(resolve, 1000)); //WAIT A LITTLE BIT TO CAPTURE "FINISH"
            process.exit(0); //FINISH
        }
        else{
            console.log("Sorry,busy"); //DISPLAY MESSAGE
            process.exit(0); //FINISH
        }
    //});
    
    
    
}).catch((err) => { console.error(err); }); 

