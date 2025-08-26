<script>
    import chest from '$lib/assets/chest1.png';
    import books from '$lib/assets/books.png';
	import { onMount } from 'svelte';
    let majorText;

    const handleScroll = () => {
        majorText.style.top = window.screenY * 0.5 + 'px';
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

</script>
  	<div class="section-center">
  		<h1 class="">A digital box for my treasured words.</h1>
  	</div>
    <div class="road w-2xl/3 md:w-1/2 mx-auto">
    <h1 bind:this={majorText}>Hey There,</h1>
    <h2 id="minorText">
        I used to write in jotters and notebooks. But I often ran out of count on how many books I piled up over the years.
    </h2>
    <img src="{books}" class="mx-auto" alt="">
    <h2>
        Safe to say, that needed to change. I needed a better way to store all my written works, yes. But also a way to make them accessible for others to read and be blessed by.
    </h2>
    <h2>
        <b>The solution:</b> Digitalize my writings to make sure I can always keep track of all I write. The only thing left is for you too...
    </h2>
    </div>
    <section class="sec1"></section>
    <style>
        
.section-center{
    margin-top: 200px;
    left: 0;
  width: 100%;
  z-index: 6;
  z-index: -1;
  position: relative;
}
h1{
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 7rem;
  line-height: 1;
  color: #ffeba7;
  text-align: center;
  -webkit-text-stroke: 2px #ffeba7;
  text-stroke: 2px #ffeba7;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  color: transparent;
  margin-bottom: 20px;
    position: fixed;
    padding: 0 5%;
    top: 35%;

}

.road{
     transform: perspective(200px) rotateX(3deg);
  transform-origin: bottom;
  width: 100%;
  margin-top: 100dvh;
  border-radius: 20px 20px 0 0;
  background: linear-gradient(rgb(41, 46, 54) 10%, #1f2029);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 1px;
  z-index: 111;
 

      h1{
        position: initial;
        padding: 50px 0px 0 0;
        left: 0;
    }
    h2{
    color: #ffeba7;
    font-size: 30px;
    text-align: center;
    width: 80%;
    margin-left: 10%;
    margin-top: 40px;
}
img{
    width: 400px;
}
}
.sec1{
    width: 100%;
    height: 400px;
    background: #1f2029;

}

@media(max-width: 1000px){
    h1{
        font-size: 5rem;
    }
}
@media(max-width: 600px){
    h1{
        font-size: 3em;
    }
}

    </style>