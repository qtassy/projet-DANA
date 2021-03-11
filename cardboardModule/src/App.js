import './App.scss';
import { BrowserRouter } from "react-router-dom";
import { Route, Redirect} from "react-router-dom";
import MakeMyCardboards from './pages/MakeMyCardboards/MakeMyCardboards';
import Home from './pages/Home/Home';
import MyCardboards from './pages/MyCardboards/MyCardboards';

import CreateCardboard from './pages/CreateCardboard/CreateCardboard'

const App = () => (
  <BrowserRouter>
    <Route exact path="/">
      <Redirect to="/MakeMyCardboards/myCardBoards"/>
    </Route>
    <Route exact path="/home" component={Home} />

    <Route exact path="/MakeMyCardboards" component={MakeMyCardboards} />
      <Route exact path="/MakeMyCardboards/myCardBoards" component={MyCardboards} />

        <Route exact path="/MakeMyCardboards/CreateCardboard" component={CreateCardboard} />

  </BrowserRouter>
);

export default App;
