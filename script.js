// Archivo: script.js

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. SELECTORES GLOBALES (Referencias corregidas)
    // ----------------------------------------------------
    const form = document.getElementById('Config_Form');
    const finalPriceLabel = form.querySelector('.final-price-label');

    // Selectores para el sonido
    const audioPlayer = document.getElementById('audioClaxon');
    const selectorClaxon = document.getElementById('selectClaxon');

    // Inicializar el precio en 0€ al cargar la página
    finalPriceLabel.textContent = '0 €';
    
    // ----------------------------------------------------
    // 2. LÓGICA DE CÁLCULO DE PRECIO
    // ----------------------------------------------------

    /**
     * Función principal para calcular y mostrar el precio final
     */
    function updatePrice() {
        let finalPrice = 0;

        // 1. OBTENER MODELO BASE (name="modelo")
        const selectedModel = form.querySelector('input[name="modelo"]:checked');
        if (selectedModel) {
            finalPrice += parseInt(selectedModel.value);
        }

        // 2. OBTENER COMBUSTIBLE (name="combustible")
        const selectedCombustible = form.querySelector('input[name="combustible"]:checked');
        if (selectedCombustible) {
            finalPrice += parseInt(selectedCombustible.value);
        }

        // 3. OBTENER EXTRAS (Todos los checkboxes chequeados)
        const extras = form.querySelectorAll('input[type="checkbox"]:checked');
        
        extras.forEach(extra => {
            // Se asume que todos los checkboxes tienen un valor numérico (el precio)
            finalPrice += parseInt(extra.value);
        });

        // Mostrar el precio final formateado en el label
        finalPriceLabel.textContent = `${finalPrice.toLocaleString('es-ES')} €`;
    }

    // Escucha cambios en cualquier radio/checkbox del formulario
    form.addEventListener('change', updatePrice);

    // Inicializa el cálculo al cargar la página por si hay valores preseleccionados
    updatePrice();

    // ----------------------------------------------------
    // 3. LÓGICA DE REPRODUCCIÓN DE SONIDO
    // ----------------------------------------------------

    /**
     * Carga el archivo de sonido seleccionado en el <audio>.
     * Se llama cuando el usuario cambia la opción del select.
     */
    function cargarSonido() {
        const nombreArchivo = selectorClaxon.value;
        
        // Asume que tus archivos están en una carpeta llamada 'sonidos/'
        if (nombreArchivo) {
            audioPlayer.src = `audios/${nombreArchivo}`; 
            audioPlayer.load(); 
            console.log(`Cargando sonido: ${nombreArchivo}`);
        }
    }

    // Exportamos la función para que el botón pueda acceder a ella (usando window)
    window.reproducirSonido = function() {
        // Asegura que un sonido esté cargado, si no, carga el actual.
        if (!audioPlayer.src) {
            cargarSonido(); 
        }
        
        audioPlayer.pause();
        audioPlayer.currentTime = 0; // Reinicia

        audioPlayer.play()
            .catch(error => {
                // Manejo de error si el navegador bloquea la reproducción
                console.error("No se pudo reproducir el sonido:", error);
                alert("El navegador necesita una interacción previa para reproducir el sonido (código 4.1).");
            });
    }

    // Asignar el listener al select para actualizar la fuente del audio
    selectorClaxon.addEventListener('change', cargarSonido);

    // Carga el sonido por defecto al inicio
    cargarSonido();
});