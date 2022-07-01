import { SocketEvent } from "../../constants/socketEvent";
import client from "../../internal/entities/client";
import { IEventHandle } from "../../internal/interfaces/iEventHandle";

export class RoomHandle implements IEventHandle {
    onEventHadle(eventCode: SocketEvent, eventData: any, client: client): void {
        switch (eventData.code) {
            case "joinOrCreate":
                client.joinOrCreate("lobby");
                //client.send(eventCode, );
                break;
        }
    }
}