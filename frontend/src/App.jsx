import { useState } from 'react'
import HomePage from './pages/HomePage'
// import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <HomePage />
      <Footer />
    </div>
  )
}

export default App
