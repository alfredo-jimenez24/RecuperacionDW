import { defineConfig } from 'vite'; // Importo la función defineConfig de Vite para definir la configuración del proyecto
import react from '@vitejs/plugin-react'; // Importo el plugin de React para Vite

export default defineConfig({
  plugins: [react()], // Aquí indico que voy a usar el plugin de React
  server: {
    proxy: {
      '/api': {
        target: 'https://api.vercel.app', // Aquí defino el destino del proxy, que es la API de Vercel
        changeOrigin: true, // Cambia el origen de la solicitud a la URL de destino
        rewrite: (path) => path.replace(/^\/api/, ''), // Reescribo la URL para que cuando haga solicitudes a /api se reemplace por la URL de destino
      },
    },
  },
});
