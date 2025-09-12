<script lang="ts">
    import {page} from '$app/stores'; 
    import type { PageData } from './$types';
    export let data: PageData;
    const {items} = data;

    $: category = $page.params.category;
</script>

<main>
    <h1>{category}</h1>

    <div class="writings-list">
        {#each items as item}
            <a href={`/writings/${category}/${item.slug}`}>
                <h2>{item.title}</h2> <span> &rightarrow;</span>
            </a>
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
        background-color: rgb(80, 159, 180);
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        text-transform: capitalize;
        font-weight: bold;
    }

    .writings-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .writings-list a {
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: inherit;
        border: 2px solid #383636;
        background: #ffffff;
        padding: 1rem;
        border-radius: 8px;
        transition: background-color 0.3s, box-shadow 0.3s;
        span{
            font-size: 2.5rem;
            font-weight: bold;
        }
    }

    .writings-list a:hover {
        background-color: #f9f9f9;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .writings-list h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
    }
    

    @media (max-width: 768px) {
        main {
            padding: 2rem 5%;
            padding-top: 120px;
        }

        h1 {
            font-size: 2rem;
        }

        .writings-list h2 {
            font-size: 1.25rem;
        }
    }
    </style>