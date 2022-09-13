const priceRoom = (room) => {
    const divd = 11;
    const { amenities } = room;
    const price = amenities.reduce((acc, amenity) => {
        return acc + amenity.code;
    }, 0);
    return price / divd;
}

module.exports = priceRoom;