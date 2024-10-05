document.getElementById('form-curso').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    // Capturar los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const creditos = document.getElementById('creditos').value;
    const descripcion = document.getElementById('descripcion').value;
  
    // Validar que todos los campos estén completos
    if (!nombre || !creditos || !descripcion) {
      alert('Por favor complete todos los campos');
      return;
    }
  
    // Crear el objeto curso
    const curso = {
      nombre: nombre,
      creditos: parseInt(creditos),
      descripcion: descripcion,
    };
  
    // Enviar los datos al servidor usando fetch
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
        // Limpiar el formulario
        document.getElementById('form-curso').reset();
      } else {
        alert('Error al guardar el curso');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de red al guardar el curso');
    }
  });
  
  // Lógica para limpiar el formulario
  document.querySelector('.limpiar').addEventListener('click', function () {
    document.getElementById('form-curso').reset();
  });
  