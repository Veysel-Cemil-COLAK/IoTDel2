# Deliverable 2 - Part 1

In this deliverable, you will be interacting with simulated instances of
Things in order to get familiar with the Consumer side programming.
These Things are simulated in a very simple manner and there is no link between the interactions nor any behavior you can expect from their descriptions, i.e. `shutdown` does not shut-downs anything.

There are 16 Things for HTTP and CoAP and you are free to choose which
one you are interacting with. TDs of HTTP-based Things are listed at
<http://esiremotelab.esi.ei.tum.de:8080/> and the CoAP-based ones are at
[coap://esiremotelab.esi.ei.tum.de:5683/](coap://esiremotelab.esi.ei.tum.de:5683/). For example, you can get the
third HTTP instance’s TD at
<http://esiremotelab.esi.ei.tum.de:8080/Virtual-Coffee-Machine_1_3> and
the sixth CoAP instance’s TD at
[coap://esiremotelab.esi.ei.tum.de:5683/Virtual-Coffee-Machine\_2\_6](coap://esiremotelab.esi.ei.tum.de:5683/Virtual-Coffee-Machine_2_6). You
can see that the TDs sometimes have IP addresses instead of the domain
name but this should not matter.

## Programming Language

- If you are not using node-wot, make sure to communicate how we should run the programs and that we can run
it on a Linux machine and expect us to take more time grading it.
- Solutions that require a GUI environment are not accepted. 

- If you are using node-wot, choose the npm based installation mentioned in the lecture. 

- You can and should program in TypeScript (a tsconfig is provided in Moodle)
but your submission can be in JavaScript or other languages. 

- The template repository have the `.ts` ending for filenames but this should not be the case if you are using another language. You can delete the `.ts` files in that case.
- If you are using JavaScript, store your files at the same place as the `.ts` files. This applies to other languages as well.

**NOTE: DO NOT USE THE CLI WAY WITH NODE-WOT. Install all dependencies needed via `npm install`**

## Logging

For all the questions, you are required to log the requests you send and 
responses that you receive.
For logging, please use the `Logger` class provided in each template file. The definition of the class itself is under the `utils` folder
An example of how this should be logged and a schema to validate your 
logs is provided in the repository.
When a script you need to write is called `myScript.ts` for a task, there needs
to be a file called `myScript.result.json`. This JSON file should be submitted
to the repository and should be generated when your code is run by us. 
The generation should happen once the task is finished. 

### Why Logging

We want to be able to verify your submissions in a programming language agnostic way. Thus, we need to build the applicaiton logic you wrote from
the traces of WoT relevant operations.
When you are logging, you must make sure that any message that is relevant for the application logic (probably all of them) are logged and each message is linked to another one (request-response and subscription-notification).
The order of the messages is important, that is why there are timestamps, counters and messageIds that pair the messages.

## Tasks

Create a folder called `HTTP`. Write different a script for each of
the following question that communicates with one the HTTP based Things.

1. Write a script called `1_goodNight` that invokes the `shutdown`
    action everyday at 9pm UTC according to your runtime environment. Once the response is received, the
    program quits. Your script should be constantly running until the shutdown is successful.

2. Write a script called `2_cappuccino` that invokes the `brew` action
    with the `cappuccino` value. Once the response is received, the
    program quits.

3. Write a script called `3_checkEspresso` that invokes the `brew`
    action with the `espresso` if the machine is in `Ready` state. Once
    the response is received or if the machine is not ready, the program
    quits.

4. Write a script called `4_checkCoffee` that invokes the `brew`
    action with the coffee of your choice. However, before doing that it
    checks whether there is more than 10% water and coffee and that the
    bin is not more than 80% full. Once the response of the brewing is
    received or if the conditions are not met, the program quits.

5. Write a script called `5_callTheRepairman` that listens to the
    `maintenance` event. Once the event is received (the payload does
    not matter), the shutdown action is invoked. Once the response is
    received, the program quits. You do not have to unsubscribe.

6. Write a script called `6_errorCoffee` that invokes the `brew`
    action with the coffee of your choice. Before the response of the
    action is received, the program also subscribes to the error event
    and logs the event payload only if there is an event emitted while
    the Thing is responding. Once the response is received, the program
    quits. **Note:** This might be tricky to test, we can add artificial
    delay to the action invocation to make this easier.

7. Create a folder called `CoAP`. Do the same tasks as in the previous
questions but while interacting with a CoAP based Things. Keep the same filenames.

In this question, you are in the role of a store owner who needs to
manage his/her coffee machines. The coffee machines need to be monitored
daily, and the corresponding measures need to be taken to ensure a good
customer experience while keeping the costs down for you. The scripts in
this question should be located in a folder called `Multi`. You own 4
stores which have the following Coffee Machines (numbers correspond to
the store):

1. 6 HTTP based Coffee Machines: TDs found at
    <http://esiremotelab.esi.ei.tum.de:8080/Virtual-Coffee-Machine_1_1>
    to
    <http://esiremotelab.esi.ei.tum.de:8080/Virtual-Coffee-Machine_1_6>

2. 6 CoAP based Coffee Machines: TDs found at
    [coap://esiremotelab.esi.ei.tum.de:5683/Virtual-Coffee-Machine\_2\_1](coap://esiremotelab.esi.ei.tum.de:5683/Virtual-Coffee-Machine_2_1)
    to
    [coap://esiremotelab.esi.ei.tum.de:5683/Virtual-Coffee-Machine\_2\_6](coap://esiremotelab.esi.ei.tum.de:5683/Virtual-Coffee-Machine_2_6)

3. 3 HTTP and 3 CoAP based: 1\_7 to 1\_9 for HTTP and 2\_7 to 2\_9 for
    CoAP.

4. 3 HTTP and 3 CoAP based: 1\_10 to 1\_12 for HTTP and 2\_10 to 2\_12
    for CoAP.

**Note:** The events are emitted in every couple seconds to make it
easier for you to experiment, however, you can think them as every
couple of days to make more sense in real life. **Note:** It makes
it easier to define and use a configuration file for your stores and the
coffee machines they have.

8. Write a script called `8_goodNightYaAll` that invokes the
    `shutdown` action everyday at 9pm UTC for all the coffee machines in
    all your stores but not the other ones that are simulated (you are using
    12 of the 16 devices, do not invoke shutdown on the last 4 devices).
    Your script should be constantly running until the shutdown of all Things is successful.

For the next two questions, you do not need to log everything like you did in the previous tasks.

9. Write a script called `9_checkAllState` that checks the state of
    all the coffee machines across all the stores. 
    The results are outputted to console in form of
    a JSON Object whose keys are `store1`, `store2`, `store3`, `store4`
    and then the script quits. These keys contain JSON Objects with the
    title of the TDs as the keys. The value of each key is the state of
    the coffee machine. E.g.
    `{store1:{Virtual-Coffee-Machine_1_1:Ready},store2:{Vi...},...}"`

10. Write a script called `10_eventFrequency` that listens to all event
    emissions, i.e. maintenance and error, for 1 minute. It analyzes how
    frequent the events are emitted by calculating the average in
    seconds. The results are outputted in similar JSON structure to the
    previous question but each title key has two keys called
    `maintenance` and `error` that has number values to denote the
    average. E.g.    `{store1:{Virtual-Coffee-Machine_1_1:{error:12,maintenance:20},Virtual-Coffee-Machine_1_2:{er...},...}, storeX:{Virtual-Coffee-Machine_X_X:{"er...}...},...}`. You don't have to unsubscribe. see [here](https://github.com/eclipse/thingweb.node-wot/issues/323).
