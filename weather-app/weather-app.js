window.addEventListener("load", () => {
  let long;
  let lat;
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureDegree = document.querySelector(".temperature-degree");
  const temperatureSpan = document.querySelector(".temperature span");
  let temperatureDescription = document.querySelector(".temperature-description");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/c1105e25a4f46f8cb6f115edc1657ab0/${lat},${long}`;
      /* ! console.log(position);*/

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          /*console.log(data);*/
          const {
            temperature,
            summary,
            icon
          } = data.currently;

          //Set DOM elements from the API

          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //FORMULA FOR CELSIUS
          let celsius = ((temperature - 32) * 5) / 9;

          //Set Icon
          setIcons(icon, document.querySelector(".icon"));

          //Change Temperature to Celsius from Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
    /*else{
                   h1.textContent = "Hey, this is not working because of these reasons:"
               }*/
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({
      color: "white"
    });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});