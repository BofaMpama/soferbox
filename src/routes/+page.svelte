<script lang="ts">
    import '../lib/css/homepage.css';
    import penInHand from '$lib/assets/pen-in-hand.png';
    import scrollMan from '$lib/assets/scroll.jpg';
    import boff from '$lib/assets/boff-blue.png';
    import html from '$lib/assets/html.png';
    import retro from '$lib/assets/retro3.jpg';
    import writingsData from '$lib/data/writings.json';
    import type { PageData } from './$types';
    export let data: PageData;

    const { poems, stories } = data;

</script>

<section class="sec1 flex items-center justify-between pr-4 bg-gray-200">
    
    <div class="flex-col left-side text-black">

        <h1 class="text-7xl font-bold text-shadow-teal-800">        <p class="popout">
	<span>In</span>
	<span>This</span>
	<span>Place</span><br>
	<span>My</span>
	<span>Words</span>
	<span>Are</span><br>
	<span>Stored</span>
	
</p>

        
        </h1>
        <p class="text-xl">A virtual box where I store the blessed words I've been inspired to write and share over time.     
</p>
  <button class="border-black text-xl text-white bg-black btn">Start Reading</button>
    </div>
    <img src={boff} alt="Pen in the hands of a writer">

</section>
<section class="about">
    <h1>About The Author</h1>
   <div class="right-side"> 
    <p>My name's Bofa. I'm a Christian whose faith struggles to remain silent. I must give expression to the thoughts, beliefs, convictions, and ideas that dwell within me. This blog is the digital scroll on which I write.</p>
    <button>More About The Author</button>
</div>
</section>
<section class="sec2 bg-gray-500" >
    <img src={retro} alt="retro background">
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
       
    </div>

    <div class="container"> 

           {#each poems as poem}
             <div class="writing-box2">
                <h3>{poem.title}</h3>
                <a href={`/writings/poems/${poem.slug}`}><button>Start reading</button></a>
            </div>
        {/each}
            

    </div>
 <div class="nav-buttons">

            <a href={`/writings/poems/`}>
            <button class="right">Read More<span>&rightarrow;</span></button></a>
        </div>
    
       
</section>
<section class="stories-section">
<div class="left">
        <h1>Short Stories I've Been Writing...</h1>
    <p>Click on any story to start reading.</p>
</div>
    

    <div class="stories-container">    
        {#each stories as story}
         <div class="story-box">
            <a href={`/writings/stories/${story.slug}`}>
                {#if story.coverImage}
             <img src={story.coverImage} alt={story.title} loading="lazy">       
                {/if}
            <div class="text-box">
                <h2>{story.title}</h2>
            </div> 
            <button>Start reading</button>
        </div>
        {/each}   
        <div class="nav-buttons">
           <a href={`/writings/stories/`}>
            <button class="right">There's More<span>&rightarrow;</span></button></a>
        </div>       
    </div>
</section>    
<section class="blog-section">
    <h1 class="text-5xl font-bold">From The Blog</h1>
    <div class="blog-container">
        <div class="blog-box">
            <div class="text-box">
                <h2>Learning to Grow; Understanding What I'm Becoming</h2>
                <p>Not that I want to be a child forever; nor that I'm in a hurry to grow old. But I'm learning that even as growth is inevitable, the process should be one that is appreciated at every stage...</p>
                <button>Read More <span>&RightArrow;</span></button>
            </div>
        </div>
         <div class="blog-box">
            <div class="text-box">
                <h2>Learning to Grow; Understanding What I'm Becoming</h2>
                <p>Not that I want to be a child forever; nor that I'm in a hurry to grow old. But I'm learning that even as growth is inevitable, the process should be one that is appreciated at every stage...</p>
                <button>Read More <span>&RightArrow;</span></button>
            </div>
        </div>
         <div class="blog-box">
            <div class="text-box">
                <h2>Learning to Grow; Understanding What I'm Becoming</h2>
                <p>Not that I want to be a child forever; nor that I'm in a hurry to grow old. But I'm learning that even as growth is inevitable, the process should be one that is appreciated at every stage...</p>
                <button>Read More <span>&RightArrow;</span></button>
            </div>
        </div>
</section>    

<style lang="scss">
$t: 1s;
$d: 0.08em;
$n: 3;
$e: cubic-bezier(0.860, 0.000, 0.070, 1.000); 
$front: black;
$back: rgb(255, 255, 255);
html{
	background: white;
}

.popout{
	font-family: Poppins, sans-serif;
	font-weight: 900;
    width: 100%;
    display: inline;
	

	@keyframes ani{
		0%{
			transform: translate3d(0,0,0);
			text-shadow: 0em 0em 0 $back;
			color: $front;
		}
		30%{
			transform: translate3d(0,0,0);
			text-shadow: 0em 0em 0 $back;
			color: $front;
		}
		70%{
			transform: translate3d($d,-$d,0);
			text-shadow: -$d $d $back;
			color: $front;
		}
		100%{
			transform: translate3d($d,-$d,0);
			text-shadow: -$d $d $back;
			color: $front;
		}
	}
	span{
		position: relative;
		display: inline-block;
		animation: ani $t infinite alternate $e;
		@for $i from 1 through $n{
			&:nth-last-child(#{$i}n){ animation-delay: -$t*$i/$n/2;}
		}
	}
	
}
</style>


