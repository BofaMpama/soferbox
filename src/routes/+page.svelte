<script>
    import penInHand from '$lib/assets/pen-in-hand.png';
    import html from '$lib/assets/html.png';
    import writingsData from '$lib/data/writings.json';
    import stories from '$lib/data/stories.json';


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
                <a href="{info.link}"><button class="button-style1">Start reading <span> &rightarrow;</span></button></a>
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
        <button class="read-more button-style2">See More <span> &rightarrow;</span></button>
    </div>
    <div class="box"><div class="line1"></div><div class="line2"></div></div>
</section>
<section class="sec4">
    <div class="header">
        <h1 class="text-5xl font-bold">Recent Stories</h1>
        <div class="nav-buttons">
            <button class="left"><span>&leftarrow;</span></button>
            <button class="right"><span>&rightarrow;</span></button>
        </div>
    </div>

    <div class="container">
        {#each stories as story}
            <div class="card">
            <img src="{story.image}" alt="">
            <h1>{story.heading}</h1>
           <a href="{story.link}"> <button>Read</button></a>
        </div>
        {/each}
    </div>
</section>




<style lang="css">
*{
    margin: 0;
    padding: 0;
}
.sec1{
    padding: 6rem 4rem 4rem 4rem;
    background: rgb(149, 168, 173);

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

      
    }
      .button-style1{
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
    padding: 10% 5%;
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
        position: relative;

    }
    .box::before, .box::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
     
    }
    .box::before{
        transform: rotate(45deg);
        border: 2px solid black;
    }
    .box::after{
        transform: rotate(-45deg);
        border: 2px solid black;
  
    }
}
.main-container{
    h1{
        font-size: 60px;
        font-weight: bold;
        line-height: 60px;
        margin-bottom: 40px;

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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 1em;
        flex-grow: 1;
    }
    button{
        border: 2px solid rgb(0, 0, 0);
        padding: 3px 7px;
        color: white;
        background: rgb(0, 0, 0);
        border-radius: 10px;
    }
}
 .button-style2{
            background: white;
            border-radius: 10px;
            padding: 10px 15px;
            border: 1px solid black;
            box-shadow:  2px;
            color: #000;
            font-weight: bold;
            margin-top: 20px;
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

   .sec4{
    background: rgb(174, 165, 184);
    padding: 10% 5%;
   }     
   .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
   }
   .nav-buttons{
    display: flex;
    gap: 20px;
    button{
        padding: 0px 10px;
        border: 2px solid black;
        span{
        font-size: 30px;
        font-weight: bolder;
        }
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
    padding: 5%;
    .box{
        width: 100%;
        height: 50px;

       
    }
    flex-direction: column;
   }
}
</style>