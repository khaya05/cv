window.addEventListener('load', () => {
  document.body.classList.add('visible');
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('overlay');

  function toggleNav() {
    mobileNav.classList.toggle('open');
    overlay.classList.toggle('open');
  }

  menuToggle.addEventListener('click', toggleNav);
  menuClose.addEventListener('click', toggleNav);
  overlay.addEventListener('click', toggleNav);
});

// Get user's location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// Fetch weather data
function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => updateWeather(data))
    .catch((error) => console.error('Error fetching weather data:', error));
}

// Update the HTML with the fetched data
function updateWeather(data) {
  const temp = Math.round(data.main.temp);
  const location = data.name;
  const windSpeed = data.wind.speed;
  const humidity = data.main.humidity;
  const weatherIcon = data.weather[0].icon;
  const currentDateTime = new Date();

  document.getElementById('temperature').innerHTML = `${temp}&deg;C`;
  document.getElementById('location').textContent = location;
  document.getElementById('wind-speed').textContent = `${windSpeed} km/h`;
  document.getElementById('humidity').textContent = `${humidity}%`;
  document.getElementById('weather-icon-img').src =
    `http://openweathermap.org/img/wn/${weatherIcon}.png`;
  document.getElementById('time').textContent =
    currentDateTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  document.getElementById('date').textContent = currentDateTime.toDateString();
}

// Call getLocation to start the process
// getLocation();
