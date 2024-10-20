<script>
	export let card;
	export let flippedCards; // max of 2 cards flipped at a time
	export let error = false;

	function handleCardClick() {
		if (card.flipped || flippedCards.length >= 2) return;
		card.flipped = !card.flipped;
		flippedCards = [...flippedCards, card];
	}

</script>

<div class="card" class:flipped={card.flipped} class:red-border={error} on:click={handleCardClick}>
	<div class="card-inner">
		<div class="card-front"><span class="question-mark">?</span></div>
		<div class="card-back">{card.word}</div>
	</div>
</div>

<style>
	.card {
		width: 100px;
		height: 100px;
		perspective: 1000px;
		cursor: pointer;
		border: 4px solid transparent;
	}

	.card.flipped .card-inner {
		transform: rotateY(180deg);
	}

	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 0.4s;
	}

	.card-front,
	.card-back {
		border-radius: 4px;
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		color: white;
	}

	.card-front {
		background-color: #1abc9c;
	}
	.card-back {
		background-color: #34495e;
		transform: rotateY(180deg);
	}

	.red-border {
		transition: transform 0.4s, border 0.4s, box-shadow 0.4s;
		transition-delay: 0.2s;
		border: 4px solid red;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(255,0,0,0.7);
	}

	.question-mark {
		color: black;
		font-weight: bold;
		font-size: 24px;
		border-radius: 50%;
		background-color: white;
		width: 24px;
		height: 24px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
