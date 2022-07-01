import { SocketEvent } from "../../constants/socketEvent";
import Client from "../entities/client";

export interface IEventHandle {
    onEventHadle(eventCode: SocketEvent, eventData: any, client: Client): void;
}