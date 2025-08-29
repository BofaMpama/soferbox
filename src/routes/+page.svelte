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
    padding: 5% 5%;

    .header{
        text-align: left;
       
    }
   
}
    .writing-group{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        gap: 32px;
        margin-top: 40px;
    }
    .writing-box{   
        background: #8b5ba1;
        box-shadow: 6px 6px black;
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




@media(max-width: 900px){
    .sec1{
        display: block;
        padding-top: 150px;
        padding: 150px 2rem 2rem 2rem;
        p{
            width: 100%;
        }
    }
    .sec2{
        justify-content: center;
    }
    .writing-box{
        justify-content: center;
    }
}
</style>