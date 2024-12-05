/*Creation of JavaScript elements by means of linking the id or class of elements from HTML using DOM*/ 
let search = document.getElementById('search');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
const location_not_found = document.querySelector(".location-not-found");
const result = document.querySelector('.result');

/*Event handling, when the user clicks on search, the website will listen to the event using submit*/ 
form.addEventListener('submit', (event) => {
    event.preventDefault();
/*If user has entered correct data an API function called searchWeather will be called*/
    if(search.value != ''){
        searchWeather();
    }
})
/*The API key and website link that weather information will be collected from*/
let id = '0c9592a38643b5f545f94ca1597aa92e'
let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=`+id;
const searchWeather = () => {
    fetch(url + '&q=' + search.value)
/*Once response is recieved, it is coverted to json and data is retured */
    .then(Response => Response.json())
    .then(data => {
        console.log(data);
        /*JavaScript elements assigned the paths from the console of the webpage, allowing the assignment of weather informtion to their respective elements*/
        if(data.cod == 200) {
            city.querySelector('figcaption').innerText = data.name;
            city.querySelector('img').src='https://flagsapi.com/'+data.sys.country+'/shiny/32.png';
            temperature.querySelector('img').src='http://openweathermap.org/img/wn/'+data.weather[0].icon+'@4x.png';
            temperature.querySelector('figcaption span').innerText=data.main.temp + '\u00B0';
            description.innerHTML = `${data.weather[0].main}`
            clouds.innerText = `${data.clouds.all}`
            humidity.innerText = `${data.main.humidity}`
            pressure.innerText = `${data.main.pressure}`
        }
        /*If invalid input is put into the searchbar or an error occurs in which information cannot be retrieved, this outputs the error message*/
        else{
            location_not_found.style.display = "flex";
            result.style.display = "none";
            console.log("error");
            return;
        }
    })
} 

