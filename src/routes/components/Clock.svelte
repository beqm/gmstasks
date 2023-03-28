<script>
    import { onMount } from "svelte";

    let date = new Date();
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    $: time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`

    onMount(() => {
      const timerId = setInterval(() => {
        let date = new Date();
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
        time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`

      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    });

</script>

{time}