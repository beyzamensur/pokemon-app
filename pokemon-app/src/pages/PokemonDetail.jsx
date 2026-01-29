import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetail, getPokemonImageUrl } from '../services/api';

function PokemonDetail() {
  const { name } = useParams(); // URL'deki pokémon ismini yakalar
  const navigate = useNavigate(); // Geri dönmek için kullanılır
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API'den detay verilerini çekiyoruz
    getPokemonDetail(name).then((data) => {
      setPokemon(data);
      setLoading(false);
    });
  }, [name]);

  // Yükleme ekranı (Bonus Indicator)
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
      backgroundColor: '#f5f5f5', // Arka plan hafif gri
      padding: '20px' 
    }}>
      {/* Bilgilerin yazacağı beyaz kutu */}
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
        {/* Sağ üstteki X Kapat Butonu */}
        <button 
          onClick={() => navigate('/pokemon')} // Kullanıcıyı listeye geri gönderir
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

        {/* Hareketli Pokémon Görseli */}
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