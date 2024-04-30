import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { Portfolio } from "./Components/Portfolio/Portfolio";
import { Indicators } from "./Components/Indicators/Indicators";

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/portfolio?bbl=2042900008">Portfolio For BBL 2042900008</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <>
      <h1>Signature Dashboard</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<>home</>} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="indicators" element={<Indicators />} />
          <Route path="*" element={<>home</>} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
