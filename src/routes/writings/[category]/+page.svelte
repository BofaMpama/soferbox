<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    const {items} = data;
</script>

<main>
    <h1>{items.length ? items[0].title : 'Category'}</h1>

    <div class="writings-list">
        {#each items as item}
            <a href={`/writings/${$page.params.category}/${item.slug}`}>
                <h2>{item.title}</h2>
            </a>
        {/each}
    </div>
</main>