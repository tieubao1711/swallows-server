import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IProfile {
    account: any;
    name: string;
    level: number;
    exp: number;
    gold: number;
}

// 2. Create a Schema corresponding to the document interface.
const profileSchema = new Schema<IProfile>({
    account: {type: Object, required: true},
    name: {type: String, required: true},
    level: Number,
    exp: Number,
    gold: Number, 
});

// 3. Create a Model.
const profileModel = model<IProfile>('Profile', profileSchema);

// ----------------------------------------------------------------------

export class Profile implements IProfile {
    account: any;
    name: string;
    level: number;
    exp: number;
    gold: number;

    constructor(account: any) {
        this.account = account;
        this.name = "admin";
        this.level = 0;
        this.exp = 0;
        this.gold = 0;
    }

    public async create() {
        const profile = await new profileModel(this);
        return profile.save();
    }

    public async find(options: any) {
        return await profileModel.findOne(options);
    }
}