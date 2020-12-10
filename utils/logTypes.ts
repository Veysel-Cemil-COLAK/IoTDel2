// To parse this data:
//
//   import { Convert, Message } from "./file";
//
//   const Message = Convert.toMessage(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  no-prototype-builtins */
/* eslint-disable   @typescript-eslint/explicit-module-boundary-types */


/**========================================================================
 *                           Type Declarations
 *========================================================================**/

/**
 * The Message object represents a request that is either sent or recieved
 * @property {Affordance} affordance Type of Affordance and name
 * @property {number} interactionId ID of a single request. Should be incremented at each message of an operation
 * @property {number} messagePairId ID of a request/response pair. Both request and response should have the same ID
 * @property {Operation} operation op value used for the interaction
 * @property {any} payload Payload supplied or returned serialized into JSON
 * @property {ThingInfo} sender Thing that sends the message or Mashup controller
 * @property {ThingInfo} recipient Thing that receives the message or Mashup controller
 * @property {string} timeStamp Time registered when message was sent or received
 */
 export interface MessageInterface {
  /**
   * Type of Affordance and name
   */
  affordance: Affordance;
  /**
   * ID of a single request. Should be incremented at each message of an operation
   */
  interactionId: number;
  /**
   * ID of a request/response pair. Both request and response should have the same ID
   */
  messagePairId: number;
  /**
   * op value used for the interaction
   */
  operation: Operation;
  /**
   * Payload supplied or returned serialized into JSON
   */
  payload?: any;
  /**
   * Thing that sends the message or Mashup controller
   */
  sender: ThingInfo;
  /**
   * Thing that receives the message or Mashup controller
   */
  recipient: ThingInfo;
  /**
   * Time registered when message was sent or received as ISO 8601 string 
   */
  timeStamp?: string ;
}

/**
 * Type of Affordance and name
 * @property {string} name Name of the affordance
 * @property {AffordanceType} type Type of the affordance - see: {@link AffordanceType}
 */
export interface Affordance {
  /**
   * Name of the affordance as the key in the JSON
   */
  name: string;
  type: AffordanceType;
}

export enum AffordanceType {
  Action = 'action',
  Event = 'event',
  Property = 'property'
}

/**
 * op value used for the interaction
 */
export enum Operation {
  Invokeaction = 'invokeaction',
  Observeproperty = 'observeproperty',
  Readallproperties = 'readallproperties',
  Readmultipleproperties = 'readmultipleproperties',
  Readproperty = 'readproperty',
  Subscribeevent = 'subscribeevent',
  Unobserveproperty = 'unobserveproperty',
  Unsubscribeevent = 'unsubscribeevent',
  Writeallproperties = 'writeallproperties',
  Writemultipleproperties = 'writemultipleproperties',
  Writeproperty = 'writeproperty'
}

/**
 * Thing that receives the message or Mashup controller
 * @property {ThingType} [type] The type of the recipient - see: {@link ThingType}
 * @property {string} [thingId] The id of the recipient
 * @property {string} [thingTitle] The title of the recipient
 */
export interface ThingInfo {
  /**
   * id field found in the TD
   */
  thingId?: string;
  /**
   * title field found in the TD
   */
  thingTitle?: string;
  type: ThingType;
}

/**
 * Types of recipients/receivers of the logged request/response.
 */
export enum ThingType {
  Controller = 'controller',
  Thing = 'thing'
}

