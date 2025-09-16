<div class="main">

    <div class="background">
        My heart is stirred by a noble theme as I recite my verses for the king; my tongue is the pen of a skillful writer. You are the most excellent of men and your lips have been anointed with grace, since God has blessed you forever. Gird your sword upon your side, O mighty one; clothe yourself with splendor and majesty.
        The Lord GOD has given me the tongue of discipleship, to sustain the weary with a word.
        Write the vision and make it plain on tablets, that he may run who reads it
    </div>
  <div class="poster">
    <div class="quote">
        "Write the vision and make it plain on tablets, that he may run who reads it." 
    </div>
    <span class="quote--by"> - Habbakuk 2:2 </span>
  </div>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&family=Special+Elite&display=swap");


.main {
  min-height: fit-content;
  height: fit-content;
  overflow: hidden;
  background: #000;
  display: flex;
  padding: 0% 10%;
	position: relative;
}

.background {
	position: absolute;
	inset: -20px;
	color: #fff;
	font-size: 3rem;
	text-align: justify;
	opacity: 0.15;
  font-family: "Special Elite", cursive;
}

.poster {
  margin: auto;
  width: min(100%, 600px);
  display: flex;
  flex-direction: column;
  filter: blur(.5px);
  position: sticky;
  padding: 5% 0;

}

.quote {
  font-size: 4rem;
  animation: shake 150ms infinite;
  text-align: center;
  background:rgb(80, 159, 180);
  padding: 20px;
  border-radius: 10px;
  margin: 20px;
  font-weight: 900;
  background-position: 50% 0%;
  background-size: cover;  
  position: sticky;
  top: 70px;

  font-family: "Josefin Sans", sans-serif;
	@media (prefers-reduced-motion) {
  	animation: none;
	}

  &--by {
    color: #fff;
    margin-right: 0;
    margin-left: auto;
    font-family: "Special Elite", cursive;
  }
}

@media(max-width: 900px){
    .poster{
        width: 100%;
    }
    .quote{
        font-size: 2rem;
        margin-bottom: 40px;
    }
}
</style>    