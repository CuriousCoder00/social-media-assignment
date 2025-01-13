import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    joined: {
        type: Date,
        default: Date.now
    },
});

const User = model("User", UserSchema);
export default User;