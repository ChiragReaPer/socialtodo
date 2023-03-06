import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        // index: true
    },
    // role,  1 = user, 0 = SuperUser
    role: {
        type: Number, 
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    createdOn: {
        type: Number,
        default: Date.now()
    }, 
    active: {
        type: Boolean,
    }
})

const user = mongoose.model('User', UserSchema);
export default user;