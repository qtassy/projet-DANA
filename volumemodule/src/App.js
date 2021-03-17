import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import CalculateurVolume from './CalculateurVolume';
import Recapitulatif from './Recapitulatif';

const App = () => {
  return(
    <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
      <Switch>
        <Route path="/Recapitulatif" component={Recapitulatif} />
        <Route path="/" component={CalculateurVolume} />
      </Switch>
    </BrowserRouter>
  )
}
export default App;