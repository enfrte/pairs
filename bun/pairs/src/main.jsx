import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import WordPairForm from './WordPairForm.jsx'

const root = document.getElementById('root')

if (root.dataset.page === 'app') {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else if (root.dataset.page === 'wordPairForm') {
  createRoot(root).render(
    <StrictMode>
      <WordPairForm />
    </StrictMode>,
  )
}
else { // For bun/vite development
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

