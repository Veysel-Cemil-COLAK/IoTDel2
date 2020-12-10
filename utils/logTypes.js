"use strict";
// To parse this data:
//
//   import { Convert, Message } from "./file";
//
//   const Message = Convert.toMessage(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
exports.__esModule = true;
exports.ThingType = exports.Operation = exports.AffordanceType = void 0;
var AffordanceType;
(function (AffordanceType) {
    AffordanceType["Action"] = "action";
    AffordanceType["Event"] = "event";
    AffordanceType["Property"] = "property";
})(AffordanceType = exports.AffordanceType || (exports.AffordanceType = {}));
/**
 * op value used for the interaction
 */
var Operation;
(function (Operation) {
    Operation["Invokeaction"] = "invokeaction";
    Operation["Observeproperty"] = "observeproperty";
    Operation["Readallproperties"] = "readallproperties";
    Operation["Readmultipleproperties"] = "readmultipleproperties";
    Operation["Readproperty"] = "readproperty";
    Operation["Subscribeevent"] = "subscribeevent";
    Operation["Unobserveproperty"] = "unobserveproperty";
    Operation["Unsubscribeevent"] = "unsubscribeevent";
    Operation["Writeallproperties"] = "writeallproperties";
    Operation["Writemultipleproperties"] = "writemultipleproperties";
    Operation["Writeproperty"] = "writeproperty";
})(Operation = exports.Operation || (exports.Operation = {}));
/**
 * Types of recipients/receivers of the logged request/response.
 */
var ThingType;
(function (ThingType) {
    ThingType["Controller"] = "controller";
    ThingType["Thing"] = "thing";
})(ThingType = exports.ThingType || (exports.ThingType = {}));
