import { Logger, Message } from './utils/Logger';
import { AffordanceType, Operation, ThingType } from './utils/logTypes';

const logger = Logger.getInstance()

let request = new Message(1, Message.getAffordanceInstance("brew", AffordanceType.Action), Operation.Invokeaction, Message.getThingInfoInstance(ThingType.Controller), Message.getThingInfoInstance(ThingType.Thing, "urn:example:id", "SmartCoffee"), {"type": "espresso", "extras": "caramel"})

logger.addMessage(request)

let response = new Message(1, Message.getAffordanceInstance("brew", AffordanceType.Action), Operation.Invokeaction, Message.getThingInfoInstance(ThingType.Thing, "urn:example:id", "SmartCoffee"), Message.getThingInfoInstance(ThingType.Controller))

logger.addMessage(response)
logger.saveMessages('loggerExample')