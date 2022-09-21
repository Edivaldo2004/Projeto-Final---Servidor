// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar"] })
);

app.get('/autenticar', async function (req, res) {
  res.render('autenticar');
})

app.get('/listar', async function (req, res) {
  const usuarios = await usuario.findAll();
  res.render("listar", { usuarios });
})

app.get('/cadastro', async function (req, res) {
  res.render("cadastro")
})

app.post('/cadastro', async function (req, res) {
  const { password, nome, usuario: user } = req.body
  console.log({ password, nome, usuario: user })
  const data = await usuario.create({ senha: password, nome, usuario: user })
  res.json(data)
})

app.get('/', async function (req, res) {
  res.render("home")
})

app.post('/logar', async (req, res) => {
  const users = await usuario.findOne({ where: { user: req.body.user }});
  if (req.body.user === users.user && req.body.password === users.password) {
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 3600 // expires in 1 hour
    });

    res.cookie('token', token, { httpOnly: true });
    return res.json({ auth: true, token: token });
  }

  res.status(500).json({ message: 'Login inválido!' });
})

app.post('/deslogar', function (req, res) {
  res.cookie('token', null, { httpOnly: true });
  res.json({ deslogado: true })
})

app.listen(3001, function () {
  console.log('App de Exemplo escutando na porta 3000!')
});