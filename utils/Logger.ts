import {MessageInterface, Affordance, Operation, ThingType, ThingInfo, AffordanceType} from './logTypes';
import Ajv, {JSONSchemaType} from "ajv"
import addFormats from "ajv-formats"
import * as messageSchema from '../traceSchemaSingle.json'
import * as fs from 'fs';

//Setup validator
const ajv = new Ajv()
addFormats(ajv)
const validate = ajv.compile(messageSchema)

export class Message implements MessageInterface {

  affordance: Affordance;
  interactionId: number;
  messagePairId: number;
  operation: Operation;
  payload: any;
  sender: ThingInfo;
  recipient: ThingInfo;
  timeStamp: string | undefined;

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
  constructor(messagePairId: number, affordance: Affordance, operation: Operation, sender: ThingInfo, recipient: ThingInfo, payload?: any) {
    this.interactionId = 0
    this.messagePairId = messagePairId
    this.operation = operation
    this.payload = payload
    this.sender = sender
    this.recipient = recipient
    this.affordance = affordance
  }

  static getAffordanceInstance(name: string, type: AffordanceType): Affordance {
    return {
      name,
      type
    }
  }

  static getThingInfoInstance(type: ThingType, thingId?: string, thingTitle?: string): ThingInfo {
    return {
      type,
      thingId,
      thingTitle
    }
  }
}

/**
 * @class A class encapsulating logging functionality.
 */
export class Logger {
  private static instance: Logger;

  interactionCounter: number;
  logs: Array<string>;

  /**
   * @constructor Instantiates a new Logger object. Private to not allow more creating more than one instance
   */
  private constructor() {
    this.interactionCounter = 1;
    this.logs = [];
  }
  
  /**
   * This method instantiates a new Logger instance the first time it is called. Subsequent calls return a reference to the created singleton. Should be called instead of normal `new` call
   * @returns A new Logger instance if none was created or the singleton instance that was created
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
}

  /**
   * Logs message to console. Does NOT add it to logs list! This can be used for debugging purposes
   * @param message The message to log. Should be instantiated using {@link createLogMessage}
   */
  consoleLogMessage(message: Message) {
    message.interactionId = this.interactionCounter;
    message.timeStamp = new Date().toISOString()
    let valid = validate(message)
    if(!valid) throw Error(`Message did not validate trace schema: ${JSON.stringify(validate.errors)}`)
    const message_s = JSON.stringify(message)
    console.info(message_s);
    this.interactionCounter = this.interactionCounter + 1;
  }
  /**
   * Adds a message to {@link Logger.logs} of the {@link Logger} class. 
   * @param message The message that should be added to the logs array. Should be instantiated using new {@link createLogMessage}
   */
  addMessage(message: Message) {
    message.interactionId = this.interactionCounter;
    message.timeStamp = new Date().toISOString()
    let valid = validate(message)
    if(!valid) throw Error(`Message did not validate trace schema: ${JSON.stringify(validate.errors)}`)
    const new_mess = JSON.stringify(message);
    this.logs.push(new_mess);
    this.interactionCounter = this.interactionCounter + 1;
  }
  /**
   * Saves the messages in the {@link Logger.logs} to a file under  `./Log/${scriptName}.result.json`. This method should be called once after all the messages get added to the logs.
   * @param {string} scriptName The name of the script in which this function is called.
   * @param {'HTTP'|'CoAP' |'Multi'} protocol The name of the of the protocol used in the exercise. Should be either `HTTP`, `CoAP` or `Multi`
   */
  saveMessages(scriptName: string) {
    const output = this.writeAllMessages();
    fs.writeFile(
      `./Log/${scriptName}.result.json`,
      output,
      (err): void => {
        if (err) {
          console.error(err);
          return;
        }
      });
  }

  private writeAllMessages() {
    const jsonMessages = this.logs.join(',');
    const output = `[${jsonMessages}]`;
    return output;
  }
};