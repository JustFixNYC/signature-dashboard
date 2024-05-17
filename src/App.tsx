import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Portfolio } from "./Components/Portfolio/Portfolio";
import { Indicators } from "./Components/Indicators/Indicators";
import { useRollbar } from "@rollbar/react";
import { SWRConfig } from "swr";
import { NetworkError } from "./api/error-reporting";
import { MapBox } from "./Components/MapBox/MapBox";
import { APIDocs } from "./Components/APIDocs/APIDocs";
import { Login } from "./Components/Login/Login";
import { PrivateRoutes, useAuth } from "./auth";
import "./App.scss";

function App() {
  const rollbar = useRollbar();
  const { user, logout } = useAuth();

  return (
    <SWRConfig
      value={{
        onError: (error) => {
          if (error instanceof NetworkError && !error.shouldReport) return;
          rollbar.error(error);
        },
      }}
    >
      <h1>Signature Dashboard</h1>
      {user && <button onClick={logout}>Logout</button>}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route index element={<>home</>} />
            <Route path="mapbox" element={<MapBox />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="indicators" element={<Indicators />} />
            <Route path="*" element={<>home</>} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/api_docs" element={<APIDocs />} />
      </Routes>
    </SWRConfig>
  );
}

function Layout() {
  return (
    <div>
      <h1>Signature Dashboard</h1>
      <Link className="api-link" to="/api_docs">
        API Docs
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/mapbox?bbl=2042900008">
              Map For Portfolio of BBL 2042900008
            </Link>
          </li>
          <li>
            <Link to="/portfolio?bbl=2042900008">
              Table For Portfolio of BBL 2042900008
            </Link>
          </li>
          <li>
            <Link to="/indicators?bbl=2042900008">
              Indicators Chart For Portfolio of BBL 2042900008
            </Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}

export default App;
