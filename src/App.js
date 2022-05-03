import logo from "./logo.svg";
import { Login } from "./components/login/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

const test = {
  x_pos: 400,
  y_pos: 100,
  x_container: 200,
  y_container: 150,
};

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">
            <Login {...test} />
          </Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
