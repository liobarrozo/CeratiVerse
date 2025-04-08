// search-results.js

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el parámetro "query" de la URL
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query");

  console.log("Consulta recibida:", query);

  if (query) {
    searchAlbumsAndSongs(query);
  } else {
    document.getElementById("search-results").innerHTML =
      "<p id='not-input-search' >No se ingresó ningún término de búsqueda.</p>";
  }
});

function searchAlbumsAndSongs(query) {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = "<p>Buscando...</p>";

  // URLs de API para buscar en los álbumes y canciones
  const sodaApiUrl = "https://sodati-api.portfolio-ls.online/soda";
  const ceratiApiUrl = "https://sodati-api.portfolio-ls.online/cerati";

  // Realizar ambas búsquedas
  Promise.all([
    fetch(sodaApiUrl)
      .then((response) => response.json())
      .catch(() => []),
    fetch(ceratiApiUrl)
      .then((response) => response.json())
      .catch(() => []),
  ])
    .then(([sodaAlbums, ceratiAlbums]) => {
      console.log("Álbumes de Soda:", sodaAlbums);
      console.log("Álbumes de Cerati:", ceratiAlbums);

      let results = [];
      let allAlbums = [...sodaAlbums, ...ceratiAlbums];
      let filteredAlbums = allAlbums.filter((album) =>
        album.title.toLowerCase().includes(query.toLowerCase())
      );

      // Agregar resultados de álbumes
      filteredAlbums.forEach((album) => {
        let albumType = sodaAlbums.includes(album) ? "soda" : "cerati";
        results.push(`
          <div class="album-result">
            <h2 id="albums-result-h2">Albums encontrados</h2>
            <img src="${album.cover_medium}" alt="${album.title}">
            <h3>${album.title}</h3>
            <a href="../${albumType}/album-detail.html?id=${album.id}">Ver álbum</a>
          </div>
        `);
      });

      // Buscar canciones dentro de todos los álbumes
      let trackPromises = allAlbums.map((album) => {
        let albumType = sodaAlbums.includes(album) ? "soda" : "cerati";
        return fetch(
          `https://sodati-api.portfolio-ls.online/${albumType}/${album.id}/tracks`
        )
          .then((response) => response.json())
          .then((tracks) => {
            console.log(`Canciones del álbum ${album.title}:`, tracks);
            tracks.forEach((track) => {
              if (track.title.toLowerCase().includes(query.toLowerCase())) {
                results.push(`
                  
                  <div class="track-result">
                  
                    <h3>Canción: ${track.title} - ${album.title}</h3>
                    <audio controls>
                      <source src="${track.preview}" type="audio/mpeg">
                      Tu navegador no soporta el audio.
                    </audio>
                  </div>
                `);
              }
            });
          })
          .catch(() =>
            console.error(`Error obteniendo canciones de ${album.title}`)
          );
      });

      return Promise.all(trackPromises).then(() => results);
    })
    .then((results) => {
      if (results.length > 0) {
        resultsContainer.innerHTML = results.join("");
      } else {
        resultsContainer.innerHTML = "<p>No se encontraron resultados.</p>";
      }
    })
    .catch((error) => {
      console.error("Error en la búsqueda:", error);
      resultsContainer.innerHTML = "<p>Error al obtener los resultados.</p>";
    });
}
