<script>
    import chest from '$lib/assets/chest1.png';
    import books from '$lib/assets/books.png';
    import oldBooks from '$lib/assets/old-books.png';
    import handsOnLaptop from '$lib/assets/hands-on-laptop.png';
    import penInHand from '$lib/assets/pen-in-hand.png';
    import writingsData from '$lib/data/writings.json';
	import { onMount } from 'svelte';
    


</script>
  	<div class="section-center">
  		<h1 class="hero-header">A Digital Box for Storing My Treasured Writings. <br><span>By Bofa Mpama</span></h1>
        <img src="{penInHand}" alt="">
        
  	</div>
    <div class="road w-2xl/3 md:w-1/2 mx-auto">
    <h1>Hey There,</h1>
    <h2 id="minorText">
        I used to write in jotters and notebooks. But I often ran out of count on how many books I piled up over the years.
    </h2>
    <img src="{oldBooks}" class="mx-auto" alt="">
    <h2>
        Safe to say, that needed to change. I needed a better way to store all my written works, yes. But also a way to make them accessible for others to read and be blessed by.
    </h2>
  <div class="box-group">
      <div class="box">
        <h1>Before:</h1>
    <img src="{books}" alt="">
    </div>
   <div class="box">
     <h1>Now:</h1>
    <img src="{handsOnLaptop}" alt="">
  </div>
   </div>
    </div>
    <section class="sec1">
        <h3>Start reading</h3>

        <div class="writing-group">
           {#each writingsData as info}
             <div class="writing-box">
                <h3>{info.title}</h3>
                <p>{info.description}</p>
                <a href="{info.link}"><button>Start reading</button></a>
            </div>
        {/each}
            
        </div>
    </section>
    <style>
        
.section-center{
    margin-top: 200px;
    left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 6;
  z-index: -1;
  position: relative;

  img{
    position: fixed;
    width: 300px;
    height: 300px;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%, 40%);
  }

}
.hero-header{
  font-family:  serif;
  font-weight: 800;
  font-size: 3rem;
  border-top: 1px solid #ffeba7;
  border-bottom: 1px solid #ffeba7;
  line-height: 1;
  color: #ffeba7;
    position: fixed;
    text-align: center;
    padding: 1% 5%;
    width: 90%;
    margin-left: 5%;
    top: 25%;

}
span{
     font-size: 20px;
    top: 0px;
    right: 5%;
    width: 100px;
    display: inline;  
    font-family:  serif;
  font-weight: 100;
  font-size: 1.4rem;
  line-height: 1;
  color: #ffeba7;
}

.road{
    position: sticky;
     transform: perspective(200px) rotateX(1.5deg);
  transform-origin: bottom;
  width: 100%;
  border-radius: 20px 20px 0 0;
  background: linear-gradient(rgb(41, 46, 54) 10%, #1f2029);
  background-attachment: fixed;  
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 1px;
  z-index: 111;
 
    #minorText{
            margin-bottom: 40px;
          }
      h1{
        position: initial;
        padding: 50px 0px 0 0;
         font-family:  serif;
  font-weight: 800;
  font-size: 5rem;
  line-height: 1;
  color: #ffeba7;
  text-align: center;
  margin-bottom: 20px;
    padding: 5% 5% 5% 0;
    top: 35%;
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

.box-group{
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 150px;
    margin-top: 100px;
}
.box-group > *{
    flex-grow: 1;
}
.box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}
.box:nth-of-type(1){
    opacity: 0.4;
}
.box:nth-of-type(2){
    position: sticky;
}
.box img{
    aspect-ratio: 16/16;
}
.sec1{
    height: 400px;
    width: 100%;
    position: relative;
    z-index: 200;
    height: fit-content;
    padding: 50px;
    background: #c2c196;
    border-radius: 30px;

    h3{
        font-size: 60px;
        font-weight: bold;
        text-align: center;
        z-index: 10;
        color: black;
        font-family: serif;
    }
    .writing-group{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 100px;
        margin-top: 40px;
    }
    .writing-box{   
        background: #a1975b;
        width: 300px;
        height: 350px;
        color: #000;
        border-radius: 30px;
        padding: 30px;
        position: relative;
        h3{
            font-size: 40px;
            text-align: left;
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
        }
    }
    .writing-box:nth-of-type(2){
        background: #1f1e1a;
        color: #fff;
        h3{
            color: #fff;
        }
    }
     .writing-box:nth-of-type(3){
        background: rgb(133, 110, 84);
    }

}


@media(max-width: 1000px){
    .section-center{
        img{
            transform: translate(-50%, 55%);
            width: 250px;
            height: 250px;
        }
    }
    h1{
        font-size: 5rem;
    }
}
@media(max-width: 600px){
   
    h1{
        font-size: 3em;
    }
    .road{
          transform: perspective(200px) rotateX(0.2deg);
          width: 100%;
          position: relative;

        
          img{
            width: 250px;
            
            left: 50%;
          }
    }
    .box-group{
        gap: 100px;
    }
    .writing-box{
        height: 350px;
        bottom: 10%;
    }
}

    </style>