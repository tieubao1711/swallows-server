import {SocketServer} from './server';
import { World } from './internal/initialiazers/world';
import mongoose from 'mongoose';
import { dbConnection } from './configs/database.config';

let app = new SocketServer();
console.log(`=================================`);
console.log("🚀🚀🚀 App has started!! 🚀🚀🚀")

World.instance = new World();
console.log(`---------------------------------`);
console.log("✅ Wolrd initialization...");

mongoose.connect(dbConnection.url, dbConnection.options)
    .then(function() { 
        console.log("✅ Database connect successfully!!");
        console.log(`---------------------------------`);
        console.log("🚩  WELCOME TO ENDSEA ONLINE!!! ⚔️");
        console.log(`=================================`);
    })
    .catch((e) => console.log("❌ Database connect has error: " + e.message));

export {app};