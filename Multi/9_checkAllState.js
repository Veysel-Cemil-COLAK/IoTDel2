//EMPTY STRINGS FOR TITLE AND STATUS AND OBJECT TO STORE ALL
status_string = "";
title_string = "";
overall_obj={};

//CREATE THE SERVIENT WITH ITS REQUIREMENTS
const { Servient } = require("@node-wot/core");
const { HttpClientFactory } = require("@node-wot/binding-http");
const servient = new Servient();
servient.addClientFactory(new HttpClientFactory(null));

//SERVIENT FUNCTIONALITY
servient.start().then(async (WoT) => {

    for (store=1; store<5;store++){ // FOR EACH STORE
        store_string = "store" + store;
        this_store_obj = {}; // CREATE OBJECT FOR THIS STORE
        for (automat = 1; automat<5; automat++){ //FOR EACH AUTOMAT IN THE STORE
            //CALCULATE URL
            url_index = 4*store + automat - 4;
            url = "http://remotelab.esi.cit.tum.de:8080/virtual-coffee-machine-1_" + url_index;
            //GET TD AND CREATE THING
            const td = await WoT.requestThingDescription(url);
            let thing = await WoT.consume(td);
            //READ STATUS AND TITLE
            status_var = await thing.readProperty("status");
            title_string = thing.getThingDescription().title;
            status_string = await status_var.value();
            //console.log(title_string, status_string);
            //PUT INTO THE OBJECT OF CURRENT STORE
            this_store_obj[title_string] = status_string;
        }
        //PASS CURRENT STORE TO OVERALL OBJECT 
        overall_obj[store_string] = this_store_obj;
    }
    //DISPLAY AND EXIT    
    console.log(overall_obj);
    process.exit(0);
    
}).catch((err) => { console.error(err); });





