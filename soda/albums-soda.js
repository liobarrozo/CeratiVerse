document.addEventListener("DOMContentLoaded", () => {
  const url = "https://sodati-api.portfolio-ls.online/soda";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const albumContainer = document.getElementById("album-container");
      data.forEach((album) => {
        const albumCard = document.createElement("div");
        albumCard.classList.add("album-card");

        albumCard.innerHTML = `
          <a href="albums-soda-id.html?id=${album.id}" class="album-link">
            <h2>${album.title}</h2>
          </a>
          <p>Fecha de lanzamiento: ${album.release_date}</p>
          <img src="${album.cover_medium}" alt="${album.title}">
        `;

        albumContainer.appendChild(albumCard);
      });
    })
    .catch((error) => console.error("Error:", error));
});
