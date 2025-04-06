<script lang="ts">

    import { page } from "$app/state";


    let { id, title, link, type="main" } = $props(); 

    let routeid = $derived(page.route.id)
    let lang = $derived(page.params.lang)

    let href = $derived(`/${lang}/${type}/` + link)


</script>


<div id="traverse" class="w-full">
    <a {href}>

        <div class="rounded-xl border dark:border-gray-500 flex items-center justify-between">
            <div id="traverse-img">
                
            </div>

            <div id="traverse-content" class="p-3">
                <h2 class="dark:text-white" >{ id }.</h2>
            </div>

            <div id="traverse-hero">
                <p>{ id }</p>
            </div>
        </div>
    </a>

</div>


<style>
    h2 {
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>