<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<main>
  {#if data.poem}
    <h1>{data.poem.title}</h1>
    
    <div class="poem-body">
      {@html data.poem.body}
    </div>
  {:else}
    <p>Poem not found.</p>
  {/if}
</main>

<style>
  /* You can add CSS here to style your rendered HTML elements */
  .poem-body :global(p) {
    font-size: 1.1em;
    line-height: 1.6;
    margin-bottom: 1.5em;
  }
  .poem-body :global(h2) {
    margin-top: 2em;
    color: #333;
  }
</style>