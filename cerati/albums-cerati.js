document.addEventListener("DOMContentLoaded", () => {
  const url = "https://sodati-api.portfolio-ls.online/cerati/";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const albumContainer = document.getElementById("album-container");
      data.forEach((album) => {
        const albumCard = document.createElement("div");
        albumCard.classList.add("album-card");
        albumCard.innerHTML = `
                    <h2>${album.title}</h2>
                    <p>Fecha de lanzamiento: ${album.release_date}</p>
                    <img src="${album.cover_medium}" alt="${album.title}">

                    <div class="deezer-player">
                        <iframe 
                            src="https://widget.deezer.com/widget/dark/album/${album.id}" 
                            width="300" 
                            height="350" 
                            frameborder="0" 
                            allowtransparency="true" 
                            allow="encrypted-media; clipboard-write" 
                            scrolling="no">
                        </iframe>
                    </div>
                `;
        albumContainer.appendChild(albumCard);
      });
    })
    .catch((error) => console.error("Error:", error));
});
