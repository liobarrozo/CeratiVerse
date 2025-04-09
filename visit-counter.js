    const contadorId = 'cerativerse.liobarrozo/visitas';
    const contadorElemento = document.getElementById('contador');
    const esLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (!esLocal) {
      const yaVisitado = localStorage.getItem('contador-visitado');

      const endpoint = yaVisitado
        ? `https://api.countapi.xyz/get/${contadorId}`
        : `https://api.countapi.xyz/hit/${contadorId}`;

      fetch(endpoint)
        .then(res => res.json())
        .then(data => {
          contadorElemento.textContent = data.value;
          if (!yaVisitado) localStorage.setItem('contador-visitado', 'true');
        })
        .catch(err => {
          console.error('Error al obtener el contador:', err);
          contadorElemento.textContent = 'Error';
        });
    } else {
      contadorElemento.textContent = '–';
    }
