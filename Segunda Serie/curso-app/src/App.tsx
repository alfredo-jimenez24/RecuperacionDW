import { useState, FormEvent } from 'react';
import './App.css';  // Asegúrate de tener un archivo CSS asociado

function App() {
  const [nombre, setNombre] = useState<string>('');
  const [creditos, setCreditos] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!nombre || !creditos || !descripcion) {
      alert('Por favor complete todos los campos');
      return;
    }

    const curso = {
      nombre,
      creditos: parseInt(creditos),
      descripcion,
    };

    try {
      const response = await fetch('https://test-deploy-12.onrender.com/cursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(curso),
      });

      if (response.ok) {
        alert('Curso guardado exitosamente');
        setNombre('');
        setCreditos('');
        setDescripcion('');
      } else {
        alert('Error al guardar el curso');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de red al guardar el curso');
    }
  };

  const handleReset = () => {
    setNombre('');
    setCreditos('');
    setDescripcion('');
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre curso:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="creditos">Créditos:</label>
          <input
            type="number"
            id="creditos"
            value={creditos}
            onChange={(e) => setCreditos(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="button-primary">Guardar</button>
          <button type="button" className="button-secondary" onClick={handleReset}>Limpiar</button>
        </div>
      </form>
    </div>
  );
}

export default App;
