var srch_btn = document.querySelector('#searchbutton');
var srch_box = document.querySelector('#searchbox');
var wind_label = document.getElementById('windspeed');
var temp_label = document.getElementById('temperature');
var humd_label = document.getElementById('humidity');
var cloud_label = document.getElementById('cloud_desc');
var image_label = document.getElementById('weather_image');

// console.log(image_label);

let apik = 'fe07b00c62a633eb6e6c1934da01c21a';

function tempConv(val)
{
    return(val - 273.15).toFixed(2);
}

srch_btn.addEventListener('click',function()
{
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+srch_box.value+'&appid=fe07b00c62a633eb6e6c1934da01c21a').then(res=>res.json())

    .then(data=>
        {
            var temp = data['main']['temp'];
            var humd = data['main']['humidity'];
            var wind = data['wind']['speed'];
            var clouds = data['weather'][0]['description'];
            var cloud_perc = data['clouds']['all'];
            // console.log(tempConv(temp));
            // console.log(humd);
            // console.log(cloud_perc);

            wind_label.innerHTML = wind+' knts';
            temp_label.innerHTML = tempConv(temp)+' C';
            humd_label.innerHTML = humd+' %';
            cloud_label.innerHTML = clouds;
            if(cloud_perc>=0 && cloud_perc<11)
            {
                image_label.src = "sun.png";
            }
            else if(cloud_perc>=11 && cloud_perc<25)
            {
                image_label.src = "few clouds.png";
            }
            else if(cloud_perc>=25 && cloud_perc<50)
            {
                image_label.src = "scattered clouds.png";
            }
            else if(cloud_perc>=50 && cloud_perc<84)
            {
                image_label.src = "broken clouds.png";
            }
            else if(cloud_perc>=84 && cloud_perc<=100)
            {
                image_label.src = "overcast clouds.png";
            }
        })
    .catch(err =>alert("Wrong city name"))
})