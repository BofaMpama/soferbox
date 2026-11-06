<script lang="ts">
	import '$lib/css/homepage.css';
	import boffInBlue from '$lib/assets/boff-in-a-blue-shirt.png';

	const scriptures = [
		{
			reference: 'Habakkuk 2:2',
			text: 'And the LORD answered me, and said, Write the vision, and make it plain upon tables, that he may run that readeth it.'
		},
		{
			reference: 'Psalm 45:1',
			text: 'My heart is inditing a good matter: I speak of the things which I have made touching the king: my tongue is the pen of a ready writer.'
		},
		{
			reference: 'Ecclesiastes 12:10',
			text: 'The preacher sought to find out acceptable words: and that which was written was upright, even words of truth.'
		},
		{
			reference: 'Proverbs 25:11',
			text: 'A word fitly spoken is like apples of gold in pictures of silver.'
		},
		{
			reference: 'Jeremiah 15:16',
			text: 'Thy words were found, and I did eat them; and thy word was unto me the joy and rejoicing of mine heart: for I am called by thy name, O LORD God of hosts.'
		},
		{
			reference: 'Psalm 119:11',
			text: 'Thy word have I hid in mine heart, that I might not sin against thee.'
		},
		{
			reference: '2 Timothy 3:16',
			text: 'All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:'
		}
	];
	let verseDialog: HTMLDialogElement;
	let selectedScripture = $state<(typeof scriptures)[number] | null>(null);

	function showScripture(scripture: (typeof scriptures)[number]) {
		selectedScripture = scripture;
		verseDialog.showModal();
	}
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
		I’m a Christian whose faith struggles to remain silent. I must give expression
		to the thoughts, beliefs, convictions and ideas that dwell within me. SoferBox is the digital
		scroll on which I write.
	</p>
	<blockquote class="about-quote">
		“My heart is inditing a good matter: I speak of the things which I have made touching the king:
		my tongue is the pen of a ready writer.”
		<cite>Psalm 45:1</cite>
	</blockquote>
	<p>
		Scripture has always shaped the way I see the world and helped me in the way I find words to
		describe it. These are some of the passages I turn to.
	</p>
	<ul class="scripture-list">
		{#each scriptures as scripture (scripture.reference)}
			<li>
				<button type="button" aria-haspopup="dialog" onclick={() => showScripture(scripture)}>
					{scripture.reference}
					<span aria-hidden="true">↗</span>
				</button>
			</li>
		{/each}
	</ul>

	<dialog
		bind:this={verseDialog}
		class="scripture-dialog"
		onclose={() => (selectedScripture = null)}
		aria-labelledby="scripture-dialog-title"
	>
		{#if selectedScripture}
			<p class="section-kicker">A passage for the page</p>
			<h2 id="scripture-dialog-title">{selectedScripture.reference}</h2>
			<blockquote>{selectedScripture.text}</blockquote>
			<cite>King James Version</cite>
			<button class="scripture-dialog-close" type="button" onclick={() => verseDialog.close()}>
				Close
			</button>
		{/if}
	</dialog>
</main>
