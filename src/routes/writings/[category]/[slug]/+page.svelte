<script lang="ts">
    import type {PageData} from './$types';
    export let data: PageData;
    const {poem, extraPoems} = data;

    import {page} from '$app/stores';
    const baseUrl = 'http://soferbox.netlify.app/writings';

    //Svelte reactive statement to get category from URL
    $: category = $page.params.category;
    $: slug = $page.params.slug;

    //full url
    $: fullUrl = `${baseUrl}/${category}/${slug}`;

    //social media share links
    $: twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent('Check out my poem!')}`;
    $: facebookShare = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(fullUrl)}`;
    $: linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
    $: whatsappShare = `https://wa.me/?text=${encodeURIComponent(`Check out this poem! ${fullUrl}`)}`;
</script>    

{#key slug}
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
        <h1>Share <i class="fas fa-share-nodes"></i>

</h1> 
       <div>
         <a href="{twitterShare}" target="_blank" rel="noopener noreferrer"><i class="fab fa-x-twitter"></i> Twitter</a>
        <a href="{facebookShare}" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i> Facebook</a>
        <a href="{linkedinShare}" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i> Linkedin</a>
        <a href="{whatsappShare}" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i> WhatsApp</a>

       </div>
    </div>

    <div class="more">
        <h1>More to read</h1>

        <div class="more-poems-container">
            {#each extraPoems as extraPoem}
                <div class="more-poem">
                    <a href={`/writings/poems/${extraPoem.slug}`} sveltekit:prefetch>{extraPoem.title} <span>&rightarrow;</span></a>
                </div>
                <hr>
            {/each}
        </div>
    </div>    
</main>  
{/key}
  
  

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
    border-top: 3px solid black;
    border-bottom: 3px solid black;

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
        border: none;
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
.more{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 50px;
    h1{
        font-size: 44px;
        margin-top: 10px;
        font-weight: bold;
        border: none;
        width: fit-content;
        background: none;
    }
}
.more-poems-container{
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgb(243, 240, 240);
    border: 3px solid black;
    padding: 20px;
    border-radius: 10px;
}
 .more-poem{
        margin-top: 10px;
        background: none;
        padding: 10px 0;
        min-width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        a{
            text-decoration: none;
            font-size: 20px;
            color: black;
            font-weight: bold;
            background: none;
            padding: 10px 0;
            min-width: fit-content;
            min-width: 100%;
            transition: background-color 0.3s, color 0.3s;

            span{
                font-size: 24px;
                font-weight: bold;
                margin-left: auto;
                background: none;
            }
        }
        a:hover{
            background: black;
            color: white;
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