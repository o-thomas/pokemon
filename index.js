import express from 'express'; //instal express 
import mongoose from 'mongoose'; //install mongoose
import twig from 'twig'; // install twig
import database from './config.js'
import bodyParser from 'body-parser';
import Pokemon from './models/Pokemon.js'; // import Pokemon mongoose schema

const app = express();
const db = database

mongoose.connect(db, err => {
    if (err) {
        console.error('error' + err);
    } else {
        console.log('connected at mongoDb');
    }
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./assets'));
app.listen(8080, () => {
    console.log("le serveur marche!");
})

app.get('/', async (req, res) => {
    const pokemons = await Pokemon.find();
    res.render('template/pokemon/listPokemon.html.twig', {
        pokemons: pokemons
    })
})

app.get('/addPokemon', async (req, res) => {
    res.render('template/pokemon/addPokemon.html.twig', {
        method: "post",
        action: "/addPokemon"

    })
})

app.post('/addPokemon', async (req, res) => {
    let pokemon = new Pokemon(req.body)
    pokemon.save((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/")
    })
    
})

app.get('/updatePokemon/:id', async (req, res) => {
    const pokemon = await Pokemon.findOne({ _id: req.params.id })
    res.render('template/pokemon/addPokemon.html.twig', {
        action: "/updatePokemon",
        pokemon: pokemon
    })
})

app.post('/updatePokemon/:id', async (req, res) => {
    await Pokemon.updateOne({ _id: req.params.id },req.body)
    res.redirect('/')
})

app.get('/deletePokemon/:id', (req, res) => {
    Pokemon.deleteOne({ _id: req.params.id }, (error, Pokemon) => {
        if (error) {
            console.log(err);
            res.status(404)
        }else{
            res.redirect("/")
        }
    })
})

