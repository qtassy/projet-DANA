import './App.scss';
import { BrowserRouter } from "react-router-dom";
import { Route, Redirect} from "react-router-dom";
import MakeMyCardboards from './pages/MakeMyCardboards/MakeMyCardboards';
import Home from './pages/Home/Home';

const App = () => (
  <BrowserRouter>
    <Route exact path="/">
      <Redirect to="/MakeMyCardboards"/>
    </Route>
    <Route path="/MakeMyCardboards" component={MakeMyCardboards} />
    <Route path="/home" component={Home} />
  
  </BrowserRouter>
);

export default App;
