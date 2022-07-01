import Room from "../entities/room";
import { v4 as uuid } from "uuid";
import Client from "../entities/client";

export class RoomController {
    static: Map<string, Room>;
    live: Map<string, Array<Room>>;

    constructor() {
        this.static = new Map<string, Room>();
        this.live = new Map<string, Array<Room>>();
    }

    define(name: string, room: Room): void {
        room.name = name;
        this.static.set(name, room);
        this.live.set(name, new Array<Room>());
    }

    create(room_name: string, client: Client) {
        var room = this.static.get(room_name);
        if (room) {
            room.id = uuid();
            room.join(client);
            this.live.get(room_name)?.push(room);
        }
    }

    join(room_name: string, client: Client, room_id: string="") {
        this.live.get(room_name)?.every(room => {
            if (room_id=="") return room.join(client);
            else if (room_id == room.id) return room.join(client);
        });
    }

    joinOrCreate(room_name: string, client: Client) {
        var roomBase = this.static.get(room_name);
        if (roomBase) {
            if (this.live.size == 0) this.create(room_name, client);
            else this.join(room_name, client);
        }
    }

    destroy(room: Room): void {
        if (room.clients.size > 0) room.kickAll();
        let rmLive = this.live.get(room.name);
        rmLive?.findIndex((room, index) => {
            rmLive?.splice(index, 1);
        });
    }
}