<script lang="ts">
    import { onMount } from "svelte";
    
    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const TWOHOUR_MS = 7200000
    
    let time_slot1 = new Date().setHours(18,0,0,0);
    let time_slot2 = new Date().setHours(1,0,0,0);
    let active_slot;
    $: ursus = {timer: "...", golden: false}

    onMount(() => {
        const timerId = setInterval(() => {
            let date = new Date();
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

            // When the countdown hit the mark, it will start the 2 hour mark, and then proceed to the next countdown
            active_slot = time_slot1
            let gap = active_slot - date.getTime();

            if ((gap+TWOHOUR_MS) < 0) {
                active_slot = time_slot2;
                gap = active_slot - date.getTime();
                
                if ((gap+TWOHOUR_MS) < 0) {
                    let time_nextday = new Date()
                    time_nextday.setDate(date.getDate()+1)
                    time_nextday.setHours(1,0,0,0)
                    gap = time_nextday.getTime() - date.getTime();
                }
            }

            let showHours = Math.floor((gap%DAY)/HOUR);
            let formattedHours = showHours.toString().padStart(2, '0')

            let showMinutes = Math.floor((gap%HOUR)/MINUTE);
            let formattedMinutes = showMinutes.toString().padStart(2, '0')

            let showSeconds = Math.floor((gap%MINUTE)/SECOND);
            let formattedSeconds = showSeconds.toString().padStart(2, '0')
            ursus.timer = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

            if (date.getTime() >= active_slot && date.getTime() <= (active_slot+TWOHOUR_MS)){
                gap = (active_slot+TWOHOUR_MS) - date.getTime()

                showHours = Math.floor((gap%DAY)/HOUR);
                formattedHours = showHours.toString().padStart(2, '0')

                showMinutes = Math.floor((gap%HOUR)/MINUTE);
                formattedMinutes = showMinutes.toString().padStart(2, '0')

                showSeconds = Math.floor((gap%MINUTE)/SECOND);
                formattedSeconds = showSeconds.toString().padStart(2, '0')
                
                ursus.golden = true;
                ursus.timer = `Golden Time ends in ${formattedHours}:${formattedMinutes}:${formattedSeconds}`
                        
            } else {
                ursus.golden = false;
                ursus.timer = `Golden Time starts in ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
            }

        }, 1000);
        return () => {
        clearInterval(timerId);
        };
    });
</script>


{#if ursus.golden}
    <div class=" text-yellow-300">    
        Ursus {ursus.timer}
    </div>
{:else}
<div class=" text-slate-300">    
    Ursus {ursus.timer}
</div>
{/if}