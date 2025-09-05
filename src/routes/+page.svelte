<script lang="ts">
    import '../lib/css/homepage.css';
    import penInHand from '$lib/assets/pen-in-hand.png';
    import scrollMan from '$lib/assets/scroll.jpg';
    import html from '$lib/assets/html.png';
    import writingsData from '$lib/data/writings.json';
    import stories from '$lib/data/stories.json';

    import { onMount } from "svelte";
    export let data;
    const { poems } = data;

</script>

<section class="sec1 flex items-center justify-between pr-4 bg-gray-200">
    <div class="flex-col left-side text-black">
        <h1 class="text-7xl font-bold text-shadow-teal-800">In this place my words are stored.</h1>
        <p class="text-xl">A virtual box where I store the blessed words I've been inspired to write and share over time.     
</p>
  <button class="border-black border-2 h-13 w-30 text-xl text-white bg-black btn">Explore</button>
    </div>
    <img src={scrollMan} alt="Pen in the hands of a writer">

</section>
<section class="about">
    <h1>About The Author</h1>
   <div class="right-side"> 
    <p>My name's Bofa. I'm a Christian whose faith struggles to remain silent. I must give expression to the thoughts, beliefs, convictions, and ideas that dwell within me. This blog is the digital scroll on which I write.</p>
    <button>More About The Author</button>
</div>
</section>
<section class="sec2 bg-gray-500">
        <div class="header font-bold text-5xl">My Writings</div>
        <div class="writing-group">
           {#each writingsData as info}
             <div class="writing-box">
                <h3>{info.title}</h3>
                <p>{info.description}</p>
                <a href={info.link}><button class="button-style1">Start reading <span> &rightarrow;</span></button></a>
            </div>
        {/each}
    </div>
</section>

<section class="sec4">
    <div class="header">
        <h1 class="text-5xl font-bold">Recent Poems</h1>
        <div class="nav-buttons">

            <button class="right">Read More<span>&rightarrow;</span></button>
        </div>
    </div>

    <div class="container">
        {#each poems as poem}
            <div class="card">
            <h1 class="font-bold">{poem.title}</h1>
           <a href={`/writings/poems/${poem.slug}`}> <button>Read More <span>&rightarrow;</span></button></a>
        </div>
        {/each}
    </div>
</section>



