import './App.scss';
import { BrowserRouter } from "react-router-dom";
import { Route, Redirect} from "react-router-dom";
import VirtualCardboard from './components/VirtualCarboard/VirtualCarboard';
import Home from './components/Home/Home';
const App = () => (
  <BrowserRouter>
    <Route exact path="/">
      <Redirect to="/home" />
    </Route>
    <Route path="/virtualCardboard" component={VirtualCardboard} />
    <Route path="/home" component={Home} />
  
  </BrowserRouter>
);

export default App;
