<script>

	import { onMount } from 'svelte';
    import boffInBlue from '$lib/assets/boff-in-a-blue-shirt.png';

    let pills = ['Habbakuk 2:2', 'Psalm 45:1', 'Ecclesiastes 12:10', 'Proverbs 25:11', 'Jeremiah 15:16', 'Psalm 119:11', '2 Timothy 3:16'];

    const pillsColor = document.querySelectorAll('.pill');

    pillsColor.forEach((pill, index) => {
        const hue = (index * 40) % 360; // Change 40 to adjust color spacing
        pill.style.backgroundColor = `hsl(${hue}, 70%, 80%)`;
    });

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
<div class="scripture-section">
    <quote>&OpenCurlyDoubleQuote; My heart is stirred up by a noble theme, to recite these verses for my king...&CloseCurlyDoubleQuote;</quote>
     <div class="pills-container">
        {#each pills as pill}
            <div class="pill">{pill}</div>
        {/each}
    </div>
</div>

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
        width: 100%;
        line-height: 1.6;

    }
    img{
        object-position: 0 80px;
    }

    div{
        font-size: 30px;
        padding: 50px;
        color: rgb(0, 0, 0);
        font-weight: 500;

        quote{
            text-align: center;
            font-style: italic;
                    text-align: center;

        }
    }

    .pills-container{
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
        padding: 20px;
    }
    .pill{
        background: rgb(209, 112, 112);
        padding: 10px 20px;
        border: 3px solid black;
        border-radius: 50px;
        font-weight: 600;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
        transition: transform 0.3s ease;
        cursor: pointer;
    }
    .pill:nth-of-type(odd){
        --rotation: 15deg;
        animation: float 1.8s ease-in-out infinite;

    }
    .pill:nth-of-type(even){
        --rotation: -15deg;
        animation: float 2s ease-in-out infinite;
        animation-delay: 1s;
    }
    .pill:hover{
        transform: scale(1.1);
        background: rgb(90, 109, 138);
    }
    @keyframes float{
        0%, 100%{
            transform: translateY(0) rotate(var(--rotation));
        }
        50%{
            transform: translateY(-10px) rotate(var(--rotation));
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
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        h1{
            font-weight: bolder;
        }
        img{
            margin-top:10%;
        }

    }
</style>
 
   
   