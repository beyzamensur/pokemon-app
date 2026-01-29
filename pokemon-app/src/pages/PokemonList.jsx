import React, { useState, useEffect } from 'react';
import { getPokemonList, getPokemonImageUrl } from '../services/api';
import { Link } from 'react-router-dom';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    getPokemonList().then((data) => {
      setPokemons(data);
      setLoading(false);
    });
  }, []);

  
  const filteredPokemons = pokemons.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Pokémonlar Yakalanıyor...</h2>
      </div>
    );
  }

  return (
    
    <div className="container">
      
      {}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" 
          alt="Pokemon Logo" 
          style={{ width: '250px', marginBottom: '15px' }} 
        />
        <h2 style={{ margin: '0', color: '#333' }}>Generation 1</h2>
        <p style={{ margin: '5px 0', color: '#666' }}>151 pokémon</p>
      </div>

      {}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <input 
          type="text" 
          placeholder="Pokémon Ara..." 
          className="search-input" 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      {}
      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon) => (
          <Link 
            to={`/pokemon/${pokemon.name}`} 
            key={pokemon.name} 
            className="pokemon-card"
          >
            {}
           <img 
                    src={getPokemonImageUrl(pokemon.name)} 
                    alt={pokemon.name} 
                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
            
            />
            <p style={{ marginTop: '15px', fontWeight: 'bold', textTransform: 'capitalize' }}>
              {pokemon.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
