const priceRoom = (amenities) => {
    const divd = Math.random() * (13 - 9) + 9;
    const price = amenities.reduce((acc, amenity) => {
        return acc + amenity.code;
    }, 0);
    return parseInt(price / divd);
}

module.exports = priceRoom;