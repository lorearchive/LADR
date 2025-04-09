<script lang=ts>
    import type { PageProps } from './$types';
    import { page } from '$app/state';

    let { data }: PageProps = $props();
    const headingNo = data.post.dir;
</script>

<h1>Volume {headingNo}</h1>

<div id="dirList">
    {#each data.post.contents as item}
        <div id="directoryItem" class="border-2 my-4 border-r-md p-4 dark:border-gray-200">
            <a class="h-full" href={page.url.pathname + "/" + item.name.slice(8)}>{item.name}</a>
        </div>
    {/each}
</div>



<style>
    h1 {
        color: white;
        font-size: 2.2em;
        line-height: 1.4;
        border-left: 5px solid #2563eb;
        padding-left: .5em;
        margin: 1em 0 1em 0;
    }
</style>