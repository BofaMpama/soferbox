<script></script>
<header class="flex justify-between gap-8 items-center px-6 py-3 bg-gray-100">
    <div class="logo text-5xl text-black">SoferBox</div>
    <nav class="text-xl  text-black flex gap-4">
        <a class="" href="/">Home</a>
        <a href="/writings">Writings</a>
        <a href="/about">About Me</a>
        <a href="/contact">Contact</a>
    </nav>
    <button class="border-black border-2 px-6 py-3 text-xl text-black btn">Random reading</button>
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
  @media(max-width: 900px){
  
    nav{
        display: none;
    }
    button{
        padding: 10px;
    }
    .btn{
        display: none;
    }
  }
</style>