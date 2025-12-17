import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UnboxingPage from './pages/UnboxingPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/unboxing" element={<UnboxingPage />} />
    </Routes>
  )
}

export default App
