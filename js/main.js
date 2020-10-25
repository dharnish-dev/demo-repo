let inputBox = document.querySelector(".input-box");
let Searchbtn = document.querySelector(".btn");
let searchSection = document.querySelector("#search-section");
let climate = document.querySelector("#climate");
let climateDesc = document.querySelector("#climateDesc");
let frontImg = document.querySelector("#frontImg");
let backImg = document.querySelector("#backImg");
let temperature = document.querySelector("#tempSpan");
let pressure = document.querySelector("#pressure");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");
let cardSection = document.querySelector("#card-section");
let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");
let place = document.querySelector("#place");
let body = document.querySelector("body");
let headerText = document.querySelector("#headerText");
let otherLocationBtn = document.querySelector(".other-location-btn")

// Event for PRESS ENTER KEY
inputBox.addEventListener("keyup", function(event){
	if (event.keyCode === 13) {
		event.preventDefault();
		Searchbtn.click();
	}
});

// Click Event 
Searchbtn.addEventListener("click", display);

// Display Function
function display(){
	objData = {}
	// if(inputBox.value != ''){
	
		//Change background color
		body.style.backgroundColor = "#FFFFFF";
		// Change header h1 color
		headerText.style.color = "#6081FC"	
		// hide search-section
		searchSection.classList.add("hidden");
		// remove hidden class from cardSection
		cardSection.classList.remove("hidden");
		// remove hidden class from btn inside header
		otherLocationBtn.classList.remove("hidden");

		const location = inputBox.value;

		if(!inputValidation(location)) {
			// Fetch Data from openweathermap
			fetch("https://api.openweathermap.org/data/2.5/weather?q="+ location.toLowerCase() +"&units=metric&appid=673565b622408714c5707f15921e868e&",{
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
						
						};
				display(objData);
			})
			.catch((err) => {
				alert(err);
			})

			// display function - write innerHTML
			function display(objData){
				temperature.innerHTML = objData.temperature;
				pressure.innerHTML = objData.pressure;
				humidity.innerHTML = objData.humidity;
				windSpeed.innerHTML = objData.windSpeed;
				climate.innerHTML = objData.weather.toUpperCase();
				climateDesc.innerHTML = objData.description.toUpperCase();
				frontImg.src = "http://openweathermap.org/img/wn/"+objData.icon+".png";
				backImg.src = "http://openweathermap.org/img/wn/"+objData.icon+".png";
				sunrise.innerHTML = objData.sunrise;
				sunset.innerHTML = objData.sunset;
				place.innerHTML = objData.location.toUpperCase();
			}
		// }
		}
}
// Header button
otherLocationBtn.addEventListener("click", goBack)

// Go Back Function
function goBack(){
	// Make input text empty
	inputBox.value = "";
	// add hidden class to cardSection
	cardSection.classList.add("hidden");
	// add hidden class to button header
	otherLocationBtn.classList.add("hidden");
	// remove hidden class from search section
	searchSection.classList.remove("hidden");
	//Change background color
	body.style.backgroundColor = "#6081FC";
	// Change header h1 color
	headerText.style.color = "#FFFFFF";
}

function inputValidation(location){ 
	if (isEmpty(location)) {
		alert('empty');

	} else {
		let pattern = /[a-z][^.*+\-?^${}()|[\]\/!@#%^&><~'`"]/g;
		let result = pattern.test(location);
		return result;
	}
}

function isEmpty(inputVal) {
	if (inputVal === undefined || inputVal === null) {
		return true;
	} else {
		inputVal = inputVal.trim();
		return inputVal.length == 0;
	}
}