import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Products from './components/Products';
import Results from './components/Results';
import SingleProduct from './components/SingleProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/products' component={Products} />
        <Route exact path='/results' component={Results} />
        <Route exact path='/products/:productID' component={SingleProduct} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
