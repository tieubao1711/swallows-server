import { SocketEvent } from "../../constants/socketEvent";
import { IEventHandle } from "../../internal/interfaces/iEventHandle";
import Client from "../../internal/entities/client";

export class testHandle implements IEventHandle {
    onEventHadle(eventCode: SocketEvent, eventData: any, client: Client): void {
        console.log("data receive: " + eventData);
        client.send(eventCode, eventData);
    }
}