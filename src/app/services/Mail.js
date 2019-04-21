const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')
const mailConfig = require('../../config/mail')

const transport = nodemailer.createTransport(mailConfig)

transport.use('compile', hbs({
    viewEngine: exphbs(),
    viewpath: path.resolve(__dirname, '..', 'views', 'emails'),
    extname: '.hbs'
}))

module.exports = transport