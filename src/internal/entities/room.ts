
import { SocketEvent } from "../../constants/socketEvent";
import { RoomMode } from "../../constants/roomMode";
import { World } from "../initialiazers/world";
import Client from "./client";
import RoomState from "./roomState";

export default class Room {
    id?: string;
    name: string = "";
    mode: RoomMode;
    max_players: number;
    state?: RoomState; 

    clients: Map<string, Client>;

    constructor(mode: RoomMode, max_players: number=99) {
        this.mode = mode;
        this.max_players = max_players;

        this.clients = new Map<string, Client>();
    }

    public setState(state: RoomState): void {
        this.state = state;
    }
    
    public join(client: Client): void {
        if (!this.is_full()) { 
            this.clients.set(client.socket.id, client);
        }
    }

    public leave(client: Client): void {
        this.clients.delete(client.socket.id);
        if (this.clients.size == 0) World.instance.roomController.destroy(this);
    }

    public kick(client: Client): void {
        this.leave(client);
    }

    public kickAll() {
        this.clients.forEach(client => this.kick(client));
    }

    public broadcast(socketEvent: SocketEvent, data: any, clientId?: string): void {
        this.clients.forEach(client => {
            if (clientId && client.socket.id == clientId) return;
            else client.send(socketEvent, data);
        })
    }

    private is_full(): boolean {
        return !(this.clients.size < this.max_players);
    }
}