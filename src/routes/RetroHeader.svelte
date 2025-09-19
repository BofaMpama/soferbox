
<script>
    import hamburger from '$lib/assets/burger.png';

    	let show = false;

</script>

<header class="flex justify-between gap-8 items-center px-6 py-3 bg-gray-100">
    <div class="logo text-5xl text-black">
        <a href="/">SoferBox</a>
    </div>
    <nav class="text-xl  text-black font-bold flex gap-4">
        <a href="/writings/poems">Poems</a>
        <a href="/writings/stories">Stories</a>
        <a href="/writings/blogs">Blog</a>
    </nav>
      
   <div class="button-group">
     <button on:click={() => show = !show}><img src="{hamburger}" alt="Hamburger menu" class="burger"></button>
    <button class="text-xl text-black btn b2">Contact</button>
   </div>

</header>
<ul class:show={show}>
    <a href="/" on:click={() => show = !show}>Home</a>
	<a href="/about" on:click={() => show = !show}>About The Author</a>
    <a href="/writings/poems" on:click={() => show = !show}>Poems</a>
	<a href="/writings/stories" on:click={() => show = !show}>Stories</a>
	<a href="/writings/blogs" on:click={() => show = !show}>Blog</a>
</ul>
<style>
      header{
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 1111;
        border-bottom: 5px solid black;
        padding: 20px 20px;
        background: rgb(226, 224, 203);
        color: aliceblue;
    }
    .logo{
        font-weight: bold;
        color: rgb(80, 159, 180);
        text-shadow: 3px 3px rgb(0, 0, 0);
        
        font-family: cursive;
        font-style: italic;
    }
    .b2{
        padding: 10px 20px;
        border: 3px solid black;
    background: rgb(80, 159, 180);
    box-shadow: 5px 5px black;
    color: black;
    font-weight: bold;
    margin-right: 20px;
}
.button-group{
    display: flex;
    gap: 20px;

    
}
.burger{
    display: none;
    width: 0;
    flex: 0;
    background: rgb(80, 159, 180);
    border: none;
    border: 3px solid rgb(0, 0, 0);
    border-radius: 10px;
    padding: 3px;
}
ul{
		display: none;
	}
ul.show{
		display: flex;
		flex-direction: column;
		gap: 40px;
		padding: 150px 30px 0 0;
		position: fixed;
		width: 400px;
		height: 100%;
		top: 0;
		left: 0;
		background: rgb(226, 224, 203);
		transition: 0.5s;
		z-index: 1000;

		a{
			color: #000000;		
			font-size: 35px;
            font-weight: bold;
			padding-left: 40px;

		}
		
	}
	ul a:active{
		text-decoration: underline;
	}

  @media(max-width: 1000px){
  
    nav{
        display: none;
    }
    button{
        padding: 10px;
    }
    .btn{
        display: none;
    }
    .burger{
        display: initial;
        width: 50px;
        height: 50px;
        margin-left: auto;
    }
  }
  @media(max-width: 600px){
    header{
        padding: 10px 10px;
    }
    .logo{
        font-size: 2rem;
        text-shadow: 3px 3px rgb(0, 0, 0);
    }
 
  }
</style>