<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h1 class="text-2xl font-bold mb-4">Poems</h1>
<div class="poems-grid">
  {#each data.poems as poem}
    <div class="poem-card">
      <a href="/poems/{poem.slug}">
        <h2>{poem.title}</h2>
      </a>
    </div>
  {/each}
</div>
