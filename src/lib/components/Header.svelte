<script lang="ts">

	import { page } from "$app/state";
	import { LangStore } from "../state/lang.svelte";

	let lang = LangStore.lang
	let routeid = $derived(page.route.id!.split("/").map((item, index) => index === 1? lang : item).join("/"))
	// Swaps out the [lang] for the current lang global state value

</script>


<nav class="flex justify-between border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400 z-40 h-full">
	<ul class="mx-auto flex flex-wrap items-end">
		<li id="ladr-header-li" class:active={routeid === `/${lang}/home`}>
			<a href={`/${lang}/home`} class="h-full flex flex-col justify-center" data-sveltekit-preload-data="hover">Home</a>
		</li>
		<li id="ladr-header-li" class:active={routeid!.startsWith(`/${lang}/main`)}>
			<a href={`/${lang}/main`} class="h-full flex flex-col justify-center"  data-sveltekit-preload-data="hover">Main Story</a>
		</li>
	</ul>
</nav>

<style>
    nav {
        overflow-y: hidden;
    }
</style>