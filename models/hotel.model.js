const { Schema, model } = require('mongoose');

const hotelSchema = new Schema({
    hotelId: String,
    roomTypes: [{ type: Schema.Types.ObjectId, ref: 'Rooms' }],
    location: { type: { type: String }, coordinates: [Number] },
}, {
    timestamps: true,
    versionKey: false
});
hotelSchema.index({ location: '2dsphere' });
const hotelModel = model('Hotels', hotelSchema);
module.exports = hotelModel;
