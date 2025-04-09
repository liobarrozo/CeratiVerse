if (window.location.hostname === 'cerativerse.liobarrozo.com') {
    fetch('https://api.countapi.xyz/hit/cerativersere.liobarrozo')
      .then(res => res.json())
      .then(data => {
        document.getElementById('contador').textContent = data.value;
      });
  }
