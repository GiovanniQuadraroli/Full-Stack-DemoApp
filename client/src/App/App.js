import React from 'react';
import {Route,Switch} from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'
import './App.css';

class App extends React.PureComponent{
  render() {
    const App = () => {
      return(
      <div>
        <Switch>
          <Route exact path = '/' component={Home}></Route>
          <Route path = '/list' component={List}></Route>
        </Switch>
      </div>
      )
    }
    return (
      <Switch>
        <App/>
      </Switch>
    )
  }
}

export default App;
