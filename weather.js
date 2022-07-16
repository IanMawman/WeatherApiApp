const apiKey= "1ca17162e4a515a79b97d6d5b4837af3"; // api key for open weathermap

const form = document.querySelector(".headings form"); 
const input = document.querySelector(".headings input");
const msg = document.querySelector(".headings .msg");
const list = document.querySelector(".appending .cities"); 
// this gets all the content from the form to search for the city


form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;
  
    //check if there's already a city inputted
    const listItems = list.querySelectorAll(".appending.city");
    const listItemsArray = Array.from(listItems);
  
  
  
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`; // here is the basevalue of the openweathermap api and gets the api key inputted at the top of this file 
  
    fetch(url) // this fetches the data from the api
      .then(response => response.json())
      .then(data => {
        const { main, name, sys, weather, wind  } = data; // this is the data we are looking for from the api
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
          weather[0]["icon"]
        }.svg`;
  
        const li = document.createElement("li"); // this creates a list of the items we want to show  
        li.classList.add("city"); // the line below shows the layout of how the searched cities will appear and with what data inside each section
    
        
        const markup = `
        
      
          <span><h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
          </h2>
          <div class="city-temperature">${Math.round(main.temp)}<sup>C</sup></div> 
          <figure>
          <div class="temp-feels">Feels like:${Math.round(main.feels_like)}<sup>C</sup></div>
          <div class="city-windspeed">Average Wind Speed:${Math.round(wind.speed)}Mph</div>
            <img class="city-icon" src="${icon}" alt="${
          weather[0]["description"]
        }">
            <figcaption>${weather[0]["description"]}</figcaption>
          </figure>
        </body> </span>  `;
       
        // math.round enables you to have a whole number when outputting them temp and average wind sppeds
        li.innerHTML = markup; 
        list.appendChild(li);
      })
      .catch(() => {
        msg.textContent = "This is not a valid city"; // this happens when you do not enter a city that is recognized
      });
  
    msg.textContent = "";
    form.reset();
    input.focus();
  });


  // remove item on click
 
  // add to github 