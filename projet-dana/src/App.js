import './App.css';
import Login from './pages/Login/Login';
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import {MakeMyCardboards} from './pages/ListModules/ListModules';
import Home from './pages/Home/Home';
import MyCardboards from './pages/MyCardboards/MyCardboards';
import ListCardboardByRoom from './pages/ListCardboardByRoom/ListCardboardByRoom';
import CreateCardboard from './pages/CreateCardboard/CreateCardboard'
import ListeEtiquettes from './pages/Etiquettes/ListeEtiquettes';
import CreationCompteClient from './pages/CreationCompte/CreationCompteClient';
import CreationComptePro from './pages/CreationCompte/CreationComptePro';
import CreationProjetDemenagement from './pages/CreationProjetDemenagement/CreationProjetDemenagement';
import CreationPiecesOrigine from './pages/CreationPieces/CreationPieceOrigine';
import CreationPiecesFutur from './pages/CreationPieces/CreationPieceFutur';

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

      <Route exact path="/Etiquettes" component={ListeEtiquettes} />
      <Route exact path="/CreationCompteClient" component={CreationCompteClient} />
      <Route exact path="/CreationComptePro" component={CreationComptePro} />
      <Route exact path="/CreationPiecesOrigine" component={CreationPiecesOrigine} />
      <Route exact path="/CreationPiecesFutur" component={CreationPiecesFutur} />
      <Route exact path="/CreationProjetDemenagement" component={CreationProjetDemenagement} />

      {/* Module Transport */}
      {/* <Route exact path="/Transport" component={Transport} /> */}

  </BrowserRouter>
  );
}

export default App;
