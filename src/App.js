import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./Home";
import BlogHolder from "./Blog/BlogHolder";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailedPage from "./Blog/DetailedPage";
import { StateManagement } from "./StateManagement/StateManagement";

function App() {
  return (
    <div>
      <StateManagement>
        <Router>
          <Switch>
            <Route exact path="/" component={BlogHolder} />
            <Route exact path="/:id" component={DetailedPage} />
          </Switch>
        </Router>
      </StateManagement>
    </div>
  );
}

export default App;
