'use strict'

/**
 * Application Name - Weather Application
 * Author - Rahul Kumar
 * Description - This weather app lets you check weather for today and also for 
 * next 5 days (including today).
 * In the application, Module pattern has been used to make the code cleaner
 * User your own openWeather API key to analyse the application
 */


/******************Module to make api call & display the weather data ***************/
const AppModule = {

    timeFormatter (timestamp) {

        const formattedTime = new Date(timestamp*1000);
        let hours = formattedTime.getHours();
        let min = formattedTime.getMinutes();


        hours = hours < 10 ? `0${hours}` : hours;
        min = min < 10 ? `0${min}` : min;

        return `${hours} : ${min}`;
    },

    weatherData (city) {
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

        const temp = document.querySelector('.city__temp span');
        const weatherIcon = document.querySelector('.weather__icon');
        const cityName = document.querySelector('.city__name');
        const sunrise = document.querySelector('.sunrise__time');
        const sunset = document.querySelector('.sunset__time');
        const dayParas = document.querySelectorAll('.day p');
        const dayIcons = document.querySelectorAll('.day img');
        const dayTemps = document.querySelectorAll('.day h3 span')


        
        const options = {  method : 'GET' };
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid={API KEY}`;


        // Make http request to receive the weather data
        fetch(url, options)
        .then(response => {
            if (response.ok) return response.json();
            else console.error(response.statusText);
        })
        .then(res => {
            
            //1. sunrise
            sunrise.textContent = this.timeFormatter(res.city.sunrise);
            
            //2.sunset
            sunset.textContent = this.timeFormatter(res.city.sunset);

            //3. temperature
            temp.textContent = (res.list[0].main.temp).toFixed(1);

            //4. city name
            cityName.textContent = res.city.name;

            //5. weather Icon
            weatherIcon.src = `icons/${res.list[0].weather[0].icon}.png`;
            weatherIcon.alt = `${res.list[0].weather[0].description} icon`;

            //6. weather details for next 5 days
            for(let i=0,j=0;i <= res.list.length,j < 5; i+=8,j += 1) {

                const day = new Date(res.list[i].dt*1000);
                
                //date
                dayParas[j].textContent = `${weekDays[day.getDay()]}, ${day.getDate()}`;
                
                //icon
                dayIcons[j].src = `icons/${res.list[i].weather[0].icon}.png`;
                dayIcons[j].alt = `${res.list[i].weather[0].description} icon`;
                
                //temperature
                dayTemps[j].textContent = (res.list[i].main.temp).toFixed(1);
            }


        })
        .catch(() => console.error('Network error'));
    }
    
};







/******************* Module to handle event handlers ******************* */
const EventModule = {

    event (AppMod) {

        const searchBtn = document.querySelector('.city__search__btn i');
        const cityField = document.querySelector('.city__name__field');

         //Event handler for search button
        searchBtn.addEventListener('click', weatherFunc);

        //event handler for enter key
        document.addEventListener('keydown', e => {
            if (e.key === "Enter") weatherFunc();
        })



        // Function to execute after user click on search button
        function weatherFunc() {

            //1. Take the city name
            const cityName = cityField.value;
            cityField.value = '';
            cityField.focus();

            //2. Check for valid city name
            if(cityName !== '') {
                
                //Pass the cityname into APP MODULE
                AppMod.weatherData(cityName)
            }
        }


        //When browser loads first time
        window.onload = () => {
            AppMod.weatherData('Giridih');
            cityField.focus();
        } 
    
    }
 
};

EventModule.event(AppModule);





























































// const searchBtn = document.querySelector('.search__btn');
// const weatherIcon = document.querySelector('.icon__container img');
// const dateLabel = document.querySelector('.date');
// const temp = document.querySelector('.temp__info__container h3 span');
// //const tempInfo = document.querySelector('.temp__info__container h3');
// const weatherType = document.querySelector('.temp__info__container h4');
// const inputField = document.querySelector('.city__search__container input');
// const sunrise = document.querySelector('.sunrise__time');
// const sunset = document.querySelector('.sunset__time');




// //function to calculate current date
// const displayDate = function () {
//     const months = [
//                     'Jan', 'Feb', 'March', 'April', 'May', 'June',
//                     'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//                 ];
//     const date = new Date();
//     dateLabel.textContent = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
// };
// displayDate();




// //function to display info when entered city is not available
// const naFunc = () => {
//     weatherIcon.src = `icons/unknown.png`;
//     temp.textContent = 'N/A';
//     weatherType.textContent = 'Sorry 😮';
//     sunrise.textContent = 'N/A';
//     sunset.textContent = 'N/A'; 
// };




// //function to calculate sunrise and sunset
// const sunCalc = (timestamp) => {

//     const time = new Date(timestamp*1000);
//     const hour = time.getHours() < 10?`0${time.getHours()}`:time.getHours();
//     const min = time.getMinutes() < 10?`0${time.getMinutes()}`:time.getMinutes();
//     return `${hour}:${min}`;
// };





// //function which will be executed after clicking search button or pressing enter key
// const asyncFunc = function () {

//     //Get city name from the search field
//     const city = inputField.value;
//     inputField.value = '';

//     //Check for valid city name
//     if(city) {  

//         //fetch data from the API
//         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f8ac903dec26469582e704835500db6b`)
//         .then(response => {

//             if (response.status >= 200 && response.status < 400) {

//                 response.json()
//                 .then(res => {

//                     weatherIcon.src = `icons/${res.weather[0].icon}.png`;
//                     temp.textContent = Math.round(res.main.temp);
//                     weatherType.textContent = res.weather[0].main;
//                     sunrise.textContent = sunCalc(res.sys.sunrise);
//                     sunset.textContent = sunCalc(res.sys.sunset);
//                 });
//             }
//             else {
//                naFunc();
//             }
//         })
//         .catch(error => {
//             console.log(error.status);
//         })
//     }  
//     else {
//         naFunc();
//     }
// };



// //Display weather info
// searchBtn.addEventListener('click', asyncFunc);
// window.addEventListener('keydown', function (key) {
//     if(key.key === "Enter") asyncFunc();
// });


// //When application loads initially
// window.addEventListener('load', naFunc);
