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
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

const User = model("User", UserSchema);
export default User;