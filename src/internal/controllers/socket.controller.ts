import { testHandle } from '../../cutoms/handlers/testHandle';
import { SocketEvent } from '../../constants/socketEvent';
import { World } from '../initialiazers/world';
import { IEventHandle } from '../interfaces/iEventHandle';
import Client from '../entities/client'
import { RoomHandle } from '../../cutoms/handlers/roomHandle';

export class SocketController {
    private socketHandler: SocketIO.Server;
    private eventHandlers: Map<SocketEvent, IEventHandle>;

    constructor(handler: SocketIO.Server) {
        this.socketHandler = handler;
        this.eventHandlers = new Map<SocketEvent, IEventHandle>();
        this.eventHandlerRegister();
        this.listen();
    }

    private listen() {
        this.socketHandler.on(SocketEvent.CONNECT, (socket:any) => {
            var client = this.onSocketConnected(socket);

            socket.on(SocketEvent.DISCONNECT, (socket:any) => {
                this.onSocketDisconnected(socket);
            });

            this.eventHandlers.forEach((eventHandler, eventCode) => {
                socket.on(eventCode, (data: any) => eventHandler.onEventHadle(eventCode, JSON.parse(data), client));
            });
        });
    }

    private onSocketConnected(socket: any): Client {
        var client = new Client(socket);
        World.instance.clients.set(socket.id, client);

        World.instance.roomController.create("lobby", client);

        return client;
    }

    private onSocketDisconnected(socket: any): void {
        World.instance.clients.delete(socket.id);
    }

    private registHandler(eventCode: SocketEvent, eventHandler: IEventHandle): void {
        this.eventHandlers.set(eventCode, eventHandler);
    }

    private eventHandlerRegister(): void {
        /****
        /--- Register Events here --*/
        
        this.registHandler(SocketEvent.TEST, new testHandle());
        this.registHandler(SocketEvent.ROOM, new RoomHandle());

        /*---------------------------/
        *****/
    }
}