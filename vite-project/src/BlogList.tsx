import React, { useEffect, useState } from 'react';

// Defino la interfaz Blog para tipar los datos que voy a manejar.
interface Blog {
  id: number; // ID del blog
  title: string; // Título del blog
  author: string; // Autor del blog
  category: string; // Categoría del blog
}

const BlogList = () => {
  // Aquí creo un estado para almacenar la lista de blogs y otro para manejar el estado de carga
  const [blogs, setBlogs] = useState<Blog[]>([]); // Este es el estado del arreglo que contiene los blogs
  const [loading, setLoading] = useState(false); // Estado que indica si se está cargando la lista de blogs

  // Función para obtener los blogs desde la API
  const fetchBlogs = () => {
    setLoading(true); // Indico que la carga ha comenzado
    fetch("https://api.vercel.app/blogLinks") // Hago el llamado a la API
      .then((response) => {
        // Verifico si la respuesta es exitosa
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API'); // Lanza un error si no es exitosa
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then((data) => {
        // Aquí actualizo el estado de blogs con los datos obtenidos
        setBlogs(data);
        setLoading(false); // Indico que la carga ha terminado
      })
      .catch((error) => {
        console.error('Error al obtener los datos', error); // Manejo de errores
        setLoading(false); // Aseguro que el estado de carga se actualice a falso
      });
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'black', color: 'white', padding: '20px' }}>
      <table style={{ margin: '0 auto', width: '80%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid white' }}>Id</th>
            <th style={{ border: '1px solid white' }}>Título</th>
            <th style={{ border: '1px solid white' }}>Autor</th>
            <th style={{ border: '1px solid white' }}>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td style={{ border: '1px solid white' }}>{blog.id}</td>
              <td style={{ border: '1px solid white' }}>{blog.title}</td>
              <td style={{ border: '1px solid white' }}>{blog.author}</td>
              <td style={{ border: '1px solid white' }}>{blog.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={fetchBlogs} // Aquí añado el manejador de eventos para obtener los blogs
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Consultar
      </button>
      {loading && <div>Cargando...</div>} {/* Muestra "Cargando..." solo si el estado de carga es verdadero */}
    </div>
  );
};

export default BlogList; // Exporto el componente para usarlo en otras partes de la aplicación
