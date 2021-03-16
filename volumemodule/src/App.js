import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import CalculateurVolume from './CalculateurVolume';
import Recapitulatif from './Recapitulatif';

const App = () => {
  <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
      <Switch>
        <Route path="/" component={CalculateurVolume} />
        <Route path="/Recapitulatif" component={Recapitulatif} />
      </Switch>
  </BrowserRouter>
}
export default App;