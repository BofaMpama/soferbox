<script lang="ts">
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
        <h1 class="text-5xl font-bold">Recent Stories</h1>
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




<style lang="css">
*{
    margin: 0;
    padding: 0;
}
.sec1{
    padding: 0;
    min-height: 100dvh;
    background: rgb(80, 159, 180);

    .left-side{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 30px;
        padding: 0 5% 0 5%;
        min-height: 100%;
        width: 50%;

        h1{
            padding-top: 100px;
            text-shadow: 4px 4px #ffffff;
        }
        p{
            width: 80%;
        }
        .btn{
            background: rgb(255, 255, 255);
            box-shadow: 4px 4px rgb(0, 0, 0);
            margin-bottom: 0px;
            color: black;
        }
    }
    img{
        width: 50%;
        height: 100%;
        object-fit: cover;
        border-left: 2px solid black;
        border-bottom: 2px solid black;
    }
}
.about{
    background: rgb(0, 0, 0);
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5%;

    h1{
        font-size: 60px;
        font-weight: bold;
        width: 30%;
    }
   .right-side{
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 65%;

    p{
        font-size: 18px;
        line-height: 30px;
    }
    button{
        width: fit-content;
        padding: 10px 20px;
        border: 2px solid white;
        background: transparent;
        color: white;
        font-weight: bold;
        box-shadow: 4px 4px white;
        border-radius: 10px;
    }
   }
}

.sec2{
    background: gainsboro;
    display: flex;
    flex-direction: field;
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
    }
    .writing-box{   
        background: rgb(224, 180, 95);
        border: 1px solid black;
        flex: 1;
        height: 350px;
        color: #000;
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
            border-radius: 10px;
            padding: 10px 15px;
            color: #000;
            border: 2px solid black;
            box-shadow:  2px 2px black;
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
        background: rgb(218, 92, 92);
    }
     .writing-box:nth-of-type(3){
        background: rgb(103, 66, 121);
    }






   .sec4{
    background: rgb(203, 214, 226);
    padding: 10% 5%;
    border-top: 2px solid black;

    .container{
        margin-top: 40px;
        width: 100%;
        height: fit-content;
        display: flex;
        gap: 30px;
        overflow-x: scroll;
        scrollbar-width: 10px;
        scrollbar-color: black white;
        scroll-padding: 10px;
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
        scroll-snap-align: start;
        scroll-initial-target: 0;
    }
    .card{
        width: 300px;
        min-width: 300px;
        height: 200px;
        border: 4px solid black;
        border-radius: 0px;
        padding: 10px;
        position: relative;
        margin-bottom: 20px;

        h1{
            height: 110px;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 30px;
            font-family: monospace;
            font-weight: bolder;
            padding: 0 0 10px 0;
        }
        button{
            margin-left: auto;
            position: absolute;
            bottom: 0;
            right: 0;
            height: 50px;
            width: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            border: 2px 2 solid black;
            border-radius: 0;
            font-weight: bold;
        }
    }
   }     
   .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
   }
   .nav-buttons{
  
    button{
        font-size: 20px;
        font-weight: bold;
        text-decoration: underline;
        display: flex;
        align-items: center;
        gap: 10px;
        span{
        font-size: 30px;
        font-weight: bolder;
        display: none;
        }
    }
   }

   

@media(max-width: 1100px){
    .sec1{
        padding:0;

        h1{
            font-size: 60px;
            line-height: 60px;
        }
    }
    img{
        height: 100%;
    }
    
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
    
}


@media(max-width: 900px){
    .sec1{
        display: block;
        min-height: fit-content;
        padding-top: 150px;
    

        .left-side{
            width: 100%;
            align-items: center;
            text-align: center;
            padding: 0 5% 5% 5%;
            h1{
                font-size: 50px;
                line-height: 50px;
                padding-top: 0;
            }
            p{
                width: 100%;
                margin: auto;
            }
            .btn{
                margin: auto;
                margin-bottom: 50px;
                
            }
        }
         img{
            width: 100%;
            height: 300px;
            border-left: none;
            border-top: 2px solid black;
        }
        p{
            width: 100%;
        }

        img{
            width: 100%;
            height: 300px;
            border-left: none;
            border-top: 2px solid black;
        }
    }
    .about{
        flex-direction: column;
        text-align: center;
        gap: 30px;
        padding: 15% 5%;
        h1{
            font-size: 40px;
            line-height: 40px;
            width: 100%;
        }
        .right-side{
            width: 100%;
            p{
                font-size: 16px;
                line-height: 28px;
            }
            button{
                margin: auto;
            }
        }
    }

    .sec2{
        display: flex;
        flex-direction: column;
    }
    .writing-group{
        flex-direction: column;
        margin-top: 40px;
        position: relative;
    }
    .writing-box{
        width: 100%;
        min-height: 300px;
        position: sticky;
        top: 100px;
     
    }
   
    
 

   
}
</style>