const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
// without Id
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button'); 

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date; //its a function
let countdownActive; // object for storing active countdown

// for local storage(object created save countdown)
let saveCountdown;

let second = 1000; // millisecond
const minute = second * 60;
const hour = minute * 60;
const day = hour* 24;

// to get today's date we set "new date()". toISOString() method: biggest value to smallest ie yyyy-mm....
// set minimum input
const today = new Date().toISOString().split('T')[0];
// console.log(today);
dateEl.setAttribute('min', today);

// populate countdown / complete UI


function updateDOM(){
    //set interval method method calls a function at specified intervals
    countdownActive = setInterval(() =>{
    const now = new Date().getTime();
    // console.log('aaaa',now);
    const distance = (countdownValue - now);
    // console.log('distance', distance);

    const days = Math.floor(distance/day);
    const hours = Math.floor((distance % day) / hour);
    const mins = Math.floor((distance%hour) / minute);
    const secs = Math.floor((distance% minute)/second);
        // hide input box
    inputContainer.hidden = true;

    // console.log(days, hours, mins, secs);
        console.log(distance);
    // if countdown has ended, show complete
        if(distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }else{
    // populate countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    // span elements are present in form of array (li in html, query selector used)
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${mins}`;
    timeElements[3].textContent = `${secs}`;
     // hide 1st container and show second
    completeEl.hidden = true;
    countdownEl.hidden = false;
        }
   
    
    
}, second);
}



// Update Countdown functin, e just represents event
function updateCountdown(e){
    // without storing data anywhere page will refresh
    // use event and prevent defaut method : cancels the form from submitting
    e.preventDefault();
    countdownTitle= e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    // storing title and date in SavedCount Object
    saveCountdown = {
        title: countdownTitle,
        date : countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(saveCountdown));   //stores as [object, object] need to stringify to convert object to string and to retrive it we will need to convert it back to object from string using parse function.

     

    // console.log(countdownTitle, countdownDate);
    // console.log(countdownTitle);
    // console.log(countdownDate);
    countdownValue = new Date(countdownDate).getTime();
    // .getTime() returs time in milli seco after 1 jan 1970
    // console.log(countdownValue);
    // Populate Countdown
    if(countdownDate === ''){
        alert("Please fill the Date");
    }else{
       updateDOM();
    }
}


// reset countdown
function reset(e){
    // console.log(e);
    completeEl.hidden = true;
       //hide countdown and show input
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    // stop the countdown
    clearInterval(countdownActive);
    // reset values
    countdownTitle='';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

//load from previous storage
function restorePreviousCountdown(){
    // get countdown from localstorage if available and parse it back to object.
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        saveCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = saveCountdown.title;
        countdownDate = saveCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}


// Event Listner
// on a form button of type submit helps to catch data from input
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click',reset);

//onload
restorePreviousCountdown();