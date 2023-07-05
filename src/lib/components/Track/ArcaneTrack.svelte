<script lang="ts">
	import ActiveStore from '$lib/stores/ActiveStore';
	import { ExpReqArcane } from '$lib/utils';
</script>

{#if $ActiveStore}
	<div class="w-full flex text-center mt-4 font-bold text-lg items-center justify-center">
		<div class="flex flex-col w-[90%] justify-center">
			<div class="w-full h-full flex border-t border-theme-decorated flex-wrap items-center justify-center">
				{#each $ActiveStore.track.arcaneSymbols as symbol}
					{#if symbol.active}
						<div class="flex flex-col w-1/3 m-5 bg-theme-soft border border-theme-base p-2 justify-center items-center">
							<div class="flex justify-center items-center">
								<div class="flex justify-center">
									<img src={symbol.img_url} alt={symbol.name} />
								</div>
								<div class="m-1">{symbol.name}</div>
							</div>
							<div>
								{#if symbol.level == 20}
									<div class="m-1">Lvl: MAX</div>
									<div class="m-1">Exp: MAX</div>
								{:else}
									<div class="m-1">Lvl: {symbol.level}/20</div>
									<div class="m-1">Exp: {symbol.exp}/{ExpReqArcane[symbol.level - 1]}</div>
								{/if}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
{/if}
