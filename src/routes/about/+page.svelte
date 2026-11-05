<script lang="ts">
	import '$lib/css/homepage.css';
	import boffInBlue from '$lib/assets/boff-in-a-blue-shirt.png';

	const scriptures = [
		'Habakkuk 2:2',
		'Psalm 45:1',
		'Ecclesiastes 12:10',
		'Proverbs 25:11',
		'Jeremiah 15:16',
		'Psalm 119:11',
		'2 Timothy 3:16'
	];
</script>

<svelte:head>
	<title>About Bofa — SoferBox</title>
	<meta
		name="description"
		content="Meet Bofa Mpama, the Christian writer behind SoferBox and the words gathered here."
	/>
</svelte:head>

<section class="about-hero">
	<div>
		<p class="section-kicker">The person behind the pages</p>
		<h1>Hello, I’m <em>Bofa.</em></h1>
	</div>
	<img src={boffInBlue} alt="Bofa Mpama" />
</section>

<main class="about-copy">
	<p>
		My name’s Bofa. I’m a Christian whose faith struggles to remain silent. I must give expression
		to the thoughts, beliefs, convictions and ideas that dwell within me. SoferBox is the digital
		scroll on which I write.
	</p>
	<blockquote class="about-quote">
		“My heart is stirred by a noble theme as I recite my verses for the king.”
		<cite>Psalm 45:1</cite>
	</blockquote>
	<p>
		Scripture has always shaped the way I see the world and helped me in the way I find words to describe it. These are
		some of the passages I turn to.
	</p>
	<ul class="scripture-list">
		{#each scriptures as scripture (scripture)}
			<li>{scripture}</li>
		{/each}
	</ul>
</main>
