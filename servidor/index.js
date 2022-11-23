
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { produto } = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cookieParser());


app.get('/', async function (req, res) {
  res.render("home")
})

app.get('/cadastrar',(req, res) => {
  res.render('cadastrar');
});

app.post('/cadastrar', async function (req, res) {
  const { nome, imagem, descri, preco} = req.body
  console.log({ nome, imagem, descri, preco})
  const data = await produto.create({ nome, imagem, descri, preco });
  res.json(data)
})

app.post("/excluir_produto", (req, res)=>{
  Produto.destroy({
  where:{
  id: req.body.id
  }
}).then((retorno) => {
  return res.redirect('listar');
}).catch((err)=> {
  console.log(err);
});
})

app.listen(4000, function () {
  console.log('App de Exemplo escutando na porta 3001!')
});