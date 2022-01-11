import { Route, Switch } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import ListPage from "./pages/ListPage";
import NewRecordForm from "./pages/NewRecordForm";
import Layout from "./components/layout/Layout";
function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact={true}>
          <ListPage />
        </Route>
        <Route path="/details/:id">
          <DetailsPage />
        </Route>
        <Route path="/newForm">
          <NewRecordForm />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
