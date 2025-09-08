<script lang="ts">
    import type {PageData} from './$types';
    export let data: PageData;
    const {poem} = data;

    import {page} from '$app/stores';
    const baseUrl = 'http://soferbox.netlify.app/writings';

    //Svelte reactive statement to get category from URL
    $: category = $page.params.category;
    $: slug = $page.params.slug;

    //full url
    $: fullUrl = `${baseUrl}/${category}/${slug}`;

    //social media share links
    $: twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent('Check out my poem!')}`;
    $: facebookShare = `https://www.facebook.com/sharer/.php?u=${encodeURIComponent(fullUrl)}`;
    $: linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
</script>    

<main>
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    {#if poem}
    <h2>{poem.publishedDate}</h2>
    <h1>{poem.title}</h1>
    <div class="poem-body">
        {@html poem.body}
    </div>    
    {/if}

    <div class="social-media">
        <h1>Share This:</h1> 
       <div>
         <a href="{twitterShare}" target="_blank" rel="noopener noreferrer">Share on X</a>
        <a href="{facebookShare}" target="_blank" rel="noopener noreferrer">Share on Facebook</a>
        <a href="{linkedinShare}" target="_blank" rel="noopener noreferrer">Share on Linkedin</a>

       </div>
    </div>
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
.social-media{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    h1{
        font-size: 24px;
        margin: 0;
        font-weight: bold;
        width: fit-content;
    }
        div{
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }
    a{
        text-decoration: none;
        color: black;
        font-weight: bold;
        border: 2px solid black;
        padding: 10px;
        border-radius: 5px;
        min-width: fit-content;
        transition: background-color 0.3s, color 0.3s;
    }
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