<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    let hours = "00";
    let minutes = "00";
    let seconds = "00";

    let timer = 0;
    let reminder = 1;
    let interval: any = null;

    let prevHour = 0;
    let prevMinutes = 0;
    let prevSeconds = 0;

    const startTimer = () => {
        if (interval) return
        interval = setInterval(trainingTimer, 1000);
    }

    const stopTimer = () => {
        clearInterval(interval)
        interval = null;
    }

    const resetTimer = () => {
        stopTimer();
        timer = 0;
        reminder = 1;
        hours = "00";
        minutes = "00";
        seconds = "00";
    }

    const trainingTimer = () => {
        timer++
        
        if (timer == reminder) {
            let span1 = document?.querySelector("#popup-header1")
            let span2 = document?.querySelector("#popup-header2")
            if (span1 !== null && span2 !== null) {
                console.log("working")
                span1.classList.add("buff-warning")
                span2.classList.add("buff-warning")
                reminder += 900
            }
        }

        let showH = document?.querySelector("#show-hours") as HTMLDivElement;
        let showM = document?.querySelector("#show-minutes") as HTMLDivElement;
        let showS = document?.querySelector("#show-seconds") as HTMLDivElement;

        let Xhours = Math.floor(timer/3600)
        hours = Xhours.toString().padStart(2, '0')
        
        let Xminutes = Math.floor((timer - (Xhours * 3600)) / 60)
        minutes = Xminutes.toString().padStart(2, '0')

        let Xseconds = timer % 60;
        seconds = Xseconds.toString().padStart(2, '0')


        if (prevHour != Xhours) showH.classList.add("timer-pop")

        if (prevMinutes != Xminutes) showM.classList.add("timer-pop")

        if (prevSeconds != Xseconds) showS.classList.add("timer-pop")

        prevHour = Xhours
        prevMinutes = Xminutes
        prevSeconds = Xseconds

        setTimeout(function() {
        showH.classList.remove("timer-pop")
        showM.classList.remove("timer-pop")
        showS.classList.remove("timer-pop")
        }, 200);
    }
    
    const showPopup = () => {
        let TrainPopup = document?.querySelector("#train-popup");
        let TrainOverlay = document?.querySelector("#train-overlay");

        if (TrainPopup !== null && TrainOverlay !== null) {
            TrainPopup.className = "flex flex-col text-center w-[25%] bg-slate-600 rounded-lg drop-shadow-lg"
            TrainOverlay.className = "overlay"
        }
    }

    const closePopup = () => {
        let TrainPopup = document?.querySelector("#train-popup");
        let TrainOverlay = document?.querySelector("#train-overlay");

        if (TrainPopup !== null && TrainOverlay !== null) {
            TrainPopup.className = "hidden"
            TrainOverlay.className = "hidden"
        }
    }
    
    onDestroy(() => {
        resetTimer();
    })

</script>

<div id="train-overlay" class="hidden">
    <div id="train-popup" class="hidden">

        <div class="flex justify-center">
            <div class="font-bold text-4xl text-slate-300 ml-30 w-[90%] flex flex-col max-h-[2.7rem] overflow-hidden">
                <span id="popup-header1">TRAINING</span>
                <span id="popup-header2" class="flex text-red-300 ml-5">
                    <svg class="w-10 mt-auto mr-2 text-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                    POP YOUR BUFFS !
                </span>
            </div>
            <!-- <h3 class="font-bold text-4xl text-slate-300 ml-30 w-[90%]">TRAINING</h3> -->
            <button on:click={closePopup} class="absolute top-0 right-0 rounded-full m-2 bg-gray-500 text-white active:scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6">
                    <path fill-rule="evenodd" d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.93 2.93a1 1 0 11-1.414-1.414L8.586 10l-2.93-2.93a1 1 0 111.414-1.414L10 8.586l2.93-2.93a1 1 0 111.414 1.414L11.414 10l2.93 2.93a1 1 0 010 1.416z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <div class="text-slate-300 font-bold text-lg mt-2">

            <div class="flex">
                <span class="ml-[6rem]">Hours</span>
                <span class="ml-[3.5rem]">Minutes</span>
                <span class="ml-[3rem]">Seconds</span>
            </div>

            <div class="flex w-full justify-center">
                <div class="bg-slate-900 rounded-lg mb-2 text-6xl flex items-center w-[75%] p-3 justify-evenly">
                    <div id="show-hours">{hours}</div>
                    <span>:</span>
                    <div id="show-minutes">{minutes}</div>
                    <span>:</span>
                    <div id="show-seconds">{seconds}</div>

                </div>
            </div>
            
            <div class="flex m-2 justify-center">
                <button on:click={startTimer} class="ml-4 font-bold text-2xl bg-slate-700 rounded-lg p-3 hover:bg-gray-800 duration-200 active:scale-90">
                    <svg class="w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                </button>
    
                <button on:click={stopTimer} class="ml-4 font-bold text-2xl bg-slate-700 rounded-lg p-3 hover:bg-gray-800 duration-200 active:scale-90">
                    <svg class="w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
                </button>
    
                <button on:click={resetTimer} class="ml-4 font-bold text-2xl bg-slate-700 rounded-lg p-3 hover:bg-gray-800 duration-200 active:scale-90">
                    <svg class="w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/></svg>
                </button>
            </div>

        </div>
    </div>
</div>

<div class="flex w-9/12">
    <button on:click={showPopup} class="bg-green-300 m-2 p-2 ml-auto rounded-lg font-bold capitalize hover:bg-green-400 duration-200 active:scale-90">
        <svg class="w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
    </button>
</div>

<style>

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
    }

</style>