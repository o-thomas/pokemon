import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
    
    image: String,
    name: String,
    type: String,
    level: String,
    attacks: Array,
})


const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;




