const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileNav = document.getElementById('mobile-nav');
const overlay = document.getElementById('overlay'); 
const temp = document.querySelector('.temperature');
const loc = document.querySelector('.location');
const wind = document.querySelector('.wind-speed');
const humid = document.querySelector('#humidity');
const icon = document.querySelector('.weather-icon-img');
const date = document.querySelector('.date');
const time = document.querySelector('.time'); 
window.addEventListener('load', () => {
  document.body.classList.add('visible');
});

document.addEventListener('DOMContentLoaded', () => {
  function toggleNav() {
    mobileNav.classList.toggle('open');
    overlay.classList.toggle('open');
  }

  menuToggle.addEventListener('click', toggleNav);
  menuClose.addEventListener('click', toggleNav);
  overlay.addEventListener('click', toggleNav);
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = 'ed7d1a371f85964ea454aaaa2c4717ab';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => updateWeather(data))
    .catch((error) => console.error('Error fetching weather data:', error));
}

function updateWeather(data) {
  const temperature = Math.round(data.main.temp);
  const location = data.name;
  const windSpeed = data.wind.speed;
  const humidity = data.main.humidity;
  const weatherIcon = data.weather[0].icon;
  const currentDateTime = new Date();
 
  temp.innerHTML = `${temperature}&deg;C`;
  loc.textContent = location;
  wind.textContent = `${windSpeed} km/h`;
  humid.textContent = `${humidity}%`;
  icon.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
  time.textContent = currentDateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  date.textContent = currentDateTime.toDateString();
}

getLocation();
