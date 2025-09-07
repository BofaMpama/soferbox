<script lang="ts">
    import type {PageData} from './$types';
    export let data: PageData;
    const {poem} = data;
</script>    

<main>
    {#if poem}
    <h2>{poem.publishedDate}</h2>
    <h1>{poem.title}</h1>
    <div class="poem-body">
        {@html poem.body}
    </div>    
    {/if}
</main>    

<style>
    *{
        background: rgb(213, 236, 231);
    }
main{
    padding: 5% 20%;
    padding-top: 150px;
}
h2{
    font-family: monospace;
    font-size: 14px;
}
h1{
    font-size: 50px;
    font-weight: bold;
    border-top: 2px solid black;
    border-bottom: 2px solid black;

}
.poem-body{
    margin-top: 40px;
    font-family: monospace;
    font-size: 18px;
    word-spacing: 3px;
    
}
@media (max-width: 768px) {
    main{
        padding: 5% 10%;
        padding-top: 150px;
    }
    h1{
        font-size: 36px;
    }
}
</style>