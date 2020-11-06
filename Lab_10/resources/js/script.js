//helper functions
var dayOfWeek = "";
function formatDate(date, month, year)
{
  month = (month.length < 2) ? ('0' + month) : month;
  date = (date.length < 2)? ('0' + date) : date;
  return [year,month,date].join('-');
}
function getDayofWeek(date, month, year){
  var week_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayOfWeek =  week_names[new Date([month,date,year].join('-')).getDay()];
}
function getFarenheitTemp(temp){
  return (9*temp/5)+32;
}

//run when the document object model is ready for javascript code to execute

	$.ajax({
  url: 'https://api.weatherstack.com/current',
  data: {
    access_key: '5bc82451636190abd9d7afe6fe9b20b5',
    query: 'Boulder'
  },
  dataType: 'json',
  success: function(apiResponse) {
    console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
	var temp = apiResponse.current.temperature;
	temp = getFarenheitTemp(temp);
	var ico = apiResponse.current.weather_icons;
	console.log(`ico is ${apiResponse.current.weather_icons}`);
	document.getElementById("image_today").innerHTML = ico;
	var heading = apiResponse.location.name
  document.getElementById("temp_today").innerHTML = temp;
  var thermo = (temp/100)*350;
  document.getElementById("thermometer_inner").style.height = thermo+"px";
  document.getElementById("heading").innerHTML = 'Weather today- ' + heading;
  var precip = apiResponse.current.precip;
   document.getElementById("precip_today").innerHTML = precip + '%';
   var humi = apiResponse.current.humidity;
   document.getElementById("humidity_today").innerHTML = humi + '%';
   var wind = apiResponse.current.wind_speed;
   document.getElementById("wind_today").innerHTML = wind;
   var summ = apiResponse.current.weather_descriptions;
   document.getElementById("summary_today").innerHTML = summ;
   var time = apiResponse.location.localtime;
   document.getElementById("local_time").innerHTML = time;
  }
  
});



    /*
      Read the current weather information from the data point values [https://weatherstack.com/documentation] to
      update the webpage for today's weather:
      1. image_today : This should display an image for today's weather.
               This will use the icon that is returned by the API. You will be looking for the weather_icons key in the response.

      2. location: This should be appended to the heading. For eg: "Today's Weather Forecast - Boulder"

      3. temp_today : This will be updated to match the current temperature. Use the getFarenheitTemp to convert the temperature from celsius to farenheit.

      4. thermometer_inner : Modify the height of the thermometer to match the current temperature. This means if the
                   current temperature is 32 F, then the thermometer will have a height of 32%.  Please note,
                   this thermometer has a lower boundary of 0 and upper boundary of 100.

      5. precip_today : This will be updated to match the current probability for precipitation. Be sure to check the unit of the value returned and append that to the value displayed.

      6. humidity_today : This will be updated to match the current humidity percentage (make sure this is listed as a
                percentage %)

      7. wind_today : This will be updated to match the current wind speed.

      8. summary_today: This will be updated to match the current summary for the day's weather.

    */
    //helper function - to be used to get the key for each of the 5 days in the future when creating cards for forecasting weather
    function getKey(i){
        var week_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
        dayOfWeek=week_names[new Date(Object.keys(data.forecast)[i]).getDay()];
        return data.forecast[Object.keys(data.forecast)[i]];
    }
    /* Process the daily forecast for the next 5 days */

	$.ajax({
  url: 'https://api.weatherstack.com/forcast',
  data: {
    access_key: '5bc82451636190abd9d7afe6fe9b20b5',
    query: 'Boulder',
	forecast_days : 6
  },
  dataType: 'json',
  success: function(apiResponse) {
    var c = 0;
	var div = document.createElement("div");
	div.class = "card";
	div.class = "card-body";
	div.id = "day1";
	div.style.width = "50px";
	div.style.height = "50px";
	//div.innerHTML = toString(getKey(0));
	while(c < 5){
	console.log(apiResponse.forcast)
	c++;
	}
	document.getElementById("5_day_forecast").appendChild(div);
  }
  
});

    /*
      For the next 5 days you'll need to add a new card listing:
        1. The day of the week
        2. The temperature high
        3. The temperature low
        4. Sunrise
        5. Sunset

      Each card should use the following format:
      <div style="width: 20%;">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><!-- List Day of the Week Here --></h5>
            <p class="card-text">High:<!--List Temperature High --> <br>
              Low: <!-- List Temperature Low --><br>
              Sunrise: <!-- List Time of Sunrise --><br>
              Sunset: <!-- List Time of Sunset --></p>
          </div>
        </div>
      </div>

      <Hint1 - To access the forecast data> You need to make sure to carefully see the JSON response to see how to access the forecast data. While creating the key to access forecast data make sure to convert it into a string using the toString() method.

      <Hint2 - To add the cards to the HTML> - Make sure to use string concatenation to add the html code for the daily weather cards.  This should
      be set to the innerHTML for the 5_day_forecast.
    */
  //})
//});
