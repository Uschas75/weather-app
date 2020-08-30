var input = document.querySelector('#input_text');
var button = document.querySelector('#submit_button');
var count = 0;
var cardArray = [];
var Days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
const apiKey = "6b8e5fb2ae913cde1f97fa00d0b389ad";

button.addEventListener('click', async function(name) {
    Promise.all([
        await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + apiKey),
        await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input.value + '&appid=' + apiKey)
    ]).then(function(responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function(response) {
            return response.json();
        }));
    }).then(function(data) {
        getSearchResult(data);
        console.log(data);
    }).catch(function(error) {
        alert("Wrong city name!");
        console.log(error);
    });
})

function getSearchResult(data) {

    count++;
    let tempValue = data[0]['main']['temp'] - 273.15;
    input.value = "";

    let nextDaysName = [];
    let nextDaysTemp = [];
    let nextDaysIcon = [];

    for (let i = 9; i <= 39; i += 8) {
        let nextDays = data[1]['list'][i]['dt_txt'];
        let date = new Date(nextDays);
        nextDaysName.push(Days[date.getDay()]);
        let temparute = (data[1]['list'][i]['main']['temp'] - 273.15).toFixed(0);
        nextDaysTemp.push(temparute);
        let weatherIcon = data[1]['list'][i]['weather'][0]['icon'];
        nextDaysIcon.push(weatherIcon);
    }

    let weatherCard = '<div class="col-md-4">' +
        '<div class="card card-shadow" style="width: 18rem; margin:10px ">' +
        '<div class="card-main-section sunny">' +
        '<div class="card-title">' +
        '<span>' + data[0]['name'] + '</span>' +
        '</div>' +
        '<div class="card-icon d-flex justify-content-center">' +
        '<img id="weatherIcon" src="http://openweathermap.org/img/w/' + data[0]['weather'][0]['icon'] + '.png" alt="Weather icon">' +
        '</div>' +
        '<div class="card-temperature d-flex justify-content-center">' +
        '<div class="card-degree">' +
        '<span>' + tempValue.toFixed(0) + "&#8451" + '</span>' +
        '</div>' +
        '<br>' +
        '<div class="card-degree-condition">' +
        '<p>' + data[0]['weather'][0]['description'] + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="card-sub-section sub-sunny container-fluid">' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<p>' + nextDaysName[0] + '</p>' +
        '<img src="http://openweathermap.org/img/w/' + nextDaysIcon[0] + '.png" alt="Weather icon">' +
        '<p>' + nextDaysTemp[0] + "&#8451" + '</p>' +
        '</div>' +
        '<div class="col-md-3">' +
        '<p>' + nextDaysName[1] + '</p>' +
        '<img src="http://openweathermap.org/img/w/' + nextDaysIcon[1] + '.png" alt="Weather icon">' +
        '<p>' + nextDaysTemp[1] + "&#8451" + '</p>' +
        '</div>' +
        '<div class="col-md-3">' +
        '<p>' + nextDaysName[2] + '</p>' +
        '<img src="http://openweathermap.org/img/w/' + nextDaysIcon[2] + '.png" alt="Weather icon">' +
        '<p>' + nextDaysTemp[2] + "&#8451" + '</p>' +
        '</div>' +
        '<div class="col-md-3">' +
        '<p>' + nextDaysName[3] + '</p>' +
        '<img src="http://openweathermap.org/img/w/' + nextDaysIcon[3] + '.png" alt="Weather icon">' +
        '<p>' + nextDaysTemp[3] + "&#8451" + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    if (count == 1) {
        cardArray.push(weatherCard);
        $("#getWeatherCard").html(cardArray);
    } else if (count == 2) {
        cardArray.unshift(weatherCard);
        $("#getWeatherCard").html(cardArray);
    } else if (count == 3) {
        cardArray.unshift(weatherCard);
        $("#getWeatherCard").html(cardArray);
    } else {
        cardArray.unshift(weatherCard);
        cardArray.pop(weatherCard);
        $("#getWeatherCard").html(cardArray);
    }

}