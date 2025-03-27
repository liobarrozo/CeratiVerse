document.addEventListener("DOMContentLoaded", () => {
  // Obtener el ID del álbum de la URL
  const params = new URLSearchParams(window.location.search);
  const albumId = params.get("id"); // Obtener el id desde la URL

  console.log("ID del álbum:", albumId); // Verificación del ID

  // URL para obtener los detalles del álbum
  const albumUrl = `https://sodati-api.portfolio-ls.online/cerati/${albumId}/album`;

  // Obtener los detalles del álbum
  fetch(albumUrl)
    .then((response) => response.json())
    .then((album) => {
      if (album && album.title) {
        console.log("Álbum obtenido:", album); // Verificación de los datos del álbum

        // Colocamos el contenido del álbum en el contenedor
        const albumContainer = document.getElementById("album-container");
        const coverUrl = album.cover_medium; // URL de la imagen del álbum

        albumContainer.innerHTML = `
            <h1>${album.title}</h1>
            <p>Fecha de lanzamiento: ${album.release_date}</p>
            <img src="${coverUrl}" alt="${album.title}" style="max-width: 300px; display: block; margin: 20px 0;">
            <h2>Canciones</h2>
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Duración</th>
                  <th>Reproducir</th>
                </tr>
              </thead>
              <tbody id="song-list">
                <!-- Las canciones se agregarán aquí -->
              </tbody>
            </table>
          `;

        // URL para obtener la lista de canciones
        const tracklistUrl = `https://sodati-api.portfolio-ls.online/cerati/${albumId}/tracks`; // Endpoint correcto
        console.log("URL de canciones:", tracklistUrl); // Verificación de la URL de canciones

        fetch(tracklistUrl)
          .then((response) => response.json())
          .then((tracks) => {
            console.log("Canciones obtenidas:", tracks); // Verificación de las canciones obtenidas

            const songListContainer = document.getElementById("song-list");

            // Si hay canciones, agregarlas a la tabla
            if (tracks && Array.isArray(tracks) && tracks.length > 0) {
              console.log("Canciones disponibles:", tracks.length); // Verificación de la cantidad de canciones
              // Si hay canciones, agregarlas a la tabla
              tracks.forEach((track, index) => {
                console.log(`Canción ${index + 1}:`, track); // Verificación de cada canción
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td><a href="${track.link}" target="_blank">${
                  track.title
                }</a></td>
                    <td>${(track.duration / 60).toFixed(2)} min</td>
                    <td>
                      <button class="play-button" data-preview="${
                        track.preview
                      }" onclick="playSong(this)">
                        Reproducir
                      </button>
                    </td>
                  `;
                songListContainer.appendChild(row);
              });
            } else {
              console.log("No se encontraron canciones en la respuesta.");
              // Si no hay canciones, mostrar mensaje
              songListContainer.innerHTML =
                "<tr><td colspan='3'>No se encontraron canciones.</td></tr>";
            }
          })
          .catch((error) => {
            console.error("Error al cargar las canciones:", error);
            document.getElementById("song-list").innerHTML =
              "<tr><td colspan='3'>Error al cargar las canciones.</td></tr>";
          });
      } else {
        throw new Error("Datos del álbum no disponibles.");
      }
    })
    .catch((error) => {
      console.error("Error al cargar el álbum:", error);
      document.getElementById("album-container").innerHTML =
        "<p>Error al cargar el álbum</p>";
    });
});

let currentAudio = null;
let currentButton = null; // Referencia al botón de la canción actualmente reproducida

function playSong(button) {
  const audio = new Audio(button.getAttribute("data-preview"));

  // Si ya hay una canción reproduciéndose, la pausamos antes de reproducir la nueva
  if (currentAudio) {
    currentAudio.pause();

    // Cambiar el texto del botón de la canción anterior a "Reproducir"
    currentButton.textContent = "Reproducir";
    currentButton.setAttribute("onclick", "playSong(this)");
  }

  currentAudio = audio;
  currentButton = button; // Guardamos el botón actual

  audio.play();

  // Cambiar el texto del botón de reproducción a "Pausar"
  button.textContent = "Pausar";
  button.setAttribute("onclick", "pauseSong(this)");

  // Detectar cuando la canción haya terminado y cambiar el botón a "Reproducir"
  audio.addEventListener("ended", () => {
    button.textContent = "Reproducir";
    button.setAttribute("onclick", "playSong(this)");
  });
}

function pauseSong(button) {
  if (currentAudio) {
    currentAudio.pause();
    // Cambiar el texto del botón de "Pausar" a "Reproducir"
    button.textContent = "Reproducir";
    button.setAttribute("onclick", "playSong(this)");
  }
}
