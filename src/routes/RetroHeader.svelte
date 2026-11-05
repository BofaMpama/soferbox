<script lang="ts">
	let menuOpen = $state(false);
</script>

<header class="site-header">
			<a class="footer-brand" href="/">SoferBox<span aria-hidden="true">.</span></a>


	<nav class="desktop-nav" aria-label="Main navigation">
		<a href="/writings/poems">Poems</a>
		<a href="/writings/stories">Stories</a>
		<a href="/writings/blogs">Blog</a>
		<a href="/about">About</a>
		<a class="contact-link" href="/contact">Say hello <span aria-hidden="true">↗</span></a>
	</nav>

	<button
		class="menu-toggle"
		type="button"
		aria-expanded={menuOpen}
		aria-controls="mobile-navigation"
		aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
		onclick={() => (menuOpen = !menuOpen)}
	>
		<span></span>
		<span></span>
	</button>

	{#if menuOpen}
		<nav id="mobile-navigation" class="mobile-nav" aria-label="Mobile navigation">
			<a href="/" onclick={() => (menuOpen = false)}>Home</a>
			<a href="/writings/poems" onclick={() => (menuOpen = false)}>Poems</a>
			<a href="/writings/stories" onclick={() => (menuOpen = false)}>Stories</a>
			<a href="/writings/blogs" onclick={() => (menuOpen = false)}>Blog</a>
			<a href="/about" onclick={() => (menuOpen = false)}>About</a>
			<a href="/contact" onclick={() => (menuOpen = false)}>Contact</a>
		</nav>
	{/if}
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 76px;
		padding: 0 clamp(1.25rem, 5vw, 5rem);
		border-bottom: 1px solid rgba(242, 238, 223, 0.18);
		background: var(--ink);
		color: var(--paper);
	}

.footer-brand {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(1rem, 6vw, 2.5rem);
		letter-spacing: -0.07em;
		text-decoration: none;
	}
		.footer-brand span {
		color: var(--yellow);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		font-size: 1.25rem;
		font-weight: 800;
		letter-spacing: -0.06em;
		text-decoration: none;
	}

	.brand-mark {
		display: grid;
		width: 2rem;
		height: 2rem;
		place-items: center;
		border: 1px solid var(--yellow);
		border-radius: 50%;
		color: var(--yellow);
		font-family: Georgia, serif;
		font-size: 1.1rem;
		font-style: italic;
	}

	.brand-accent {
		color: var(--yellow);
	}

	.desktop-nav {
		display: flex;
		align-items: center;
		gap: clamp(1rem, 2.4vw, 2.3rem);
	}

	.desktop-nav a,
	.mobile-nav a {
		font-size: 0.88rem;
		font-weight: 600;
		text-decoration: none;
		transition: color 160ms ease;
	}

	.desktop-nav a:hover,
	.mobile-nav a:hover {
		color: var(--yellow);
	}

	.desktop-nav .contact-link {
		padding: 0.55rem 0.9rem;
		border: 1px solid rgba(242, 238, 223, 0.45);
		border-radius: 999px;
	}

	.contact-link span {
		margin-left: 0.35rem;
		color: var(--yellow);
	}

	.menu-toggle,
	.mobile-nav {
		display: none;
	}

	@media (max-width: 740px) {
		.site-header {
			min-height: 68px;
		}

		.desktop-nav {
			display: none;
		}

		.menu-toggle {
			display: grid;
			width: 2.75rem;
			height: 2.75rem;
			place-content: center;
			gap: 0.35rem;
			border: 1px solid rgba(242, 238, 223, 0.42);
			border-radius: 50%;
			background: transparent;
			cursor: pointer;
		}

		.menu-toggle span {
			width: 1rem;
			height: 1px;
			background: var(--paper);
		}

		.mobile-nav {
			position: absolute;
			top: 100%;
			right: 0;
			left: 0;
			display: grid;
			gap: 0;
			padding: 0.5rem clamp(1.25rem, 5vw, 5rem) 1rem;
			border-top: 1px solid rgba(242, 238, 223, 0.14);
			background: var(--ink);
		}

		.mobile-nav a {
			padding: 0.8rem 0;
			border-bottom: 1px solid rgba(242, 238, 223, 0.12);
		}
	}
</style>
