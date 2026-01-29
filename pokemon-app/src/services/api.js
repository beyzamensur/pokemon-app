import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async () => {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=151`);
  return response.data.results;
};

export const getPokemonDetail = async (name) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
  return response.data;
};


export const getPokemonImageUrl = (name) => {
  let pokemonName = name.toLowerCase();

  // STAJ GÖREVİ ÖZEL ÇÖZÜMÜ: 
  // Nidoranlar GIF olarak açılmadığı için onları farklı bir kaynaktan foto olarak çekiyoruz
  if (pokemonName === "nidoran-f" || pokemonName === "nidoran-m") {
    // Nidoranlar için güvenilir statik (PNG) fotoğraf linki
    return `https://img.pokemondb.net/sprites/home/normal/${pokemonName}.png`;
  }

  // Diğer tüm Pokémonlar için hareketli GIF linki
  // mr-mime gibi özel isimleri düzeltelim ki onlar da gitmesin
  let cleanName = pokemonName.replace('-normal', '').replace('mr-mime', 'mr.mime');
  
  return `https://projectpokemon.org/images/normal-sprite/${cleanName}.gif`;
};