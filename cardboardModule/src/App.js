import './App.scss';
import { BrowserRouter } from "react-router-dom";
import { Route, Redirect} from "react-router-dom";
import {MakeMyCardboards, Transport} from './pages/ListModules/ListModules';
import Home from './pages/Home/Home';
import MyCardboards from './pages/MyCardboards/MyCardboards';
import ListCardboard from './pages/ListCardboard/ListCardboard';
import CreateCardboard from './pages/CreateCardboard/CreateCardboard'

const App = () => (
  <BrowserRouter>
    
    
    <Route exact path="/" component={Home} />
    <Route exact path="/MakeMyCardboards" component={MakeMyCardboards} />
    <Route exact path="/MakeMyCardboards/myCardBoards" component={MyCardboards} />
    <Route exact path="/MakeMyCardboards/CreateCardboard" component={CreateCardboard} />
    <Route exact path="/MakeMyCardboards/ListCardboard" component={ListCardboard} />

    <Route exact path="/Transport" component={Transport} />

  </BrowserRouter>
);

export default App;
