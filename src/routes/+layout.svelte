<script lang="ts">
	import '../app.css';
	import { fly } from 'svelte/transition';

    import Header from '$lib/components/Header.svelte';

	let { data, children } = $props();

</script>

<div id="ladr-header">
	<Header />
</div>

<div id="ladr-window">
    {#key data.url}
        <div id="ladr-window-animate" in:fly={{x: 200, duration: 210, delay: 100}} out:fly={{ x:-200, duration: 210}}> <!-- animation will probably change to motion.dev -->
            <main class="min-h-screen w-4xl">
                {@render children()}
            </main>
        </div>
    {/key}
</div>
