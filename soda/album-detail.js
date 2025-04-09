document.addEventListener("DOMContentLoaded", () => {
  // Obtener el ID del álbum de la URL
  const params = new URLSearchParams(window.location.search)
  const albumId = params.get("id") // Obtener el id desde la URL

  console.log("ID del álbum:", albumId) // Verificación del ID

  // URL para obtener los detalles del álbum
  const albumUrl = `https://sodati-api.portfolio-ls.online/soda/${albumId}/album`

  // Obtener los detalles del álbum
  fetch(albumUrl)
    .then((response) => response.json())
    .then((album) => {
      if (album && album.title) {
        console.log("Álbum obtenido:", album) // Verificación de los datos del álbum

        // Colocamos el contenido del álbum en el contenedor con mejor estructura HTML
        const albumContainer = document.getElementById("album-container")
        const coverUrl = album.cover_medium // URL de la imagen del álbum

        // Formatear la fecha de lanzamiento
        const releaseDate = new Date(album.release_date)
        const formattedDate = releaseDate.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })

        // Actualizar el título de la página
        document.title = `CeratiVerse - ${album.title}`

        albumContainer.innerHTML = `
            <div class="album-header">
              <img src="${coverUrl}" alt="${album.title}" class="album-cover-large">
              <div class="album-info-large">
                <h1 class="album-title-large">${album.title}</h1>
                <p class="album-date-large">Fecha de lanzamiento: ${formattedDate}</p>
                <div class="album-meta">
                  <p>Álbum de Soda Stereo</p>
                </div>
              </div>
            </div>
            
            <div class="songs-section">
              <h2 class="songs-title">Canciones</h2>
              <table class="songs-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Título</th>
                    <th>Duración</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody id="song-list">
                  <!-- Las canciones se agregarán aquí -->
                  <tr>
                    <td colspan="4" class="loading">Cargando canciones...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `

        // URL para obtener la lista de canciones
        const tracklistUrl = `https://sodati-api.portfolio-ls.online/soda/${albumId}/tracks` // Endpoint correcto
        console.log("URL de canciones:", tracklistUrl) // Verificación de la URL de canciones

        fetch(tracklistUrl)
          .then((response) => response.json())
          .then((tracks) => {
            console.log("Canciones obtenidas:", tracks) // Verificación de las canciones obtenidas

            const songListContainer = document.getElementById("song-list")

            // Si hay canciones, agregarlas a la tabla
            if (tracks && Array.isArray(tracks) && tracks.length > 0) {
              console.log("Canciones disponibles:", tracks.length) // Verificación de la cantidad de canciones

              // Limpiar el contenedor
              songListContainer.innerHTML = ""

              // Si hay canciones, agregarlas a la tabla
              tracks.forEach((track, index) => {
                console.log(`Canción ${index + 1}:`, track) // Verificación de cada canción

                // Formatear la duración en minutos:segundos
                const minutes = Math.floor(track.duration / 60)
                const seconds = track.duration % 60
                const formattedDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`

                const row = document.createElement("tr")
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td><a href="${track.link}" target="_blank" class="song-link">${track.title}</a></td>
                    <td>${formattedDuration}</td>
                    <td>
                      <button class="play-button" data-preview="${track.preview}" onclick="playSong(this)">
                        ▶
                      </button>
                    </td>
                  `
                songListContainer.appendChild(row)
              })
            } else {
              console.log("No se encontraron canciones en la respuesta.")
              // Si no hay canciones, mostrar mensaje
              songListContainer.innerHTML =
                '<tr><td colspan="4" class="no-songs">No se encontraron canciones para este álbum.</td></tr>'
            }
          })
          .catch((error) => {
            console.error("Error al cargar las canciones:", error)
            document.getElementById("song-list").innerHTML =
              '<tr><td colspan="4" class="error-message">Error al cargar las canciones. Por favor, intenta nuevamente más tarde.</td></tr>'
          })
      } else {
        throw new Error("Datos del álbum no disponibles.")
      }
    })
    .catch((error) => {
      console.error("Error al cargar el álbum:", error)
      document.getElementById("album-container").innerHTML =
        '<div class="error-message">Error al cargar el álbum. Por favor, intenta nuevamente más tarde.</div>'
    })
})

let currentAudio = null
let currentButton = null // Referencia al botón de la canción actualmente reproducida

function playSong(button) {
  const audio = new Audio(button.getAttribute("data-preview"))

  // Si ya hay una canción reproduciéndose, la pausamos antes de reproducir la nueva
  if (currentAudio) {
    currentAudio.pause()

    // Cambiar el texto del botón de la canción anterior a "Reproducir"
    currentButton.textContent = "▶"
    currentButton.setAttribute("onclick", "playSong(this)")
  }

  currentAudio = audio
  currentButton = button // Guardamos el botón actual

  audio.play()

  // Cambiar el texto del botón de reproducción a "Pausar"
  button.textContent = "▐▐"
  button.setAttribute("onclick", "pauseSong(this)")

  // Detectar cuando la canción haya terminado y cambiar el botón a "Reproducir"
  audio.addEventListener("ended", () => {
    button.textContent = "▶"
    button.setAttribute("onclick", "playSong(this)")
  })
}

function pauseSong(button) {
  if (currentAudio) {
    currentAudio.pause()
    // Cambiar el texto del botón de "Pausar" a "Reproducir"
    button.textContent = "Reproducir"
    button.setAttribute("onclick", "playSong(this)")
  }
}

