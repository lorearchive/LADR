<script lang=ts>
    import type { PageProps } from './$types';
    import { page } from '$app/state';

    let { data }: PageProps = $props();
    const headingNo = data.post.dir;

</script>

<h1>Chapter {headingNo}</h1>

<div id="dirList">
    {#each data.post.contents as item}
        {#if item.name.includes("-")} <!-- is sector two? -->
            <div id="dirItem">
                <a href={page.url.pathname + "/" + item.name.slice(8).slice(0, 2) + "-" + item.name.slice(20)} >{item.name}</a>
                <!-- the slice first removes the "Episode " from the name, then gets the first two char - the ep no. -->
                 <!-- the addition slices everything from the start and leaves the sector out -->
            </div>
        {:else}
            <div id="dirItem">
                <a href={page.url.pathname + "/" + item.name.slice(8)}>{item.name}</a>
            </div>
        {/if}

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

    #dirItem {
        border: whitesmoke 1px solid;
        border-radius: 5px;
        margin: 2em 0;
    }


    a {
        color: white;
        display: block;
        height: 100%;
        width: 100%;
    }
</style>