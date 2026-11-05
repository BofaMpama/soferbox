<footer class="site-footer">
	<div class="footer-top">
		<a class="footer-brand" href="/">
			Sofer<span class="brand-accent">Box</span><span class="brand-period" aria-hidden="true"
				>.</span
			>
		</a>
		<p>A little box for words worth keeping.</p>
	</div>
	<div class="footer-bottom">
		<nav aria-label="Footer navigation">
			<a href="/writings">All writings</a>
			<a href="/about">About</a>
			<a href="/contact">Contact</a>
		</nav>
		<a class="footer-email" href="mailto:contact.soferboxauthor@gmail.com">
			contact.soferboxauthor@gmail.com
		</a>
		<p>© {new Date().getFullYear()} Bofa Mpama</p>
	</div>
</footer>

<style>
	.site-footer {
		padding: 3rem clamp(1.25rem, 9vw, 9rem) 1.5rem;
		background: var(--ink);
		color: var(--paper);
	}

	.footer-top {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 2rem;
		padding-bottom: 2.5rem;
	}

	.footer-brand {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		letter-spacing: -0.07em;
		text-decoration: none;
	}

	.brand-accent,
	.brand-period {
		color: var(--yellow);
	}

	.footer-top p {
		margin: 0 0 0.6rem;
		color: rgba(242, 238, 223, 0.68);
	}

	.footer-bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem 2rem;
		padding-top: 1.25rem;
		border-top: 1px solid rgba(242, 238, 223, 0.2);
		color: rgba(242, 238, 223, 0.72);
		font-size: 0.8rem;
	}

	.footer-bottom nav {
		display: flex;
		flex-wrap: wrap;
		gap: 1.2rem;
	}

	.footer-bottom a {
		color: var(--paper);
		text-decoration: none;
	}

	.footer-bottom a:hover {
		color: var(--yellow);
	}

	.footer-bottom p {
		margin: 0;
	}

	@media (max-width: 600px) {
		.footer-top {
			align-items: flex-start;
			flex-direction: column;
			gap: 0;
		}

		.footer-bottom {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
