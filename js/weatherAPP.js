let navLinks = document.getElementsByClassName("nav-link");
let header = document.getElementById("header");
let contentDiv = document.getElementById("content");
let days = document.getElementsByClassName("days")[0];
let contentWrapper = document.getElementById("contentWrapper").children;

let searchBtn = document.getElementById("btnSearch");
let searchInput = document.getElementById("searchInput");
let hourlyTableBody = document.getElementById("hourlyTableBody");
let statisticsTableBody = document.getElementById("statisticsTableBody");
let btnSort = document.getElementById("sort");
let btnRestore = document.getElementById("restore");

function printStatistics(element1, e1Info, element2) {
    navLinks[0].setAttribute("class", "nav-link active");
    navLinks[1].setAttribute("class", "nav-link");
    navLinks[2].setAttribute("class", "nav-link");

    element1.innerHTML = `${e1Info}`;
    element2.innerHTML = `The most accurate weather page in the world, according to some sources...`;
    element2.style.color = `blue`; element2.style.fontSize = `38px`; element2.style.fontWeight = `bold`;
    
    contentWrapper[0].style.display = `block`;
    contentWrapper[1].style.display = `none`;
    contentWrapper[2].style.display = `none`;
    days.style.display = `block`;
}
function printHourly(element1, e1Info, element2) {
    navLinks[0].setAttribute("class", "nav-link");
    navLinks[1].setAttribute("class", "nav-link active");
    navLinks[2].setAttribute("class", "nav-link");

    element1.innerHTML = `${e1Info}`;
    element2.innerHTML = `Here you can read the hourly weather report for the following days. <br/> Keep in mind that it is not actually every hour, but every 3 - 5 hours`;

    contentWrapper[0].style.display = `none`;
    contentWrapper[1].style.display = `block`;
    contentWrapper[2].style.display = `none`;
}
function printAbout(element1, e1Info, element2) {
    navLinks[0].setAttribute("class", "nav-link");
    navLinks[1].setAttribute("class", "nav-link");
    navLinks[2].setAttribute("class", "nav-link active");

    element1.innerHTML = `${e1Info}`;
    element2.innerHTML = `<br/> <br/> <br/> <br/> <br/> <br/>
        This application is a project built to have some real world application and meaning.</p>`;

    contentWrapper[0].style.display = `none`;
    contentWrapper[1].style.display = `none`;
    contentWrapper[2].style.display = `block`;
    days.style.display = `none`;
}
function colorEl(element){
    element.style.color = `whitesmoke`;
}
function printHourlyInfo(imgIcon, description, timeDate, tempR, tempFlike, Humidity, WindSpeed) {
    let row = document.createElement("tr");
    let tdIcon = document.createElement("td");
    let tdDescription = document.createElement("td");
        tdDescription.innerText = description;
    let time = document.createElement("td");
        time.innerText = new Date(timeDate).toLocaleString();
    let temperature = document.createElement("td");
        temperature.innerText = `${tempR} C (${tempFlike} C)`;
    let humidity = document.createElement("td");
        humidity.innerText = `${Humidity} %`;
    let windSpeed = document.createElement("td");
        windSpeed.innerText = `${WindSpeed} km/h`;
    let img = document.createElement("img");
        img.setAttribute(`src`, `http://openweathermap.org/img/w/${imgIcon}.png`);

        if(tempR > 7) temperature.style.color = `red`;
        else if(tempR < 7) temperature.style.color = `blue`;

        if(description === `clear sky`) tdDescription.style.color = `red`;
        if(description === `light rain` || description === `moderate rain`) {
            tdDescription.style.color = `blue`;
            tdDescription.style.fontWeight = `bold`;
        }
        if(description === `overcast clouds` || description === `scattered clouds` || 
                description === `few clouds` || description === `broken clouds`) 
                tdDescription.style.color = `black`;
        if(description === `light snow`) tdDescription.style.color = `white`;
        if(description === `snow`) tdDescription.style.color = `white`;

        colorEl(humidity);
        colorEl(windSpeed);
        colorEl(time);

    tdIcon.appendChild(img);
    row.appendChild(tdIcon);
    row.appendChild(tdDescription);
    row.appendChild(time);
    row.appendChild(temperature);
    row.appendChild(humidity);
    row.appendChild(windSpeed);

    hourlyTableBody.appendChild(row);
}
function printStatisticsInfo(responseObj) {
    let tempArray = [];
    for (let i = 0; i < responseObj.list.length; i++) {
        tempArray.push(responseObj.list[i].main.temp_max);
    }
    let sortedLargest = tempArray.sort((a, b) => a - b);
    const largestTemperature = sortedLargest[sortedLargest.length - 1];
    let largestTempDay = null;
    for (let i = 0; i < responseObj.list.length; i++) {
        if (responseObj.list[i].main.temp_max === largestTemperature) {
            largestTempDay = responseObj.list[i].dt_txt;
            largestTempDay = new Date(largestTempDay);
            largestTempDay = largestTempDay.toDateString();
        }
    }

    let sortedLowest = tempArray.sort((a, b) => b - a);
    const lowestTemperature = sortedLowest[sortedLowest.length - 1]; 
    let lowestTempDay = null;
    for (let i = 0; i < responseObj.list.length; i++) {
        if (responseObj.list[i].main.temp_min === lowestTemperature) {
            lowestTempDay = responseObj.list[i].dt_txt;
            lowestTempDay = new Date(lowestTempDay);
            lowestTempDay = lowestTempDay.toDateString();
        }
    }

    const averageTemperature = tempArray.reduce((a, b) => a + b, 0) / tempArray.length;
    let avgTempCeiled = Math.ceil(averageTemperature);

    let humdArray = [];
    for (let i = 0; i < responseObj.list.length; i++) {
        humdArray.push(responseObj.list[i].main.humidity);
    }
    let sortedLargestHumd = humdArray.sort((a, b) => a - b);
    const maxHumidity = sortedLargestHumd[sortedLargestHumd.length - 1];

    let sortedLowestHumd = humdArray.sort((a, b) => b - a);
    const lowestHumidity = sortedLowestHumd[sortedLowestHumd.length - 1];

    const averageHumidity = humdArray.reduce((a, b) => a + b, 0) / humdArray.length;
    let avgHumdCeiled = Math.ceil(averageHumidity);


    let row = document.createElement("tr");
    let tdMaxTemp = document.createElement("td");
        tdMaxTemp.innerText = `${largestTemperature} C`;
    let avgTemp = document.createElement("td");
        avgTemp.innerText = `${avgTempCeiled} C`;
    let lowTemp = document.createElement("td");
        lowTemp.innerText = `${lowestTemperature} C`;

    let maxHumd = document.createElement("td");
        maxHumd.innerText = `${maxHumidity} %`;
    let avgHumd = document.createElement("td");
        avgHumd.innerText = `${avgHumdCeiled} %`;
    let lowHumd = document.createElement("td");
        lowHumd.innerText = `${lowestHumidity} %`;

    let warmestDay = document.createElement("h4");
        warmestDay.setAttribute("class", "warmDay");
        warmestDay.innerText = `The warmest day of this period will be ${largestTempDay}`;
    let coldestDay = document.createElement("h4");
        coldestDay.setAttribute("class", "coldDay");
        coldestDay.innerText = `The coldest day of this period will be ${lowestTempDay}`;
    
    if(largestTemperature > 7) tdMaxTemp.style.color = `red`;
    if(lowestTemperature > 7) lowTemp.style.color = `red`;

    if(largestTemperature < 7) tdMaxTemp.style.color = `blue`;
    if(lowestTemperature < 7) lowTemp.style.color = `blue`;

    row.appendChild(tdMaxTemp);
    row.appendChild(avgTemp);
    row.appendChild(lowTemp);

    row.appendChild(maxHumd);
    row.appendChild(avgHumd);
    row.appendChild(lowHumd);

    if(lowestTempDay !== null) days.appendChild(coldestDay);
    if(warmestDay !== null) days.appendChild(warmestDay);
    
    statisticsTableBody.appendChild(row);
}
let responseObjListArray = null;
function sorter(){
    for(let i = 0; i < responseObjListArray.length; i++){
        responseObjListArray.sort((obj1, obj2) => {
            if(obj1.main.temp < obj2.main.temp) return 1;
            else if(obj1.main.temp === obj2.main.temp) return 0;
            else return -1;
        });
    }
    
    hourlyTableBody.innerHTML = "";
    for (let i = 0; i < responseObjListArray.length; i++) {
        printHourlyInfo(responseObjListArray[i].weather[0].icon, responseObjListArray[i].weather[0].description, responseObjListArray[i].dt_txt, responseObjListArray[i].main.temp, responseObjListArray[i].main.feels_like, responseObjListArray[i].main.humidity, responseObjListArray[i].wind.speed);
    }
    // console.log("done sorting items");    ///////////////////// debug
}
function startHourlyInfo(responseObj){
    for (let i = 0; i < responseObj.list.length; i++) {
        printHourlyInfo(responseObj.list[i].weather[0].icon, responseObj.list[i].weather[0].description, responseObj.list[i].dt_txt, responseObj.list[i].main.temp, responseObj.list[i] .main.feels_like, responseObj.list[i].main.humidity, responseObj.list[i].wind.speed);
    }
}
function restorer(responseObj){
    hourlyTableBody.innerHTML = "";
    startHourlyInfo(responseObj);

    // console.log("done restoring items -------------------"); ////////////////// debug
}
function GET(link) {
    $(function () {
        $.ajax({
            url: `${link}`,
        })
            .done(responseObj => {
                days.innerText = ""; // reset
                statisticsTableBody.innerText = ""; // reset
                hourlyTableBody.innerText = ""; // reset
                // console.log(responseObj);
                responseObjListArray = responseObj.list; // save obj for further use...
                
                startHourlyInfo(responseObj);
                printStatisticsInfo(responseObj);
                searchInput.value = "";

                fetch(link).then(response => response.json())
                .then(responseObj =>{
                    btnSort.addEventListener("click", function(){
                        sorter();
                    });
                   
                    btnRestore.addEventListener("click", function(){
                        restorer(responseObj);
                    });
                    
                });
            })
            .fail(responseEr => {
                alert(`Wrong input please enter a valid City!`);
                searchInput.value = "";
                console.log(responseEr);

                printHourly(header, `Hourly Weather Skopje`, contentDiv);
                printStatistics(header, `Weather Alert Skopje`, contentDiv);
                GET("https://api.openweathermap.org/data/2.5/forecast?q=skopje&units=metric&APPID=a7fd85fdea2a7f635dbc236e01014ba9");
                City = "Skopje";
            });
    });
}
let City = null;
function saveValue(city) {
    City = city;
}
navLinks[0].addEventListener("click", _ => {
    if (City !== null) printStatistics(header, `Weather Alert ${City}`, contentDiv);
    else               printStatistics(header, `Weather Alert Skopje`, contentDiv);
});
navLinks[1].addEventListener("click", _ => {
    if (City !== null) printHourly(header, `Hourly Weather ${City}`, contentDiv);
    else               printHourly(header, `Hourly Weather Skopje`, contentDiv);
});
navLinks[2].addEventListener("click", _ => {
    printAbout(header, `About Weather Alert`, contentDiv);
});

searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    saveValue(searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1));

    printStatistics(header, `Weather Alert ${City}`, contentDiv);
    printHourly(header, `Hourly Weather ${City}`, contentDiv);
    GET(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&units=metric&APPID=a7fd85fdea2a7f635dbc236e01014ba9`);
});

// launch statistics for Skopje when page loads..
GET("https://api.openweathermap.org/data/2.5/forecast?q=skopje&units=metric&APPID=a7fd85fdea2a7f635dbc236e01014ba9");
printStatistics(header, `Weather Alert Skopje`, contentDiv);