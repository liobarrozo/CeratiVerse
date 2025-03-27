// Redirigir a la página de búsqueda con el término de búsqueda
function redirectToSearchPage() {
  const query = document.getElementById("search-bar").value.trim();
  if (query) {
    window.location.href = `/search/search.html?query=${encodeURIComponent(
      query
    )}`;
  } else {
    alert("Por favor ingresa un término de búsqueda.");
  }
}
