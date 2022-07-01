import mongoose, { Schema, model, Mongoose, Callback } from 'mongoose';
import {Md5} from 'ts-md5/dist/md5';
import { Profile } from './profile.repo';

// 1. Create an interface representing a document in MongoDB.
interface IAccount {
    uuid?: string;
    username: string;
    password: string;
    email?: string;
    is_remmember?: boolean;
    is_banned?: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const accountSchema = new Schema<IAccount>({
    uuid: String,
    username: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    email: String,
    is_remmember: Boolean,
    is_banned: Boolean,
});

// 3. Create a Model.
const accountModel = model<IAccount>('Account', accountSchema);

// ----------------------------------------------------------------------

export class Account implements IAccount {
    uuid?: string | undefined;
    username: string;
    password: string;
    email?: string;
    is_remmember?: boolean;
    is_banned?: boolean;

    constructor(uuid: string, usn: string, pwd: string, email:string) {
        this.uuid = uuid;
        this.username = usn;
        this.password = pwd;
        this.email = email;
    }

    public async create() {
        const account = new accountModel(this.crypt());
        return await account.save();
    }

    public async find(options: any) {
        return await accountModel.findOne(options);
    }

    public async register() {
        return await this.create()
            .then(acc => console.log("register success: " + acc))
            .catch(err => console.log("register failed, error: " + err.message));
    }

    public async login() {
        return await this.onAuth()
            .then(success => { 
                console.log("login state: " + success);
                // if first login, then create new profile
                if (success) this.freshProfile();
            })
            .catch(err => console.log("error: " + err.message));
    }

    private async onAuth() {
        const account = await this.find({username: this.username});
        return (account && account.password == this.crypt().password);
    }

    private async freshProfile() {
        const profile = new Profile(this);
        await profile.find({account: this})
            .then(p => {
                if (!p) profile.create()
                    .then(pro => console.log("profile created: " + pro))
                    .catch(err => console.log("profile create failed, error: " + err.message));
            })
            .catch(err => console.log("error: " + err.message));
    }

    private crypt(): this {
        const account = this;
        account.password = Md5.hashStr(this.password);
        return account;
    }
}