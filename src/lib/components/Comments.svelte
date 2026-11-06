<script lang="ts">
	type Comment = {
		id: number;
		name: string;
		body: string;
		created_at: string;
	};

	let { category, slug }: { category: string; slug: string } = $props();
	let comments = $state<Comment[]>([]);
	let name = $state('');
	let body = $state('');
	let website = $state('');
	let loading = $state(true);
	let submitting = $state(false);
	let loadError = $state('');
	let submitMessage = $state('');
	let submitError = $state('');

	const commentsUrl = $derived(
		`/api/comments/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`
	);

	async function loadComments(url: string) {
		loading = true;
		loadError = '';

		try {
			const response = await fetch(url, { cache: 'no-store' });
			if (!response.ok) throw new Error('Comments request failed');
			comments = (await response.json()) as Comment[];
		} catch {
			loadError = 'Comments are temporarily unavailable. Please try again later.';
		} finally {
			loading = false;
		}
	}

	async function submitComment(event: SubmitEvent) {
		event.preventDefault();
		submitting = true;
		submitError = '';
		submitMessage = '';

		try {
			const response = await fetch(commentsUrl, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ name, body, website })
			});
			const result = (await response.json()) as { error?: string; message?: string };

			if (!response.ok) {
				submitError = result.error ?? 'Your comment could not be submitted. Please try again.';
				return;
			}

			name = '';
			body = '';
			website = '';
			submitMessage = result.message ?? 'Thanks! Your comment is awaiting approval.';
		} catch {
			submitError = 'Your comment could not be submitted. Please try again.';
		} finally {
			submitting = false;
		}
	}

	$effect(() => {
		void loadComments(commentsUrl);
	});
</script>

<section class="comments-section" aria-labelledby="comments-heading">
	<h2 id="comments-heading">Join the conversation</h2>
	<p class="comments-intro">Leave a note. Comments are reviewed before they appear.</p>

	<form class="comment-form" onsubmit={submitComment}>
		<label for="comment-name">Your name</label>
		<input
			id="comment-name"
			bind:value={name}
			name="name"
			autocomplete="name"
			maxlength="60"
			required
		/>

		<label for="comment-body">Your comment</label>
		<textarea id="comment-body" bind:value={body} name="body" rows="5" maxlength="2000" required
		></textarea>

		<div class="comment-honeypot" aria-hidden="true">
			<label for="comment-website">Leave this field empty</label>
			<input
				id="comment-website"
				bind:value={website}
				name="website"
				tabindex="-1"
				autocomplete="off"
			/>
		</div>

		<button class="comment-submit" type="submit" disabled={submitting}>
			{submitting ? 'Sending…' : 'Submit comment'}
		</button>
		{#if submitMessage}<p class="comment-feedback" role="status">{submitMessage}</p>{/if}
		{#if submitError}<p class="comment-feedback comment-error" role="alert">{submitError}</p>{/if}
	</form>

	<div class="comment-list" aria-live="polite">
		{#if loading}
			<p class="comment-feedback">Loading comments…</p>
		{:else if loadError}
			<p class="comment-feedback comment-error" role="alert">{loadError}</p>
			<button class="comment-retry" type="button" onclick={() => loadComments(commentsUrl)}>
				Try again
			</button>
		{:else if comments.length === 0}
			<p class="comment-feedback">
				No approved comments yet. You can be the first to leave a note.
			</p>
		{:else}
			{#each comments as comment (comment.id)}
				<article class="comment">
					<header class="comment-meta">
						<strong>{comment.name}</strong>
						<time datetime={comment.created_at}>
							{new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(
								new Date(comment.created_at)
							)}
						</time>
					</header>
					<p>{comment.body}</p>
				</article>
			{/each}
		{/if}
	</div>
</section>
