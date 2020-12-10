"use strict";
exports.__esModule = true;
exports.Logger = exports.Message = void 0;
var ajv_1 = require("ajv");
var ajv_formats_1 = require("ajv-formats");
var messageSchema = require("../traceSchemaSingle.json");
var fs = require("fs");
//Setup validator
var ajv = new ajv_1["default"]();
(0, ajv_formats_1["default"])(ajv);
var validate = ajv.compile(messageSchema);
var Message = /** @class */ (function () {
    /**
     * @constructor Instantiates a new Message instance
     * @param interactionId
     * @param messagePairId
     * @param affordance
     * @param operation
     * @param sender
     * @param recipient
     * @param timeStamp
     * @param payload
     */
    function Message(messagePairId, affordance, operation, sender, recipient, payload) {
        this.interactionId = 0;
        this.messagePairId = messagePairId;
        this.operation = operation;
        this.payload = payload;
        this.sender = sender;
        this.recipient = recipient;
        this.affordance = affordance;
    }
    Message.getAffordanceInstance = function (name, type) {
        return {
            name: name,
            type: type
        };
    };
    Message.getThingInfoInstance = function (type, thingId, thingTitle) {
        return {
            type: type,
            thingId: thingId,
            thingTitle: thingTitle
        };
    };
    return Message;
}());
exports.Message = Message;
/**
 * @class A class encapsulating logging functionality.
 */
var Logger = /** @class */ (function () {
    /**
     * @constructor Instantiates a new Logger object. Private to not allow more creating more than one instance
     */
    function Logger() {
        this.interactionCounter = 1;
        this.logs = [];
    }
    /**
     * This method instantiates a new Logger instance the first time it is called. Subsequent calls return a reference to the created singleton. Should be called instead of normal `new` call
     * @returns A new Logger instance if none was created or the singleton instance that was created
     */
    Logger.getInstance = function () {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    };
    /**
     * Logs message to console. Does NOT add it to logs list! This can be used for debugging purposes
     * @param message The message to log. Should be instantiated using {@link createLogMessage}
     */
    Logger.prototype.consoleLogMessage = function (message) {
        message.interactionId = this.interactionCounter;
        message.timeStamp = new Date().toISOString();
        var valid = validate(message);
        if (!valid)
            throw Error("Message did not validate trace schema: ".concat(JSON.stringify(validate.errors)));
        var message_s = JSON.stringify(message);
        console.info(message_s);
        this.interactionCounter = this.interactionCounter + 1;
    };
    /**
     * Adds a message to {@link Logger.logs} of the {@link Logger} class.
     * @param message The message that should be added to the logs array. Should be instantiated using new {@link createLogMessage}
     */
    Logger.prototype.addMessage = function (message) {
        message.interactionId = this.interactionCounter;
        message.timeStamp = new Date().toISOString();
        var valid = validate(message);
        if (!valid)
            throw Error("Message did not validate trace schema: ".concat(JSON.stringify(validate.errors)));
        var new_mess = JSON.stringify(message);
        this.logs.push(new_mess);
        this.interactionCounter = this.interactionCounter + 1;
    };
    /**
     * Saves the messages in the {@link Logger.logs} to a file under  `./Log/${protocol}/${scriptName}.result.json`. This method should be called once after all the messages get added to the logs.
     * @param {string} scriptName The name of the script in which this function is called.
     * @param {'HTTP'|'CoAP' |'Multi'} protocol The name of the of the protocol used in the exercise. Should be either `HTTP`, `CoAP` or `Multi`
     */
    Logger.prototype.saveMessages = function (scriptName) {
        var output = this.writeAllMessages();
        fs.writeFile("./Log/".concat(scriptName, ".result.json"), output, function (err) {
            if (err) {
                console.error(err);
                return;
            }
        });
    };
    Logger.prototype.writeAllMessages = function () {
        var jsonMessages = this.logs.join(',');
        var output = "[".concat(jsonMessages, "]");
        return output;
    };
    return Logger;
}());
exports.Logger = Logger;
;
