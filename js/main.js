let inputVal = document.querySelector(".input-box");
let Searchbtn = document.querySelector(".btn");
let searchSection = document.querySelector("#search-section");
let climate = document.querySelector("#climate");
let climateDesc = document.querySelector("#climateDesc");
let frontImg = document.querySelector("#frontImg");
let temperature = document.querySelector("#tempSpan");
let pressure = document.querySelector("#pressure");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");

Searchbtn.addEventListener("click", function(){
		objData = {}
		if(inputVal.value != ''){
			// hide search-section
			searchSection.style.display = "none";

			const location = inputVal.value;
			fetch("https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=metric&appid=673565b622408714c5707f15921e868e&",{
				method : 'GET',
			})
			.then((response) => {
				if (!response.ok){
					throw Error(response.status);
				}
				return response.json();
			})
			.then(data => {
				objData = { 
							temperature: data.main.temp,
							pressure: data.main.pressure,
							humidity: data.main.humidity,
							windSpeed: data.wind.speed,
							weather: data.weather[0].main,
							description: data.weather[0].description,
							icon: data.weather[0].icon,
							sunrise: data.sys.sunrise,
							sunset: data.sys.sunset,
							location: data.name,
							id: data.weather[0].id
						};
				display(objData);
			})
			.catch((err) => {
				alert(err);
			})

			function display(objData){
				temperature.innerHTML = objData.temperature;
				pressure.innerHTML = objData.pressure;
				humidity.innerHTML = objData.humidity;
				windSpeed.innerHTML = objData.windSpeed;
				climate.innerHTML = objData.weather.toUpperCase();
				climateDesc.innerHTML = objData.description.toUpperCase();
				// frontImg.src = "http://openweathermap.org/img/wn/"+objData.icon+"@"+objData.id+".png";
				frontImg.src = "http://openweathermap.org/img/wn/"+objData.icon+".png";
			}
		}
});

// TypeError: Cannot set property 'innerHTML' of null