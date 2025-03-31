// Redirigir a la página de búsqueda con el término de búsqueda
function redirectToSearchPage() {
  const searchBar = document.getElementById("search-bar");
  if (!searchBar) {
    console.error("Elemento #search-bar no encontrado en el DOM.");
    return;
  }

  const query = searchBar.value.trim();
  if (query) {
    // Ruta absoluta asegurada para GitHub Pages
    window.location.href = `${window.location.origin}/CeratiVerse/search/search.html?query=${encodeURIComponent(query)}`;
  } else {
    alert("Por favor ingresa un término de búsqueda.");
  }
}

// Asegurar que el script se ejecute cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("search-bar");

  if (!searchBar) {
    console.error("Elemento #search-bar no encontrado en el DOM.");
    return;
  }

  searchBar.addEventListener("keydown", function (event) {
    console.log("Tecla presionada:", event.key); // Debugging en consola
    if (event.key === "Enter") {
      event.preventDefault(); // Evita comportamiento inesperado
      redirectToSearchPage();
    }
  });
});

