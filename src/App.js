import logo from "./logo.svg";
import { Login } from "./components/login/login";
import {Navbar} from "./components/navbar/navbar";
import { Base } from "./components/base/base";
import img from "./azerobg.jpg";
import {MakeAccount} from './components/accounts/accounts';
import {NewWallet} from './components/accounts/generated';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

const test = {
  x_pos: 400,
  y_pos: 100,
  x_container: 200,
  y_container: 150,
};

const ds_json = {
  accountName: "",
  email: "",
  password: "",
  confirmPassord: "",
}

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Base />
        <Routes>
          <Route path="/" element={<Login {...test} />} />
          <Route path="/makeaccount" element={<MakeAccount />} />
          <Route path="makeaccount/create" element={<NewWallet {...ds_json} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
