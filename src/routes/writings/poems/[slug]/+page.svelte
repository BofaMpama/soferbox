<script lang="ts">
    import type { PageProps } from './$types';

    export let data;
    const { poem } = data;
</script>

<article class="prose lg:prose-xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">{poem.title}</h1>
    <div>{@html poem.body}</div>
</article>

<style>
    article {
        margin-top: 10rem;
    }
</style>