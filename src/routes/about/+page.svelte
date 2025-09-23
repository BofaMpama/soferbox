<script>

	import { onMount } from 'svelte';
    import boffInBlue from '$lib/assets/boff-in-a-blue-shirt.png';


</script>

<section class="sec1 flex items-center justify-between pr-4 bg-gray-200">
    <div class="left-side">
        <h1>About The Author</h1>
         <div class="right-side"> 
     <p>My name's Bofa. I'm a Christian whose faith struggles to remain silent. I must give expression to the thoughts, beliefs, convictions, and ideas that dwell within me. This blog is the digital scroll on which I write.</p>
    </div>
    </div>
    <img src={boffInBlue} alt="">
   

</section>
<section>
    <quote>&OpenCurlyDoubleQuote; My heart is stirred up by a noble theme, to recite these verses for my king...&CloseCurlyDoubleQuote;</quote>
</section>
<style>
    section{
        min-height: fit-content;
        height: fit-content;

        background: rgb(226, 224, 203);
        display: flex;
        gap: 10px;
                 text-align: left;

    }
    .left-side{
        flex: 1;
        padding-left: 50px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: flex-start;
        justify-content: center;

    }
 
    h1{    
        font-weight: 900;
        font-size: 60px;
        font-weight: bold;
        letter-spacing: 10px;
        color: rgb(230, 74, 74);
        text-transform: uppercase;
    }
    p{
        font-size: 20px;
        line-height: 1.6;

    }
    img{
        object-position: 0 80px;
    }

    section:nth-of-type(2){
        font-size: 30px;
        font-style: italic;
        text-align: center;
        padding: 50px;
        color: rgb(100, 100, 100);
        font-weight: 500;

        quote{
            text-align: center;
        }
    }
    @media(max-width: 1100px){
        section{
            img{
                object-position: 0 0px;
            }
        }
    }

    @media(max-width: 900px){
        .left-side{
            padding-left: 0px;
        }
        h1{
            font-weight: bolder;
        }
        img{
            margin-top:10%;
        }

    }
</style>
 
   
   