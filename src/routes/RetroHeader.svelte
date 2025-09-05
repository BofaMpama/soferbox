
<script>
    import hamburger from '$lib/assets/burger.png';
</script>

<header class="flex justify-between gap-8 items-center px-6 py-3 bg-gray-100">
    <div class="logo text-5xl text-black">SoferBox</div>
    <nav class="text-xl  text-black flex gap-4">
        <a class="" href="/">Home</a>
        <a href="/writings">Writings</a>
        <a href="/about">About Me</a>
        <a href="/contact">Contact</a>
    </nav>
      
   <div class="button-group">
     <button><img src="{hamburger}" alt="Hamburger menu" class="burger"></button>
     <button class="border-black border-2 px-6 py-3 text-xl text-black btn">Sign Up</button>
    <button class="border-black border-2 px-6 py-3 text-xl text-black btn">Sign In</button>
   </div>

</header>
<style>
      header{
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 1;
        border: 2px solid black;
    }
    .btn{
    background: rgb(255, 255, 255);
    color: black;
    box-shadow: 4px 4px black;
}
.button-group{
    display: flex;
    gap: 20px;

    button:nth-child(2){
box-shadow: 4px 4px  rgb(0, 0, 0);
        background: rgb(54, 111, 126);

color: white;
    }
}
.burger{
    display: none;
    width: 0;
    flex: 0;
    background: rgba(54, 112, 126, 0.664);
    border: 2px solid black;
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
</style>