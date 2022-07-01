// import { Schema, model } from 'mongoose';

// // 1. Create an interface representing a document in MongoDB.
// interface IUser {
//   name: string;
//   email: string;
//   avatar?: string;
// }

// // 2. Create a Schema corresponding to the document interface.
// const userSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   avatar: String
// });

// // 3. Create a Model.
// const User = model<IUser>('User', userSchema);

// async function run() {
//     const user = new User({
//       name: 'Bill',
//       email: 'bill@initech.com',
//       avatar: 'https://i.imgur.com/dM7Thhn.png'
//     });
//     await user.save();
  
//     console.log(user.email); // 'bill@initech.com'
// }

// async function findAll() {
//     //var users = mongoose.model('User').find();
//     var user = await User.findOne({name: "Bill"});
//     console.log(user);
// }

// export { run, findAll };