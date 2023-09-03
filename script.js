getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, () => {
            document.getElementById("body").style.filter = 'blur(0rem)';
        });
    }
}

function showPosition(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    //console.log(longitude, latitude);
    getName(latitude, longitude);
}

async function getName(latitude, longitude) {
    var access_key = '8c7352e7f26adb9b1948a52710c3e92b';
    // Construct the API URL with correct endpoint and parameters
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${access_key}`;

    try {
        var res = await fetch(url);

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        var data = await res.json();
        // Check if 'name' property exists in the response data
        if (data.name) {
            var location = data.name;
            console.log(location);
            // Call fetchData with the location data
            fetchData(location);
            document.getElementById("body").style.filter = 'blur(0rem)';
        } else {
            console.error('Location data not found in the response');
        }
    } catch (error) {
        console.error('There was a problem fetching weather data:', error);
    }
}

function findWeather() {
    var location = document.getElementById("search").value;
    fetchData(location);
}
async function fetchData(location) {
    var url = `https://api.weatherapi.com/v1/current.json?key=7f367892daf144989d994146230309&q=` + location + `&aqi=yes`;
    var res = await fetch(url);
    var data = await res.json();


    if (res.status == 200) {
        setValues(data);
    } else {
        var tags = document.getElementById('reset');
        for (let i = 0; i < tags.length; i++) {
            tags.item(i).innerHTML = ""
        }
        document.getElementById("name").innerHTML = "Location Not Found";
    }

}

function setValues(data) {
    var setter = document.getElementById("temp");
    setter.innerHTML = data.current.temp_c + `&#176`;

    setter = document.getElementById('name');
    setter.innerHTML = data.location.name;

    setter = document.getElementById('region');
    setter.innerHTML = `&nbsp;` + data.location.region + `,` + data.location.country;

    setter = document.getElementById('feelslike');
    setter.innerHTML = `Feels Like ` + data.current.feelslike_c + `&#176`;

    setter = document.getElementById('condition');
    setter.innerHTML = data.current.condition.text;

    setter = document.getElementById('cloud');
    setter.innerHTML = data.current.cloud + `%`;

    setter = document.getElementById('humidity');
    setter.innerHTML = data.current.humidity + `%`;

    setter = document.getElementById('wind_kph');
    setter.innerHTML = data.current.wind_kph + `km/h` + data.current.wind_dir;

    setter = document.getElementById('gust_kph');
    setter.innerHTML = data.current.gust_kph + `km/h`;

    setter = document.getElementById('precip_mm');
    setter.innerHTML = data.current.precip_mm + `mm`;

    setter = document.getElementById('pressure_mb');
    setter.innerHTML = data.current.pressure_mb + `mb`;

    setter = document.getElementById('vis_km');
    setter.innerHTML = data.current.vis_km + `km`;

    setter = document.getElementById('uv');
    setter.innerHTML = data.current.uv + ` `;
}

var date = new Date();
var day = date.getDay();
var month = date.getMonth();
switch (month) {
    case 0:
        month = "January";
        break;
    case 1:
        month = "February";
        break;
    case 2:
        month = "March";
        break;
    case 3:
        month = "April";
        break;
    case 4:
        month = "May";
        break;
    case 5:
        month = "June";
        break;
    case 6:
        month = "July";
        break;
    case 7:
        month = "August";
        break;
    case 8:
        month = "September";
        break;
    case 9:
        month = "October";
        break;
    case 10:
        month = "November";
        break;
    case 11:
        month = "December";
        break;
}

switch (day) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
        break;
}

document.getElementById("date").innerHTML =
    date.getHours() + ` : ` + date.getMinutes() + ` - ` + day + ` , ` + date.getDate() + ` ` + month + ` ` + date.getFullYear();