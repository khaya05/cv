const menuToggleButton = document.getElementById('menu-toggle');
const menuCloseButton = document.getElementById('menu-close');
const mobileNavigation = document.getElementById('mobile-nav');
const pageOverlay = document.getElementById('overlay');

const temperatureElements = document.querySelectorAll('.temperature');
const locationElements = document.querySelectorAll('.location');
const windSpeedElements = document.querySelectorAll('.wind-speed');
const humidityElements = document.querySelectorAll('.humidity');
const weatherIconImages = document.querySelectorAll('.weather-icon-img');
const dateElements = document.querySelectorAll('.date');
const timeElements = document.querySelectorAll('.time');

window.addEventListener('load', () => {
  document.body.classList.add('visible');
});

document.addEventListener('DOMContentLoaded', () => {
  function toggleNavigation() {
    mobileNavigation.classList.toggle('open');
    pageOverlay.classList.toggle('open');
  }

  menuToggleButton.addEventListener('click', toggleNavigation);
  menuCloseButton.addEventListener('click', toggleNavigation);
  pageOverlay.addEventListener('click', toggleNavigation);
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiKey = 'ed7d1a371f85964ea454aaaa2c4717ab';
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  fetch(weatherApiUrl)
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

  temperatureElements.forEach((element) => {
    element.innerHTML = `${temperature}&deg;C`;
  });

  locationElements.forEach((element) => {
    element.textContent = location;
  });

  windSpeedElements.forEach((element) => {
    element.textContent = `${windSpeed} km/h`;
  });

  humidityElements.forEach((element) => {
    element.textContent = `${humidity}%`;
  });

  weatherIconImages.forEach((element) => {
    element.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
  });

  timeElements.forEach((element) => {
    element.textContent = currentDateTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  });

  dateElements.forEach((element) => {
    element.textContent = currentDateTime.toDateString();
  });
}

getLocation();
