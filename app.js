
const form = document.getElementById("timer");
const minsInput = document.getElementById("mins");
const stop=document.getElementById("pause");
const countdown = document.getElementById("countdown");
const alarmSound = document.getElementById("alarm-sound");

let intervalId = null;
let secs = 0;
let isPaused = false;
let startTime = null;
let endTime = null;
let remainingTime = 0;


stop.addEventListener("click", ()=>{

    if (stop.textContent === "Пауза") {
        if(intervalId){
            clearInterval(intervalId);
            isPaused = true;
            intervalId = null;
        }
        isPaused = true;
        remainingTime = endTime - Date.now();

        stop.textContent = "Сброс";
    } else {
        isPaused = false;
        secs = 0;
        clearInterval(intervalId);
        intervalId = null;
        countdown.style.display = "none";
        minsInput.value = "";
        minsInput.style.display = "inline-block";
        stop.textContent = "Пауза";
        countdown.textContent = "";
    }

})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (isPaused) {
        secs = Math.floor(remainingTime / 1000);
    }


    else{
        const mins = parseInt(minsInput.value, 10);
        if (isNaN(mins) || mins<= 0) return;
        secs = mins*60
        remainingTime = secs * 1000;
    }

    startTime = Date.now();
    endTime = startTime+secs*1000;

    isPaused = false;
    stop.textContent = "Пауза";

    minsInput.style.display = "none";
    countdown.style.display = "block";

    updateDisplay();

    intervalId = setInterval(() =>  {
        const remaining = Math.max(0, Math.floor((endTime - Date.now())/1000));
        if (remaining <= 0) {

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
    const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    const  minOut = Math.floor(remaining/ 60);
    const  secsOut = remaining%60;
    countdown.textContent = `${minOut}:${secsOut < 10 ? '0' : ''}${secsOut}`;
}





