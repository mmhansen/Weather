$(document).ready(function(){  
var localWeather = {};
  var appID = "8f345b3ba2839e634b35984924705823";
  // call ipinfo to get some location information
 
  
  $.getJSON("http://ipinfo.io/", function(data){
  // let's take a look at what ipinfo returns
  // console.log(data)  
 var coords = data.loc.split(",");
 localWeather.city = data.city;
 localWeather.state = data.region;
 localWeather.country = data.country;
 localWeather.latitude = coords[0];
 localWeather.longitude = coords[1];
    
    var weatherQuery = "http://api.openweathermap.org/data/2.5/weather?lat=" + localWeather.latitude + "&lon=" + localWeather.longitude + "&appid=" + appID;
    $.getJSON(weatherQuery, function(query){
      
     
      
      localWeather.description = query.weather[0].description;
      localWeather.icon = query.weather[0].icon;
      localWeather.id = query.weather[0].id;
      
      localWeather.humidity = query.main.humidity;
      localWeather.temp = query.main.temp;
      localWeather.tempMax = query.main.temp_max;
      localWeather.tempMin = query.main.temp_min;
      localWeather.sunrise = query.sys.sunrise;
      localWeather.sunset = query.sys.sunset;
      localWeather.wind = query.wind.speed;
      
      
      
      display();
    })
    
  });
   

  function display(){
    //console.log(localWeather);
  
  var sunrise = new Date(localWeather.sunrise*1000);
  sunrise = sunrise.toLocaleString().split(",");
  sunrise = sunrise[1].slice(0,5);
  
  var sunset = new Date(localWeather.sunset*1000);
  sunset = sunset.toLocaleString().split(",");
  sunset = sunset[1].slice(0,5);
  
  var currentTime = new Date();
  currentTime = currentTime.getHours() ;
    
  console.log(sunrise+" AM, "+sunset+" PM "+currentTime);
  
  localWeather.tempC = Math.floor(localWeather.temp - 273.15)
  localWeather.tempF = Math.floor(localWeather.temp * 9/5 - 459.67)
  // wind mph
  localWeather.windF = Math.ceil(localWeather.wind*2.2);
  // wind kph
  localWeather.windC = Math.ceil(localWeather.wind*3.6);
  
  console.log(localWeather)
    
  $('.status').html("<p class='city'>"+localWeather.city+"</p>"+
                    "<p class='description'>"+localWeather.description+"</p>");
  $('.min').html(localWeather.tempMinF);
  $('.max').html(localWeather.tempMaxF);
  $('.current').html(localWeather.tempF+'&deg;F')
  $('.details').html('<p>Wind Speed: '+localWeather.windF+" mph</p>"+
                     "<p> Humidity: "+localWeather.humidity+'%'+'</p>')
     
  var F = true;
  
  $('.current').click(function(){
    if(F){
      $('.current').html(localWeather.tempC+'&deg;C')
      $('.details').html('<p>Wind Speed: '+localWeather.windC+" kph</p>"+
                     "<p> Humidity: "+localWeather.humidity+'%'+'</p>');
      F = false;
    } else {
      $('.current').html(localWeather.tempF+'&deg;F');
      $('.details').html('<p>Wind Speed: '+localWeather.windF+" mph</p>"+
                     "<p> Humidity: "+localWeather.humidity+'%'+'</p>');
      F = true
    }
  })
  var icon;
    
  switch(true){
    case (localWeather.icon == "01d"):
        icon = "http://openweathermap.org/img/w/01d.png";
        break;
    case (localWeather.icon == "02d"):
        icon = "http://openweathermap.org/img/w/02d.png";
        break;
      
    case (localWeather.icon == "03d"):
        icon = "http://openweathermap.org/img/w/03d.png";
        break;
   case (localWeather.icon == "04d"):
        icon = "http://openweathermap.org/img/w/04d.png";
        break;
   case (localWeather.icon == "09d"):
        icon = "http://openweathermap.org/img/w/09d.png";
        break;
   case (localWeather.icon == "10d"):
        icon = "http://openweathermap.org/img/w/10d.png";
        break;
   case (localWeather.icon == "11d"):
        icon = "http://openweathermap.org/img/w/11d.png";
        break;
   case (localWeather.icon == "13d"):
        icon = "http://openweathermap.org/img/w/13d.png";
        break;
   
    case (localWeather.icon == "01n"):
        icon = "http://openweathermap.org/img/w/01n.png";
        break;
    case (localWeather.icon == "02n"):
        icon = "http://openweathermap.org/img/w/02n.png";
        break;
    case (localWeather.icon == "03n"):
        icon = "http://openweathermap.org/img/w/03n.png";
        break;
   case (localWeather.icon == "04n"):
        icon = "http://openweathermap.org/img/w/04n.png";
        break;
   case (localWeather.icon == "09n"):
        icon = "http://openweathermap.org/img/w/09n.png";
        break;
   case (localWeather.icon == "10n"):
        icon = "http://openweathermap.org/img/w/10n.png";
        break;
   case (localWeather.icon == "11n"):
        icon = "http://openweathermap.org/img/w/11n.png";
        break;
   case (localWeather.icon == "13n"):
        icon = "http://openweathermap.org/img/w/13n.png";
        break;
      
  }
    
    console.log(icon);
      
      $('.status').append("<img src="+icon+" />")
  //end function
  };    
})



