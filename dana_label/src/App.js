import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import CreationCompte from './component/CreationCompte/CreationCompte';
import FormulaireConnaissance from './component/CreationProjetDemenagement/FormulaireConnaissance';
import { ListeEtiquettes } from './component/Etiquettes/ListeEtiquettes.js';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ListeEtiquettes} />
      <Route exact path="/ListeEtiquettes" component={ListeEtiquettes} />
      <Route exact path="/FormulaireConnaissance" component={FormulaireConnaissance} />
      <Route exact path="/CreationCompte" component={CreationCompte} />
    </BrowserRouter>
  );
}

export default App;
