
<script>
    import hamburger from '$lib/assets/burger.png';
</script>

<header class="flex justify-between gap-8 items-center px-6 py-3 bg-gray-100">
    <div class="logo text-5xl text-black">SoferBox</div>
    <nav class="text-xl  text-white flex gap-4">
        <a class="" href="/">Home</a>
        <a href="/writings">Writings</a>
        <a href="/about">About Me</a>
        <a href="/contact">Contact</a>
    </nav>
      
   <div class="button-group">
     <button><img src="{hamburger}" alt="Hamburger menu" class="burger"></button>
     <button class="text-xl text-white bg-black btn b1">Sign Up</button>
    <button class="text-xl text-black btn b2">Sign In</button>
   </div>

</header>
<style>
      header{
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 1;
        border: 2px solid black;
        padding: 20px 20px;
        background: black;
        color: aliceblue;
    }
    .logo{
        font-weight: bold;
        color: rgb(80, 159, 180);
        text-shadow: 2px 2px rgb(255, 255, 255);
    }
    .b2{
        padding: 10px 20px;
    background: rgb(255, 255, 255);
    color: black;
}
.button-group{
    display: flex;
    gap: 20px;

    
}
.burger{
    display: none;
    width: 0;
    flex: 0;
    background: rgb(250, 250, 250);
    border: 2px solid rgb(243, 247, 248);
    border-radius: 10px;
    padding: 3px;
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
        text-shadow: 1px 1px white;
    }
 
  }
</style>