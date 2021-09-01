import CartFeature from 'features/Cart';
import ProductFeature from 'features/Product';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import CounterFeature from './features/Counter/CounterFeature';
import AlbumFeature from './features/Song';
import TodoFeature from './features/Todo';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/posts/:postId" exact />

        <Route path="/" component={CounterFeature} exact />
        <Route path="/todo-list" component={TodoFeature} />
        <Route path="/album" component={AlbumFeature} />
        <Route path="/product" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
