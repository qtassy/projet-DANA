import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import CreationCompteClient from './component/CreationCompte/CreationCompteClient';
import CreationComptePro from './component/CreationCompte/CreationComptePro';
import { CreationPieces } from './component/CreationPieces/CreationPieces';
import FormulaireConnaissance from './component/CreationProjetDemenagement/FormulaireConnaissance';
import { ListeEtiquettes } from './component/Etiquettes/ListeEtiquettes.js';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ListeEtiquettes} />
      <Route exact path="/ListeEtiquettes" component={ListeEtiquettes} />
      <Route exact path="/FormulaireConnaissance" component={FormulaireConnaissance} />
      <Route exact path="/CreationCompteClient" component={CreationCompteClient} />
      <Route exact path="/CreationComptePro" component={CreationComptePro} />
      <Route exact path="/CreationPieces" component={CreationPieces} />
    </BrowserRouter>
  );
}

export default App;
