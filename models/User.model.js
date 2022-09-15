const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: { type: String },

    email: { type: String, unique: true, required: true },

    level: {
      type: String,
      level: { type: String, enum: ['silver', 'platinum'], default: 'silver' }
    },


    password: { type: String, required: true, minLength: 8 },

    profileImg: {
      type: String,
      // default: 'https://i.stack.imgur.com/l60Hf.png'
      default: 'https://i.imgur.com/XeN1BHm.png'
    },

    favorites: [{ type: Schema.Types.ObjectId, ref: 'Hotels' }],

    role: {
      type: String,
      enum: ['USER', 'COMPANY', 'PA', 'CLIENT'],
      default: 'USER'
    },

    hotelrewards: { type: Number, rewards: { default: 500 } }

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("Users", userSchema);

module.exports = User;
