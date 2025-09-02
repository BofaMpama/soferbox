<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from 'svelte';


    type Poem = {
        id: number;
        Title: string;
        Body: string;
        Excerpt: string;
        slug: string;
        Featured: boolean;
        PublishedDate: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };

    let poem: Poem | null = null;
    let slug: string;

  

    onMount(async () => {
        const slug = $page.params.slug;

        const res = await fetch(`http://localhost:1337/api/poems?filters[slug][$eq]=${slug}`);

         const data = await res.json();

       if(data.data.length > 0){
         //Strapi returning an array in data.data
        poem = {
            id: data.data[0].id,
            ...data.data[0].attributes

        } as Poem;
    
       }
        console.log("Fetched poem: ", poem);

    });

   


</script>

{#if poem}
    <article class="poem">
        <h1>{poem.Title}</h1>
        <p><em>{poem.PublishedDate}</em></p>
        <div class="poem-body">
            {@html poem.Body.replace(/\n/g, "<br>")}
        </div>
    </article>
    {:else}
    <p>Loading data...</p>
    {/if}
