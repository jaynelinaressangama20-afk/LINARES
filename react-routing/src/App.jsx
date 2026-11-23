import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Consumimos la API (puedes cambiar esta URL por otra API pública si deseas)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
      .then((response) => response.json())
      .then(async (data) => {
        // Obtenemos los detalles de cada elemento para tener imagen y texto
        const detalles = await Promise.all(
          data.results.map(async (item) => {
            const res = await fetch(item.url);
            return await res.json();
          })
        );
        setItems(detalles);
        setCargando(false);
      })
      .catch((error) => {
        console.error('Error al cargar la API:', error);
        setCargando(false);
      });
  }, []);

  return (
    <div className="contenedor">
      <h1>Práctica - Consumo de API y Tarjetas</h1>
      <p className="subtitulo">Fecha: 17/11/2026</p>

      {cargando ? (
        <p>Cargando datos de la API...</p>
      ) : (
        <div className="grid-tarjetas">
          {items.map((item) => (
            <div key={item.id} className="tarjeta">
              <img
                src={item.sprites.front_default}
                alt={item.name}
                className="tarjeta-imagen"
              />
              <h2 className="tarjeta-titulo">{item.name.toUpperCase()}</h2>
              <p className="tarjeta-texto">
                <strong>ID:</strong> #{item.id} <br />
                <strong>Tipo:</strong> {item.types.map((t) => t.type.name).join(', ')} <br />
                <strong>Altura:</strong> {item.height / 10} m
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
