//URL SETTINGS
let url = "http://remotelab.esi.cit.tum.de:8080/virtual-coffee-machine-1_9";

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

    //SUBSCRIBE THE EVENT
    thing.subscribeEvent("outOfResource", async (data) => { //DEFINE WHAT SUBSCRIBER DOES
        
        missing_element = await data.value(); //READ THE EVENT PAYLOAD -- MISSING RESOURCE
        //READ THE AMOUNT OF MISSING ELEMENT
        current_amount = await (
            await thing.readProperty("availableResourceLevel", { uriVariables: { id: missing_element } })
        ).value();
        console.log(missing_element ,":",current_amount );
        amount_to_add = 100 - current_amount; //CALCULATE THE AMOUNT TO FILL 100%
        //INVOKE FILL ACTION
        d1 = await thing.invokeAction("refillResource",amount_to_add, { uriVariables: { id: missing_element } } );
        //CHECK THE AMOUNT
        now_amount = await (
            await thing.readProperty("availableResourceLevel", { uriVariables: { id: missing_element } })
        ).value();
        console.log("Now:", missing_element ,":",now_amount );
        //EXIT
        process.exit(0);
    });
    
       
}).catch((err) => { console.error(err); });



