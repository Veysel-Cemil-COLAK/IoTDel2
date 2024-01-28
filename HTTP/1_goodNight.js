// TARGET TIME & URL CONFIGURATION
let utc_hour_target = 21;
let utc_min_target = 0;
let url = "http://remotelab.esi.cit.tum.de:8080/virtual-coffee-machine-1_12";


// THE FUNCTION THAT CHECKS WHETHER IT IS THE TIME
function measure_time_flag(){

        const date = new Date;
        utc_hour = date.getUTCHours();      //GET HOUR
        utc_min = date.getUTCMinutes();     //GET MINUTES
        //COMPARE
        if (utc_hour === utc_hour_target & utc_min === utc_min_target ){return true;} 
        else {return false;}
    
}

//THE CORE FUNCTIONALITY OF SERVIENT TO CHECK THE STATUS
async function op (WoT){
    const td = await WoT.requestThingDescription(url);
    let thing = await WoT.consume(td);
    status_var = await thing.readProperty("status");
    status_string = await status_var.value();
    if (status_string ==="idle"){
        disp_string = "can shutdown";
    }
    else{
        disp_string = "action still running";
    }
    console.log(disp_string);
}

//CREATE SERVIENT/CLIENT REQUIREMENTS
const { Servient } = require("@node-wot/core");
const { HttpClientFactory } = require("@node-wot/binding-http");

//CREATING THE SERVIENT & DEFINING ITS FUNCTIONALITY AFTER START
async function manage(){
    const servient = new Servient();
    servient.addClientFactory(new HttpClientFactory(null));
    servient.start().then(async (WoT) => {op(WoT);}).catch((err) => { console.error(err); });
}

while (!measure_time_flag()){}  //WAIT UNTIL IT IS THE TIME
manage();                       //CALL SERVIENT
process.exit(0);                //EXIT
