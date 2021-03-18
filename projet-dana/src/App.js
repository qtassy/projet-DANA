import './App.css';
import Login from './pages/Login/Login';
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from './pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />

      {/* Module MakeMyCardboards */}
      {/* <Route exact path="/MakeMyCardboards" component={MakeMyCardboards} />
      <Route exact path="/MakeMyCardboards/myCardBoards" component={MyCardboards} />
      <Route exact path="/MakeMyCardboards/myCardBoards/createCardboard" component={CreateCardboard} />
      <Route exact path="/MakeMyCardboards/myCardBoards/room" component={ListCardboardByRoom} /> */}

      {/* Module Transport */}
      {/* <Route exact path="/Transport" component={Transport} /> */}

  </BrowserRouter>
  );
}

export default App;
