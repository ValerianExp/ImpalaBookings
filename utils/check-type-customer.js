const checkTypeCustomer = place => {
    return {
        isPlatinumCustomer: place ? place.type === 'platinum' : false,
        isSilverCustomer: place ? place.type === 'silver' : false
    }
}
module.exports = checkTypeCustomer;