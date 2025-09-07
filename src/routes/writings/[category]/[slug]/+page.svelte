<script lang="ts">
    import type {PageData} from './$types';
    export let data: PageData;
    const {poem} = data;
</script>    

<main>
    {#if poem}
    <h1>{poem.title}</h1>
    <div class="poem-body">
        {@html poem.body}
    </div>    
    {/if}
</main>    

<style>
main{
    padding: 10%;
}
h1{
    margin-top: 100px;
    font-size: 50px;
    font-weight: bold;
}
.poem-body{
    margin-top: 40px;
}
</style>