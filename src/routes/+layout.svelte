<script>
	import '../app.postcss';
	import Clock from './components/Clock.svelte';
</script>

<nav class="flex  w-full font-bold text-center capitalize justify-center text-slate-300">

	<div class="flex w-3/6 bg-slate-600 m-2 rounded-lg p-1 drop-shadow-lg">

		<div class="p-3 uppercase rounded-lg">
			gmstracker
		</div>

		<div class="p-3 uppercase rounded-lg">
			<Clock/>
		</div>
		
		<ul class="flex flex-row ml-auto">
			<a href="/">
				<li class="p-2 m-1 hover:bg-slate-500 rounded-lg duration-200">
					dashboard
				</li>
			</a>
			
			<a href="characters">
				<li class="p-2 m-1 hover:bg-slate-500 rounded-lg duration-200">
					characters
				</li>
			</a>
			
			<a href="events">
				<li class="p-2 m-1 hover:bg-slate-500 rounded-lg duration-200">
					events
				</li>
			</a>

			<a href="simulate">
				<li class="p-2 m-1 hover:bg-slate-500 rounded-lg duration-200">
					simulate
				</li>
			</a>
		</ul>
	</div>
</nav>

<style>
	:root {
		background-color: #2E3442;
	}
</style>
	
<slot />
