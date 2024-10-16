// Cargar el SDK de Supabase (asegúrate de que este script también esté incluido)



  const supabaseUrl = 'https://duwjaewngocuzsfpgpiz.supabase.co'
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1d2phZXduZ29jdXpzZnBncGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMzYyMDMsImV4cCI6MjA0NDYxMjIwM30.o0_3AiKv5IzhaoD3-aLMefClqLrChrwaI3RAbGqGEBQ'
   const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);





// Función para obtener las razas de perro desde Supabase y listarlas en el <select>
async function obtenerRazasPerro() {
    const { data: razas, error } = await supabase
        .from('raza_perro')  // Nombre de tu tabla en Supabase
        .select('*');         // Seleccionar todas las columnas

    if (error) {
        console.error("Error al obtener las razas de perro:", error);
        return;
    }

    // Selecciona el <select> donde se mostrarán las razas
    const selectRazaPerro = document.getElementById('select-raza-perro');

    // Limpia cualquier opción previa (dejamos solo la opción predeterminada)
    selectRazaPerro.innerHTML = '<option value="">Selecciona una raza</option>';

    // Itera sobre las razas y crea opciones dentro del <select>
    razas.forEach(raza => {
        const option = document.createElement('option');
        option.value = raza.id;  // Puedes usar el id de la raza si lo necesitas
        option.textContent = raza.nombre;  // Asume que la columna 'nombre' es la que contiene el nombre de la raza
        selectRazaPerro.appendChild(option);
    });
}

// Llamar a la función para obtener y mostrar las razas cuando la página cargue
document.addEventListener('DOMContentLoaded', obtenerRazasPerro);
