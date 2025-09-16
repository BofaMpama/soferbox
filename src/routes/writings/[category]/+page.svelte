<script lang="ts">
    import {page} from '$app/stores'; 
    import type { PageData } from './$types';
    import '$lib/css/homepage.css';
    import retro from '$lib/assets/retro3.jpg';

    export let data: PageData;
    const {items} = data;

    $: category = $page.params.category;
</script>

<main>
   <div class="category-background">
     <h1 class="header">{category}
    </h1>
     <img src="{retro}" alt="category background" class="background">

   </div>
    <div class="container">
        
        {#each items as item} 
            <div class="writing-box2">
            <a href={`/writings/${category}/${item.slug}`}>
                <h3>{item.title}</h3>
                <button>Start reading</button>
            </a>
            </div>

        {/each}
    </div>
</main>

<style>
    main {
        
        min-height: 100dvh;
        height: fit-content;
        overflow-y: scroll;
        overflow: hidden;
        padding-top: 90px;
        background: rgb(226, 224, 203);
    }

    .category-background{
        min-width: 100%;
        height: 40dvh;
        position: relative;
        top: 0;
    }
    h1 {
        font-family: "Bungee", sans-serif;        font-weight: 900;
        font-style: normal;
        font-size: 100px;
         text-align: left;
        font-size: 100px;
        font-weight: bold;
        letter-spacing: 15px;
        color: rgb(230, 74, 74);
        text-shadow: 7px 7px black;
        text-decoration: italic;
        text-transform: uppercase;
        z-index: 11;
        left: 2%;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        
    }
    .background{
        width: 100%;
        min-height: 100%;
        height: 100%;
        object-fit: cover;
        top: 0;
        z-index: 1;
        position: absolute;
    }
   
        
    



    @media (max-width: 768px) {

        h1 {
            font-size: 4rem;
        }

    }
    </style>