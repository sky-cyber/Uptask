/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            discord: {
               background: "#191b32", // Fondo principal
               background_Second: "#0f101f", // Fondo Secundario
               background_tercer: "#303461", // Fondo Secundario
               primary: "#008be3", // Morado principal
               secondary: "#7289DA", // Morado claro
               dark: "#161A2E", // Gris oscuro
               darker: "#30324c", // Gris más oscuro
               light: "#99AAB5", // Gris claro
               white: "#FFFFFF", // Blanco para texto
               mutedText: "#72767D", // Gris para texto apagado
               textGrey: "#B9BBBE", // Gris claro para texto
               success: "#43B581", // Verde de éxito
               warning: "#FAA61A", // Naranja de advertencia
               error: "#F04747", // Rojo de error
               online: "#3BA55D", // Verde en línea
               idle: "#FAA61A", // Amarillo inactivo
               dnd: "#F04747", // Rojo no molestar
               offline: "#747F8D", // Gris desconectado
               focus: "#4E5D94", // Azul para enfoque o resaltado
            },
         },
      },
   },
   plugins: [],
};
