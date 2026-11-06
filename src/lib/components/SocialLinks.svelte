<script lang="ts">
	let { compact = false }: { compact?: boolean } = $props();

	const links = [
		{ name: 'Substack', handle: '@bofampama', href: 'https://substack.com/@bofampama' },
		{
			name: 'Instagram',
			handle: '@bofa_mpama',
			href: 'https://www.instagram.com/bofa_mpama/'
		},
		{
			name: 'Facebook',
			handle: 'bofa.mpama.5',
			href: 'https://www.facebook.com/bofa.mpama.5'
		}
	];
</script>

<nav class:compact aria-label="Bofa Mpama on social media" class="social-links">
	{#each links as link (link.name)}
		<a
			href={link.href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`${link.name}: ${link.handle}`}
		>
			<span class="social-icon" aria-hidden="true">
				{#if link.name === 'Instagram'}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<rect x="3.5" y="3.5" width="17" height="17" rx="5" />
						<circle cx="12" cy="12" r="4" />
						<circle class="social-icon-dot" cx="17.5" cy="6.8" r="1" />
					</svg>
				{:else if link.name === 'Facebook'}
					<svg viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8z"
						/>
					</svg>
				{:else}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path d="M4 4.5h16M4 8h16M4 11.5h16M4 17.5h16" />
						<path d="M4 14.5h10" />
					</svg>
				{/if}
			</span>
			<span class="social-link-copy">
				<strong>{link.name}</strong>
				{#if !compact}<span>{link.handle}</span>{/if}
			</span>
			<span class="social-link-arrow" aria-hidden="true">↗</span>
		</a>
	{/each}
</nav>
