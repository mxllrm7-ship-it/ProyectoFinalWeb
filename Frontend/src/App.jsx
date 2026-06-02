import './App.css'
import NavBar from './components/Landing/NavBar/NavBar'
import ImageCarousel from './components/Landing/Carrousel/Carrousel'
import Events from './components/Landing/EventList/Events'
import Footer from './components/Landing/Footer/Footer'
function App() {
  return (
    <div className="container">
      <NavBar />
      <ImageCarousel/>
      <Events/>
      <Footer/>
    </div>
  )
}

export default App
