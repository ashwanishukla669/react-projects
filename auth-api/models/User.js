const mongoose = require(mongoose);

const userSchema = new mongoose.Schema({

    name: {
        type: string,
        requered: true,
        trim: true
    },
    email: {
        type: string,
        requered: true,
        trim: true,
        unique: true
    },
    password: {
        type: string,
        requered: true
    }
    
});

const User = mongoose.model("User", userSchema);

module.exports = User;
