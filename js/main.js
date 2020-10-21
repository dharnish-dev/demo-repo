let inputVal = document.querySelector(".input-box");
let Searchbtn = document.querySelector(".btn");

Searchbtn.addEventListener("click", function(){
		if(inputVal.value != ''){
			const location = inputVal.value;
			fetch("https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=673565b622408714c5707f15921e868e",{
				method : 'GET'
			})
			.then((response) => {
				if (!response.ok){
					throw Error(response.status);
				}
				return response.json();
			})
			.then(data => {
				alert(data.main.temp);
			})
			.catch((err) => {
				alert(err);
			})
		}
});