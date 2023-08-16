<script lang="ts">
	import MainStore from '$lib/stores/MainStore';
	import { ExpReqArcane } from '$lib/utils/validation';
</script>

{#if $MainStore.active}
	<div class="w-full flex text-center mt-4 font-bold text-lg items-center justify-center">
		<div class="flex flex-col w-[90%] justify-center">
			<div class="w-full h-full flex flex-wrap items-center justify-center">
				{#if $MainStore.active.level < 200}
					<div class="mt-10">Level has not met minimum requirements</div>
				{/if}
				{#each [...$MainStore.active.track.arcanes.values()] as symbol}
					{#if symbol.active}
						<div class="flex flex-col w-1/3 m-5 border border-theme-base p-2 justify-center items-center">
							<div class="flex justify-center items-center">
								<div class="flex justify-center">
									<img src={symbol.img_url} alt={symbol.name} />
								</div>
								<div class="sm:m-1">{symbol.name}</div>
							</div>
							<div>
								{#if symbol.level == 20}
									<div class="sm:m-1">Lvl: MAX</div>
									<div class="sm:m-1">Exp: MAX</div>
								{:else}
									<div class="sm:m-1">Lvl: {symbol.level}/20</div>
									<div class="sm:m-1">Exp: {symbol.exp}/{ExpReqArcane[symbol.level - 1]}</div>
								{/if}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
{/if}
