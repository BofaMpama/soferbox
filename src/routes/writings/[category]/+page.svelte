<script lang="ts">
    import {page} from '$app/stores'; 
    import type { PageData } from './$types';
    export let data: PageData;
    const {items} = data;

    $: category = $page.params.category;
</script>

<main>
    <h1>{category}</h1>

    <div class="container">
        
        {#each items as item} 
            <div class="writing-box2">
            <a href={`/writings/${category}/${item.slug}`}>
                <h3>{item.title}</h3> <span> &rightarrow;</span>
            </a>
            </div>

        {/each}
    </div>
</main>

<style>
    main {
        padding: 2rem 20%;
        min-height: 100dvh;
        height: fit-content;
        overflow-y: scroll;
        overflow: hidden;
        padding-top: 150px;
        background-color: rgb(94, 175, 185);
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        text-transform: capitalize;
        font-weight: bold;
    }
    .container{
        display:inline-flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 30px;
    }
      .writing-box2{
          background: #e0faff;
          border: 3px solid black;
        width: 200px;
        height: fit-content;
        color: #000;
        border-radius: 10px;
        padding: 30px;
        position: relative;
        h3{
            font-size: 35px;
            font-weight: bold;
            text-align: left;
        }

        
    } 



    @media (max-width: 768px) {
        main {
            padding: 2rem 5%;
            padding-top: 120px;
        }

        h1 {
            font-size: 2rem;
        }

    }
    </style>