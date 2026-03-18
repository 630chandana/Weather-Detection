function getWeather()
{
    let city = document.getElementById("city").value;

    let apiKey = "e6c7e4465da4cf7a70d94dd594543bb8";

    let url = "https://api.openweathermap.org/data/2.5/weather?q="
              + city +
              "&appid=" + apiKey +
              "&units=metric";

    fetch(url)
    .then(response => response.json())
    .then(data => {

        if(data.cod != 200)
        {
            document.getElementById("result").innerHTML="City not found";
            return;
        }

        let temp = data.main.temp;
        let humidity = data.main.humidity;
        let weather = data.weather[0].description;
        let wind = data.wind.speed;

        document.getElementById("result").innerHTML =
        "Temperature: " + temp + " °C <br>" +
        "Humidity: " + humidity + "% <br>" +
        "Weather: " + weather + "<br>" +
        "Wind Speed: " + wind + " km/h";

        // Weather image logic
        let image = "";

        if(weather.includes("rain"))
        {
            image = "images/rainy.jpg";
        }
        else if(weather.includes("cloud"))
        {
            image = "images/cloudy.jpg";
        }
        else if(temp > 35)
        {
            image = "images/hot.jpg";
        }
        else if(wind > 10)
        {
            image = "images/windy.jpg";
        }
        else
        {
            image = "images/sunny.jpg";
        }

        document.getElementById("weatherImage").src = image;

        // Forecast API for chart
        let forecastUrl =
        "https://api.openweathermap.org/data/2.5/forecast?q="
        + city +
        "&appid=" + apiKey +
        "&units=metric";

        fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {

            let temps = [];
            let times = [];

            for(let i=0;i<5;i++)
            {
                temps.push(data.list[i].main.temp);
                times.push(data.list[i].dt_txt);
            }

            createChart(times,temps);

        });

    });
}

// Function to create temperature chart
function createChart(times,temps)
{
    new Chart(document.getElementById("tempChart"), {
        type: "line",
        data: {
            labels: times,
            datasets: [{
                label: "Temperature Forecast",
                data: temps
            }]
        }
    });
}