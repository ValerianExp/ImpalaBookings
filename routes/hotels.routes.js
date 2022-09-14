const router = require("express").Router();
const AxiosIH = require('../connect/axios.connect');
const axiosCharacter = new AxiosIH();

//Axios
const AxiosImp = require("../connect/axios.connect");
const getTemplate = require("../utils/emailTemplate");
const axiosImpala = new AxiosImp();

const sendEmail = require('../utils/sendEmail');


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

router.get("/:id", (req, res, next) => {
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

router.get('/:id/rooms', (req, res, next) => {
    //TODO getCharacters() ??
    axiosCharacter
        .getRooms(req.params.id)
        .then((room) => {
            // console.log(room);
            res.json(room);
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
    // req.body.email = 'pghhtcmavclgklypes@kvhrw.com';
    sendEmail('tlyoorzucheqprrver@bvhrs.com', 'Booking confirmation', 'Your booking has been confirmed', emailT);
    //SEND EMAIL
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // const msg = {
    //     to: 'r.pino.camacho@gmail.com', // Change to your recipient
    //     from: 'impalabookings@hotmail.com', // Change to your verified sender
    //     subject: 'Sending with SendGrid is Fun',
    //     text: 'and easy to do anywhere, even with Node.js',
    //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // }
    // sgMail
    //     .send(msg)
    //     .then(() => {
    //         console.log('Email sent')
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })
    res.redirect('/hotels');
});



module.exports = router;