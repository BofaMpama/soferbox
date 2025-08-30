<script>
    import penInHand from '$lib/assets/pen-in-hand.png';
    import html from '$lib/assets/html.png';
    import writingsData from '$lib/data/writings.json';


</script>

<section class="sec1 flex items-center justify-between pt-6 pl-4 pr-4 bg-gray-200">
    <div class="flex-col left-side text-black">
        <h1 class="text-7xl font-bold">In this place my words are stored.</h1>
        <p class="text-xl">A virtual box where I store the blessed words I've been inspired to write and share over time.     
</p>
  <button class="border-black border-2 h-13 w-30 text-xl text-white bg-black btn">Explore</button>
    </div>
    <img src="{penInHand}" alt="Pen in the hands of a writer">

</section>
<section class="sec2 bg-gray-500">
        <div class="header font-bold text-5xl">My Writings</div>
        <div class="writing-group">
           {#each writingsData as info}
             <div class="writing-box">
                <h3>{info.title}</h3>
                <p>{info.description}</p>
                <a href="{info.link}"><button>Start reading <span> &rightarrow;</span></button></a>
            </div>
        {/each}
    </div>
</section>
<section class="sec3">
    <div class="box"><div class="line1"></div><div class="line2"></div></div>
    <div class="main-container">
        <h1>Latest Poems</h1>

        <div class="poem-list">
            <div class="poem-box">
                <h3>Once Upon a Time</h3>
                <a href="/"><button>Read</button></a>
            </div>
             <div class="poem-box">
                <h3>Gone too late</h3>
                <a href="/"><button>Read</button></a>
            </div>
             <div class="poem-box">
                <h3>The end from the beginning</h3>
                <a href="/"><button>Read</button></a>
            </div>
             <div class="poem-box">
                <h3>Oxymoron</h3>
                <a href="/"><button>Read</button></a>
            </div>
             <div class="poem-box">
                <h3>What a privilege it is to wait</h3>
                <a href="/"><button>Read</button></a>
            </div>
        </div>
    </div>
    <div class="box"><div class="line1"></div><div class="line2"></div></div>
</section>




<style lang="css">
*{
    margin: 0;
    padding: 0;
}
.sec1{
    padding: 6rem 4rem 4rem 4rem;

    .left-side{
        display: flex;
        flex-direction: column;
        gap: 30px;
        p{
            width: 80%;
        }
        .btn{
            background: rgb(54, 111, 126);
            box-shadow: 4px 4px black;
        }
    }
}

.sec2{
    background: gainsboro;
    display: flex;
    flex-direction: column;
    padding: 10% 5%;
    border-top: 2px solid black;

    .header{
        text-align: left;
       
    }
   
}
    .writing-group{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 32px;
        margin-top: 40px;
    }
    .writing-box{   
        background: #8b5ba1;
        box-shadow: 6px 6px black;
        border: 1px solid black;
        width: 300px;
        height: 350px;
        color: #000;
        border-radius: 30px;
        padding: 32px;
        position: relative;
        h3{
            font-size: 40px;
            font-weight: 600;
            line-height: 40px;
            text-align: left;
        }
        p{
            margin-top: 20px;
            font-size: 16px;
        }

        button{
            background: white;
            border-radius: 30px;
            padding: 10px 15px;
            color: #000;
            font-weight: bold;
            margin-top: 20px;
            position: absolute;
            bottom: 10%;
            display: flex;
            align-items: center;
            justify-content: center;
            span{
                margin-left: 10px;
                font-weight: bolder;
                font-size: 30px;
                line-height: 0;
            }
        }
    }
    .writing-box:nth-of-type(2){
        background: #c9b257;
        color: #fff;
        h3{
            color: #fff;
        }
    }
     .writing-box:nth-of-type(3){
        background: rgb(83, 100, 148);
    }

.sec3{
    height: 100dvh;
    border-top: 2px solid black;
    padding: 20px;
    background: #78a84a;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .box{
        width: 25%;
        height: 100%;
        border: 2px solid black;
        display: flex;
        justify-content: center;
        overflow: hidden;

        .line1{
            height: 100%;
            width: 2px;
            background: #000;
            transform: rotate(30deg);
        }
        .line2{
            height: 100%;
            width: 2px;
            background: #000;
             transform: rotate(-30deg);
        }
    }
}
.main-container{
    h1{
        font-size: 60px;
        font-weight: bold;
    }
}
.poem-list{
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.poem-box{
    height: 50px;
    width: 100%;
    background: white;
    box-shadow: 4px 4px black;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    h3{
        font-size: large;
        font-weight: bold;
    }
    button{
        border: 2px solid rgb(0, 0, 0);
        padding: 3px 7px;
        color: white;
        background: rgb(0, 0, 0);
        border-radius: 10px;
    }
}

@media(max-width: 1100px){
        .sec2{
        justify-content: center;
        align-items: center;
        padding-top: 50px;
        padding-bottom: 50px;
    }
       .writing-group{
        justify-content: center;
    }
    .writing-box{
        justify-content: center;
    }
    .sec3{
        .box{
            width: 12.5%;
        }
    }
}


@media(max-width: 900px){
    .sec1{
        display: block;
        padding-top: 150px;
        padding: 150px 2rem 2rem 2rem;
        p{
            width: 100%;
        }
    }

    
 
   .sec3{
    gap: 50px;
    height: fit-content;
    .box{
        width: 100%;
        height: 50px;

        .line1{
            width: 100%;
            height: 2px;
            transform: rotate(75deg);
        }
    }
    flex-direction: column;
   }
}
</style>