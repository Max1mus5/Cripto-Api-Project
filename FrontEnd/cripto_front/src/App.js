import './App.css';
import CoinsListComponent from './components/CoinsListComponent';

function App() {
  return (
    <div className="App fade-in">
      <CoinsListComponent className="coinList"/>
      {/* advertencia en el foote una nota que dure 5 segnudos indicando que cada minuto se pueden hacer 3 consultas */}
      <footer className="footer">
        <p className="footer-text">Cada minuto se pueden hacer 1 consulta por prueba gratuita</p> <a className="footer-span" target='_blank' href='https://jeronimo-riveros.netlify.app/'>Jeronimo Riveros</a>

      </footer>
    </div>
  );
}

export default App;
