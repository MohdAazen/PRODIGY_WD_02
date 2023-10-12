const playButton = document.getElementsByClassName("play")[0];
        const lapButton = document.getElementsByClassName("lap-b")[0];
        const resetButton = document.getElementsByClassName("reset")[0];
        const clearButton = document.getElementsByClassName("lap-clear-button")[0];
        const minutes = document.getElementsByClassName("minute")[0];
        const second = document.getElementsByClassName("second")[0];
        const centiSecond = document.getElementsByClassName("milisecond")[0];
        const laps = document.getElementsByClassName("laps")[0];
        const bg = document.getElementsByClassName("outer-circle")[0];

        let isPlay =false;
        let minCounter=0;
        let min;
        let secCounter=0;
        let sec;
        let centiSecCounter=0;
        let centiSec;
        let isReset = false;
        let lapItem = 0;

        const toggleButton = ()=>{
            lapButton.classList.remove("hidden");
            resetButton.classList.remove("hidden");
        }
        const play = ()=>{
            if(!isPlay && !isReset)
            {
                playButton.innerHTML ="Pause";
                bg.classList.add("animation-bg");
                min = setInterval(()=>{
                        minutes.innerHTML = `${++minCounter} :`;
                        },60*1000);
                sec = setInterval(()=>{
                    if(secCounter === 60)
                    {
                        secCounter=0;
                    }
                        second.innerHTML = secCounter<9? `&nbsp; 0${++secCounter} :`:`&nbsp; ${++secCounter} :`;
                        },1000);
                centiSec = setInterval(()=>{
                    if(centiSecCounter === 100)
                    {
                        centiSecCounter=0;
                    }
                        centiSecond.innerHTML =centiSecCounter<10? `&nbsp; 0${++centiSecCounter}`:`&nbsp; ${++centiSecCounter}`;
                        },10);
                isPlay = true;
                isReset =true;
            }
            else{
                playButton.innerHTML ="Play";
                clearInterval(min);
                clearInterval(sec);
                clearInterval(centiSec);
                isPlay = false;
                isReset=false;
                bg.classList.remove("animation-bg");
            }
            toggleButton();
        }

        const reset =()=>{
            isReset =true;
            play();
            lapButton.classList.add("hidden");
            resetButton.classList.add("hidden");
            minutes.innerHTML="0 :";
            second.innerHTML="&nbsp;0 :";
            centiSecond.innerHTML="&nbsp;0";
            secCounter =0;
            minCounter = 0;
            centiSecCounter=0;
            clearAll();
        }

        const lap =()=>
        {
            const li = document.createElement("li");
            const number = document.createElement("span");
            const timeStamp = document.createElement("span");

            li.setAttribute("class","lap");
            number.setAttribute("class","number");
            timeStamp.setAttribute("class","time-stamp");
            number.innerText=`${++lapItem}`
            
            timeStamp.innerHTML=`${minCounter} : ${secCounter} : ${centiSecCounter}`;
            li.append(number,timeStamp);
            laps.append(li);

            clearButton.classList.remove("hidden");
        }


        const clearAll =()=>
        {
            laps.innerHTML='';
            laps.append(clearButton);
            clearButton.classList.add("hidden");
            lapItem=0;
        }
        playButton.addEventListener("click",play);
        resetButton.addEventListener("click",reset);
        lapButton.addEventListener("click",lap);
        clearButton.addEventListener("click",clearAll);