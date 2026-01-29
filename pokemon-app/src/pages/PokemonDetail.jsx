import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetail, getPokemonImageUrl } from '../services/api';

function PokemonDetail() {
  const { name } = useParams(); 
  const navigate = useNavigate(); 
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    getPokemonDetail(name).then((data) => {
      setPokemon(data);
      setLoading(false);
    });
  }, [name]);

  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Detaylar Yükleniyor...</h2>
      </div>
    );
  }

  return (
    <div className="detail-container" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5', 
      padding: '20px' 
    }}>
      {}
      <div className="detail-card" style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '15px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        textAlign: 'center'
      }}>
        {}
        <button 
          onClick={() => navigate('/pokemon')} 
          style={{ 
            position: 'absolute', 
            top: '15px', 
            right: '20px', 
            border: 'none', 
            background: 'none', 
            fontSize: '24px', 
            cursor: 'pointer', 
            color: '#333' 
          }}
        >
          &times;
        </button>

        {}
        <img 
          src={getPokemonImageUrl(pokemon.name)} 
          alt={pokemon.name} 
          style={{ width: '150px', height: '150px', marginBottom: '20px', objectFit: 'contain' }} 
        />
        
        <h1 style={{ textTransform: 'capitalize', marginBottom: '20px', color: '#333' }}>
          {pokemon.name}
        </h1>

        <div style={{ textAlign: 'left', fontSize: '18px', color: '#555', lineHeight: '1.8' }}>
          <p><strong>ID:</strong> {pokemon.id}</p>
          <p><strong>Type:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
          <p><strong>Height:</strong> {pokemon.height}</p>
          <p style={{ marginBottom: '5px' }}><strong>Abilities:</strong></p>
          <ul style={{ paddingLeft: '20px', marginTop: '0' }}>
            {pokemon.abilities.map((ability, index) => (
              <li key={index} style={{ textTransform: 'capitalize' }}>
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
