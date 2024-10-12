const wordPairs = [
  { id: 1, english: "dog", finnish: "koira" },
  { id: 2, english: "cat", finnish: "kissa" },
  { id: 3, english: "bird", finnish: "lintu" },
  { id: 4, english: "car", finnish: "auto" },
  { id: 5, english: "house", finnish: "talo" }
];

function App() {
  const [cards, setCards] = React.useState(shuffleCards());
  const [flippedCards, setFlippedCards] = React.useState([]);
  const [matchedCards, setMatchedCards] = React.useState([]);
  const [showVocab, setShowVocab] = React.useState(false); // State to toggle visibility of vocab table

  React.useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      // Check if English and Finnish words match
      if (
        (first.type === "english" && first.pairId === second.pairId && second.type === "finnish") ||
        (first.type === "finnish" && first.pairId === second.pairId && second.type === "english")
      ) {
        setMatchedCards([...matchedCards, first.id, second.id]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards]);

  function shuffleCards() {
    const cardSet = wordPairs.flatMap(pair => [
      { id: Math.random(), pairId: pair.id, word: pair.english, type: "english" },
      { id: Math.random(), pairId: pair.id, word: pair.finnish, type: "finnish" }
    ]);
    
    return cardSet.sort(() => 0.5 - Math.random());
  }

  function handleCardClick(card) {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(card) &&
      !matchedCards.includes(card.id)
    ) {
      setFlippedCards([...flippedCards, card]);
    }
  }

  return (
    <div className="App container">
      
      <h1 className="text-light pt-3">Match English and Finnish Words</h1>

      <div className="grid">          
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
            flipped={flippedCards.includes(card) || matchedCards.includes(card.id)}
          />
        ))}
      </div>

      <button className="mt-3 mb-3 btn btn-primary" onClick={() => setShowVocab(!showVocab)}>
        {showVocab ? "Hide Vocabulary" : "Show Vocabulary"}
      </button>

      <div className="d-flex justify-content-center">          
        {showVocab && <VocabTable vocab={wordPairs} />}
      </div>

    </div>
  );

  function VocabTable({ vocab }) {
    return (
      <table className="table table-dark table-striped table-bordered vocab-table" style={{ maxWidth: "600px" }}>
        <thead>
          <tr>
            <th scope="col">English</th>
            <th scope="col">Finnish</th>
          </tr>
        </thead>
        <tbody>
          {vocab.map(pair => (
            <tr key={pair.id}>
              <td>{pair.english}</td>
              <td>{pair.finnish}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

}

function Card({ card, onClick, flipped }) {
  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{card.word}</div>
      </div>
    </div>
  );
}

// Use createRoot from React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
