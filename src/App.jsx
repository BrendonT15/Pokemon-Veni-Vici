import {useState} from "react"
import './App.css'
import PokemonCard from './components/PokemonCard.jsx'
import BanList from './components/BanList.jsx'

function App() {
  const [banList, setBanList] = useState([])

  const addToBanList = (item) => {
    if (!banList.includes(item)) {
        setBanList((prevBanList) => [...prevBanList, item]);
    }
  };

  const removeFromBanList = (itemToRemove) => {
    setBanList((prevBanList) => prevBanList.filter(item => item !== itemToRemove));
  };


  return (
    <div className="App">
      <h1>Pokemon App</h1>
      <PokemonCard addToBanList={addToBanList} banList={banList} />
      <BanList banList={banList} onRemove={removeFromBanList}/>
    </div>
  )
}

export default App
