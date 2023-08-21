var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


router.get('/', function (req, res, next) {
    res.render('contacto');
});

router.post('/', async (req, res, next) => {

    console.log(req.body);

    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var email = req.body.email;
    var celular = req.body.celular;
    var mensaje = req.body.mensaje;

    var obj = {
        to: 'aeledeu@hotmail.com',
        subject: 'Contacto desde la web FOTOGRAFIA',
        html: nombre + ' ' + apellido + " se contacto a traves y quiere mas info a este correo: " + email + ". <br> Ademas, hizo el siguiente comentario: " + mensaje + ".<br> Su tel es: " + celular
    }
    
    var transporter = nodemailer.createTransport ({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })
 
    var info = await transporter.sendMail(obj);

    res.render('contacto', {
        message: 'Mensaje enviado correctamente',
    });
})


module.exports = router;