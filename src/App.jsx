import './App.css'
import Game from './components/Game'

function App() {

  return (
    <div className='container'>
      <h1>Tic Tac Toe</h1>
      <Game size={3}/>
    </div>
  )
}

export default App
