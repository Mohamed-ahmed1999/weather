document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {

        var linkhref = this.getAttribute('href').substring(1);

        document.querySelectorAll('.site-content').forEach(section => {
            section.classList.add('d-none');
        });

        document.getElementById(linkhref).classList.remove('d-none');
    });
});


function navigateToSection(sectionId) {
    document.querySelectorAll('.site-content').forEach(section => {
        section.classList.add('d-none');
    });
    document.getElementById(sectionId).classList.remove('d-none');
}





async function search(location) {
    var apiKey = "1de2b4d96ef141bb872201812240812";
    var apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;

    try {
        var siteLink = await fetch(apiUrl);
       
        var data = await siteLink.json();

        displayCurrent(data.location, data.current);
        displayAnother(data.forecast.forecastday);

    } 
    catch (error) {
    }
}



document.getElementById("search").addEventListener("keyup", a => {
    search(a.target.value);
});



var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


search("Suez");


function displayCurrent(location, current) {
    if (current != null) {
        var date = new Date(current.last_updated.replace(" ", "T"));
        let html = `
             <div class="column" >

            <div class="today forecast text-white">
                <div class="forecast-header d-flex justify-content-between" id="today">
                    <div class="day ps-2 pt-1">${days[date.getDay()]}</div>
                    <div class="date pe-2 pt-1">${date.getDate()} ${monthNames[date.getMonth()]}</div>
                </div>
                <div class="forecast-content" id="current">
                    <div class="location pt-4 ps-3 fs-4">${location.name}</div>
                    <div class="degree">
                        <div class="num ps-4 ">${current.temp_c}<sup>°</sup>C</div>
                        <div class="forecast-icon ps-3">
                            <img src="https:${current.condition.icon}" alt="" width="90">
                        </div>
                    </div>
                    <div class="custom text-info ps-4 ">${current.condition.text}</div>
                    
                    <div class= " ps-4 pb-4 pt-2 d-flex gap-3">
                    <span><img src="./img/icon-umberella.png" alt="">20%</span>
                    <span><img src="./img/icon-wind.png" alt="">18km/h</span>
                    <span><img src="./img/icon-compass.png" alt="">East</span>
                </div></div>
            </div> </div> `;
        document.getElementById("forecast").innerHTML = html;
    }
}

function displayAnother(forecastdays) {
    let forecastHtml = "";
    for (let i = 1; i < forecastdays.length; i++) {
        let dayForecast = forecastdays[i];
        forecastHtml += `
        <div class="column " >
            <div class="forecast ">
                <div class="forecast-header">
                    <div class="day text-center pt-1 ">${days[new Date(dayForecast.date.replace(" ", "T")).getDay()]}</div>
                </div>
                <div class="forecast-content pt-5 ">
                    <div class="forecast-icon text-center">
                        <img src="https:${dayForecast.day.condition.icon}" alt="" width="48">
                    </div>
                    <div class="degree text-white text-center pt-5 fs-3">${dayForecast.day.maxtemp_c}<sup>°</sup>C</div>

                    <div class="text-center pt-1 ">${dayForecast.day.mintemp_c}<sup>°</sup></div >
                    <div class="custom2 text-center pt-3 text-info">${dayForecast.day.condition.text}</div>
                </div>
            </div> </div> 


            
            `;
    }
    document.getElementById("forecast").innerHTML += forecastHtml;
}



