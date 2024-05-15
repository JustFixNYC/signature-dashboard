import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { Portfolio } from "./Components/Portfolio/Portfolio";
import { Indicators } from "./Components/Indicators/Indicators";
import { useRollbar } from "@rollbar/react";
import { SWRConfig } from "swr";
import { NetworkError } from "./api/error-reporting";
import { MapBox } from "./Components/MapBox/MapBox";

function App() {
  const rollbar = useRollbar();
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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<>home</>} />
          <Route path="mapbox" element={<MapBox />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="indicators" element={<Indicators />} />
          <Route path="*" element={<>home</>} />
        </Route>
      </Routes>
    </SWRConfig>
  );
}

function Layout() {
  return (
    <div>
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
