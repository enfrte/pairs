import { useState, useEffect } from 'react'
import './App.css'

const wordPairs = [ // randomise on backend
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

function App() {
  const [cards, setCards] = useState(getCards());
  const [flippedCards, setFlippedCards] = useState([]); // max of 2 cards flipped at a time
  const [error, setError] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      if (first.pairId !== second.pairId) {
        setError(1);

        setTimeout(() => {
          setCards(prevCards => {
            return prevCards.map(c =>
              c.id === first.id || c.id === second.id ? { ...c, flipped: false } : c
            );
          });          
        
          setFlippedCards([]);
          setError(0);
        }, 1000);
      }
      else {
        setFlippedCards([]);
      }
    }
  }, [flippedCards]);

  function getCards() {
    return wordPairs; 
  }

  function handleCardClick(card) {
    if (card.flipped || flippedCards.length >= 2) return;

    setCards(prevCards => {
      console.log("prevCards", prevCards);
      return prevCards.map(c =>
        c.id === card.id ? { ...c, flipped: true } : c
      )
    });
    
    setFlippedCards([...flippedCards, card]);
    // console.log(cards);
  }

  function Card({ card, onClick, flipped, isError }) {
    return (
      <div className={`card ${flipped ? "flipped" : ""} ${isError ? "redBorder" : ""}`} onClick={onClick}>
        <div className="card-inner">
          <div className="card-front">?</div>
          <div className="card-back">{card.word}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="App container app-container">
      
      <div className="grid grid-3">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
            flipped={card.flipped}
            flippedCards={flippedCards}
            isError={error && flippedCards.some(c => c.id === card.id)}
          />
        ))}
      </div>

    </div>
  );

} 

export default App
