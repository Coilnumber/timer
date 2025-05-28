
const form = document.getElementById("timer");
const minsInput = document.getElementById("mins");
const stop=document.getElementById("pause");
const countdown = document.getElementById("countdown");
const alarmSound = document.getElementById("alarm-sound");

let intervalId = null;
let secs = 0;
let isPaused = false;

stop.addEventListener("click", ()=>{
    if(intervalId){
        clearInterval(intervalId);
        isPaused = true;
        intervalId = null;
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(!isPaused){
        const mins = parseInt(minsInput.value, 10);
        if (isNaN(mins) || mins<= 0) return;
        secs = mins*60
    }

    isPaused = false;
    minsInput.style.display = "none";
    countdown.style.display = "block";

    updateDisplay();

    intervalId = setInterval(() =>  {
        secs--;
        if (secs < 0) {
            clearInterval(intervalId);
            intervalId = null;
            countdown.textContent = 'Время вышло';
            alarmSound.play();

            minsInput.style.display = "inline-block";
            minsInput.value = "";
            countdown.style.display = "none";
            secs = 0;
            return;
        }
        updateDisplay();
    }, 1000);
})

function updateDisplay(){
    const  minOut = Math.floor(secs/ 60);
    const  secsOut = secs%60;
    countdown.textContent = `${minOut}:${secsOut < 10 ? '0' : ''}${secsOut}`;
}



