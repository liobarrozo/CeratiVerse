document.addEventListener("DOMContentLoaded", () => {
  const albumsContainer = document.getElementById("albums-container");
  const albumsUrl = "https://sodati-api.portfolio-ls.online/cerati/";

  fetch(albumsUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((albums) => {
      if (albums && Array.isArray(albums)) {
        albumsContainer.innerHTML = "";

        albums.forEach((album) => {
          const albumCard = createAlbumCard(album);
          albumsContainer.appendChild(albumCard);
        });
      } else {
        albumsContainer.innerHTML = "<p>No se encontraron álbumes.</p>";
      }
    })
    .catch((error) => {
      console.error("Error al cargar los álbumes:", error);
      albumsContainer.innerHTML = "<p>Error al cargar los álbumes. Intenta nuevamente más tarde.</p>";
    });
});

function createAlbumCard(album) {
  const card = document.createElement("div");
  card.className = "album-card";

  card.innerHTML = `
        <a href="album-detail.html?id=${album.id}" class="album-link">
        <div class="album-cover">
            <img src="${album.cover_medium || "placeholder.jpg"}" alt="Portada del álbum ${album.title}">
        </div>
        <div class="album-info">
            <h2 class="album-title">${album.title}</h2>
            <p class="album-date">Fecha de lanzamiento: ${formatDate(album.release_date)}</p>
        </div>
        <div class="album-footer">
            <a href="album-detail.html?id=${album.id}" class="album-link">Ver detalles</a>
        </div>
    `;

  return card;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}



// album-detail.js - Obtiene el ID del álbum de la URL y hace la petición correcta
/*const params = new URLSearchParams(window.location.search);
const albumId = params.get("id");

if (albumId) {
  fetch(`https://sodati-api.portfolio-ls.online/soda/${albumId}/album`)
    .then(response => response.json())
    .then(album => {
      document.getElementById("album-title").textContent = album.title;
      document.getElementById("album-info").innerHTML = `
        <p>Artista: ${album.artist}</p>
        <p>Año: ${album.year}</p>
      `;
    })
    .catch(error => console.error("Error al cargar los detalles del álbum:", error));
} else {
  console.error("No se encontró un ID de álbum en la URL");

}*/