const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
    roomTypeId: String,
    price: Number,
    clients: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
});

const roomModel = model('Rooms', roomSchema);
module.exports = roomModel;