<script>
	// Todo: Highlight matching pairs when user clicks or hovers over a card
	// Todo: Play again / Reset button
	import Card from './lib/Card.svelte';

	let cards = getCards(); 
	let flippedCards = []; // max of 2 cards flipped at a time
	let error = false;

	function getCards() {
		return [ // Will be randomised and come from backend
			{ id: 1, pairId: 1, word: "dog", flipped: false },
			{ id: 2, pairId: 1, word: "koira", flipped: false },
			{ id: 3, pairId: 2, word: "cat", flipped: false },
			{ id: 4, pairId: 2, word: "kissa", flipped: false },
			{ id: 5, pairId: 3, word: "bird", flipped: false },
			{ id: 6, pairId: 3, word: "lintu", flipped: false },
			{ id: 7, pairId: 4, word: "car", flipped: false },
			{ id: 8, pairId: 4, word: "auto", flipped: false },
			{ id: 9, pairId: 5, word: "house", flipped: false },
			{ id: 10, pairId: 5, word: "talo", flipped: false }
		]; 
	}

	// Runs each time flippedCards is updated (putting flippedCards in the parent scope of $: achieves this I guess)
	$: if (flippedCards.length === 2) {	
		const [first, second] = flippedCards;

		if (first.pairId !== second.pairId) {
			error = true;
			
			setTimeout(() => {
				cards = cards.map(c => c.id === first.id || c.id === second.id ? { ...c, flipped: false } : c);
				flippedCards = [];
				error = false;
			}, 2000);
		}
		else {
			flippedCards = [];
		}
	}
</script>

<div class="App container app-container">
	<div class="grid grid-3">
	{#each cards as card}
		<Card 
			card={card}
			bind:flippedCards={flippedCards}
			error={error && flippedCards.some(c => c.id === card.id)}
		/>
	{/each}
	</div>
</div>

<style>
	.App {
		text-align: center;
	}

	.app-container {
		height: 100vh;
		min-width: 366px;
		max-width: 600px;
		margin: auto;
	}


	h1 {
		margin-bottom: 20px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		grid-gap: 20px;
		justify-content: center;
	}

	.grid-3 {
		grid-template-columns: repeat(3, 100px);
	}

	.grid-4 {
		grid-template-columns: repeat(4, 100px);
	}

	.grid-5 {
		grid-template-columns: repeat(5, 100px);
	}
</style>