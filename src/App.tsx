import RecipeList from "./RecipeList";
import { Container } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <Container fluid className="App py-5">
      <RecipeList />
    </Container>
  );
}

export default App;
