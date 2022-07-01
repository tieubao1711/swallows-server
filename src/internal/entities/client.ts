import { Socket } from "socket.io";
import { SocketEvent } from "../../constants/socketEvent";
import { World } from "../initialiazers/world";

export default class Client {
    socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public send(socketEvent: SocketEvent, data: any): void {
        this.socket.emit(socketEvent, data);
    }

    public roomCreate(room_name: string): void {
        World.instance.roomController.create(room_name, this);
    }

    public roomJoin(room_name: string): void {
        World.instance.roomController.join(room_name, this);
    }

    public joinOrCreate(room_name: string): void {
        World.instance.roomController.joinOrCreate(room_name, this);
    }

    public kick(): void {
        this.socket.disconnect(true);
    }
}