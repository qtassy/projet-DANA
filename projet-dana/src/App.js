import './App.css';
import Login from './pages/Login/Login';
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import {MakeMyCardboards, Transport} from './pages/ListModules/ListModules';
import Home from './pages/Home/Home';
import MyCardboards from './pages/MyCardboards/MyCardboards';
import ListCardboardByRoom from './pages/ListCardboardByRoom/ListCardboardByRoom';
import CreateCardboard from './pages/CreateCardboard/CreateCardboard'

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />

      {/* Module MakeMyCardboards */}
      <Route exact path="/MakeMyCardboards" component={MakeMyCardboards} />
      <Route exact path="/MakeMyCardboards/myCardBoards" component={MyCardboards} />
      <Route exact path="/MakeMyCardboards/myCardBoards/createCardboard" component={CreateCardboard} />
      <Route exact path="/MakeMyCardboards/myCardBoards/room" component={ListCardboardByRoom} />

      {/* Module Transport */}
      {/* <Route exact path="/Transport" component={Transport} /> */}

  </BrowserRouter>
  );
}

export default App;
