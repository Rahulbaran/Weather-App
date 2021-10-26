'use strict'



























































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
