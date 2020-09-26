/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();



//get user data (Zipcode,feelings) called by generate
const btn =document.getElementById('generate');

const action = async () =>{
  //set weather api url & apiKey
  const url ="http://api.openweathermap.org/data/2.5/weather?"
  const apiKey = "2d1745756e1f2fc74430bffdf7be77f3"
  //get user data zip & feelings
  const zip =document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  //get weather data using user Zipcode
  const dataWeather = await getWeather(url, zip, apiKey);
  //variable for temp.
  const temp = dataWeather.main.temp;
  try {
    //when all ready create data object to carry all data
    const data = {
      temp : temp,
      date : newDate,
      content : feelings
    }
    //make post request
    const postURL = '/post';
    const getURL = '/get'
    postData(postURL,data).then(getData(getURL));


  }
  catch (e) {
    console.log("error: " + e);

  }

}
//get data from weather api
const getWeather = async (url,zip,apiKey) =>{
  const response = await fetch(url + "zip=" + zip + "&appid=" + apiKey);

  try {
        const dataWeather = await response.json();
        return dataWeather;
  }

  catch (e) {
    console.log("error: "+ e);

  }

}

//make a post function to post to Server
const postData = async (url='' , data = {}) =>{
  const request = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

    try {
      const newData = await request.json();
      return newData;
    }
    catch(error) {
      console.log("error", error);
    }
}

//get function to get latest data from server
const getData = async (url) => {
  const response = await fetch(url);
  try {
    const data = await response.json();
    const date = data.date;
    const temp = data.temp;
    const content = data.content;
    updateUI(date,temp,content);

  }
  catch (e) {

    console.log("error: " + e);
  }

}

//function to dynamically update UI
const updateUI = (date, temp, content) => {

  //update date div
  document.getElementById("date").innerHTML = "Date: " + date;
  //update temp div
  document.getElementById("temp").innerHTML = "Temprature: " + temp + " K";
  //update content div
  document.getElementById("content").innerHTML = "Feelings: " + content;
  //scroll to view
  document.getElementById("entryHolder").scrollIntoView({                 //scroll to view
      behavior: 'smooth'
    });
}

//addEventListener to btn generate
btn.addEventListener('click',action);
