import { LobbyRoom } from "../entities/lobbyRoom";
import Client from "../entities/client";
import { RoomController } from "../controllers/room.controller";
import { RoomMode } from "../../constants/roomMode";

export class World {
    static instance: World;
    public clients: Map<string, Client>;
    public roomController: RoomController;
    
    constructor() {
        this.clients = new Map<string, Client>();
        this.roomController = new RoomController();
        this.roomInit();
    }

    roomInit(): void {
        this.roomController.define("lobby", new LobbyRoom(RoomMode.SERVICE));
    }
}