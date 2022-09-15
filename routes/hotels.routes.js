const router = require("express").Router();
const AxiosIH = require('../connect/axios.connect');
const axiosCharacter = new AxiosIH();

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

//models
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
    // let a =
    // {
    //     'name[like]': 'inclusive',
    // };
    axiosImpala
        .getHotels({ 'country[eq]': 'ESP' })
        .then((response) => {
            const hotelResp = response.data;
            // res.json(hotelResp);
            res.render("hotels", { hotels: hotelResp.data });
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/:id", checkRole("USER", "PA"), (req, res, next) => {
    const { id } = req.params;
    axiosImpala.getHotel(id)
        .then((hotel) => {
            // console.log(hotel.data);
            res.render("hotels/details", { hotel: hotel.data });
            // res.json(hotel.data);
        })
        .catch((err) => next(err))
    // res.json(axiosImpala.getHotel(id));
});

router.get('/:id/rooms', isLoggedIn, (req, res, next) => {
    //TODO getCharacters() ??
    let canBuy = false;
    if (req.session.currentUser) {
        // const { id } = req.params;
        canBuy = true;
    }
    axiosCharacter
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
            res.render('hotels/rooms', { rooms: combined, canBuy });
        })
        .catch((err) => next(err));
});

router.post('/:id/rooms/book', isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const { roomId } = req.body;
    // console.log(req.body);
    // console.log(id);
    // console.log(roomId);


    axiosCharacter.getRoom(id, roomId)
        .then((room) => {
            // console.log(room);
            // res.json(room);
            const { name, description, amenities } = room;
            const price = priceRoom(amenities);
            const { email, name: userName } = req.session.currentUser;
            const template = getTemplate(userName, name, description, price);
            sendEmail('kwf51871@xcoxc.com', 'hola', 'hola', template)
                .then(() => {
                    res.redirect(`/hotels/${id}/rooms`);
                })
                .catch((err) => next(err));
            let newReward = req.session.currentUser.hotelrewards - price;
            User.findByIdAndUpdate(req.session.currentUser._id, { hotelrewards: newReward });
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
        userName: 'NOMBRE_USUARIO',
    }
    const emailT = getTemplate(template);
    sendEmail('jzxjgrvcceswijbjpq@nvhrw.com', 'Booking confirmation', 'Your booking has been confirmed', emailT);

    res.redirect('/hotels');
});



module.exports = router;