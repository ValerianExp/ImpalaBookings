const router = require("express").Router();


//Axios
const AxiosImp = require("../connect/axios.connect");
const getTemplate = require("../utils/emailTemplate");
const axiosImpala = new AxiosImp();

const sendEmail = require('../utils/sendEmail');

//Check role
const { checkRole } = require("../middleware/roles-checker");

//Price room
const priceRoom = require("../utils/priceRoom");

//LoggedIn
const { isLoggedIn } = require("../middleware/session-guard");
const { isLoggedOut } = require("../middleware/session-guard");

//models
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
    // let a =
    // {
    //     'name[like]': 'inclusive',
    // };
    axiosImpala
        .getHotels({})
        .then((response) => {
            const hotelResp = response.data;
            // res.json(hotelResp);
            res.render("hotels", { hotels: hotelResp.data });
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/search', (req, res, next) => {
    const { search } = req.query;
    axiosImpala.getHotels({ 'name[like]': search })
        .then((response) => {
            const hotelResp = response.data;
            // res.json(hotelResp);
            res.render("hotels", { hotels: hotelResp.data });
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/:id", (req, res, next) => {
    let verBotones = true;
    if (!req.session.currentUser) {
        verBotones = false;
    }
    const { id } = req.params;
    axiosImpala.getHotel(id)
        .then((hotel) => {
            // console.log(hotel.data);
            res.render("hotels/details", { hotel: hotel.data, verBotones });
            // res.json(hotel.data);
        })
        .catch((err) => next(err))
    // res.json(axiosImpala.getHotel(id));
});





router.post('/:id/rooms/:roomId/book', isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const { roomId, price } = req.body;
    // console.log(req.body);
    // console.log(id);
    // console.log(roomId);


    console.log('====================================');
    console.log(req.params.id);
    console.log('====================================');
    axiosImpala.getRooms(id)
        .then((room) => {
            // console.log(room);
            // res.json(room);
            const { name, description, amenities } = room;
            // const price = priceRoom(amenities);
            const { email, username } = req.session.currentUser;
            // const template = getTemplate({ username, name: username, description, price });
            const template = {
                hotelName: 'NOMBRE',
                city: 'CIUDAD',
                country: 'PAIS',
                location: 'LOCALIZACION',
                checkIn: 'CHECKIN',
                checkOut: 'CHECKOUT',
                pricePerDay: 99,
                days: 7,
                arrivalDate: 'FECHA_LLEGADA',
                departureDate: 'FECHA_SALIDA',
                phoneNumber: 'TELEFONO',
                username: 'NOMBRE_USUARIO',
            }
            const tp = getTemplate(template);
            console.log('====================================');
            console.log(email);
            console.log('====================================');
            sendEmail(email, 'hola', 'hola', tp)
                .then(() => {
                    res.redirect(`/hotels/${id}/rooms`);
                })
                .catch((err) => next(err));
            let newReward = req.session.currentUser.hotelrewards - price;
            User.findByIdAndUpdate(req.session.currentUser._id, { hotelrewards: newReward });
        })
        .catch((err) => next(err));
});

router.get('/:id/rooms', (req, res, next) => {
    //TODO getCharacters() ??
    let canBuy = false;
    if (req.session.currentUser) {
        // const { id } = req.params;
        canBuy = true;
    }
    axiosImpala
        .getRooms(req.params.id)
        .then((rooms) => {
            // console.log(room);
            // res.json(rooms);
            // const arrayPrice = rooms.amenities.map((room) => {
            //     return priceRoom(room);
            // });
            const combined = rooms.map((room) => {
                return {
                    ...room,
                    price: priceRoom(room.amenities)
                }
            });
            // console.log(combined);
            // const arrayPrice = [];
            // // console.log(rooms);
            // rooms.forEach(room => {
            //     // console.log(room.amenities);
            //     // arrayPrice.push(room.amenities);
            //     arrayPrice.push(priceRoom(room.amenities));
            // });

            // const indexArray = arrayPrice.map((price, index) => {
            //     return index;
            // });
            // console.log(indexArray);
            // console.log(arrayPrice);
            // console.log(rooms);
            console.log(req.params.id);
            res.render('hotels/rooms', { rooms: combined, canBuy, hotelId: req.params.id });
        })
        .catch((err) => next(err));
});


router.post('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const template = {
        hotelName: 'NOMBRE',
        city: 'CIUDAD',
        country: 'PAIS',
        location: 'LOCALIZACION',
        checkIn: 'CHECKIN',
        checkOut: 'CHECKOUT',
        priceperDay: 'PRECIO_POR_DIA',
        days: 'DIAS',
        arrivalDate: 'FECHA_LLEGADA',
        departureDate: 'FECHA_SALIDA',
        phoneNumber: 'TELEFONO',
        username: 'NOMBRE_USUARIO',
    }
    const emailT = getTemplate(template);
    sendEmail('jzxjgrvcceswijbjpq@nvhrw.com', 'Booking confirmation', 'Your booking has been confirmed', emailT);

    res.redirect('/hotels');
});



module.exports = router;