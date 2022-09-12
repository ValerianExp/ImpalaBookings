const { Schema, model } = require('mongoose');

const hotelSchema = new Schema({
    hotelId: String,
    roomTypes: [{ type: Schema.Types.ObjectId, ref: 'Rooms' }],
}, {
    timestamps: true,
    versionKey: false
});

const hotelModel = model('Hotels', hotelSchema);
module.exports = hotelModel;
