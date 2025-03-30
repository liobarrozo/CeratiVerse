function redirectToSearchPage() {
  const query = document.getElementById("search-bar").value.trim();
  if (query) {
    // Asegurar que la ruta siempre sea absoluta desde la raíz del dominio
    window.location.href = `${window.location.origin}/search/search.html?query=${encodeURIComponent(query)}`;
  } else {
    alert("Por favor ingresa un término de búsqueda.");
  }
}
