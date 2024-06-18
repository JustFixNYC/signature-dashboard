import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Buildings } from "./Components/Pages/Buildings/Buildings";
import { useRollbar } from "@rollbar/react";
import { SWRConfig } from "swr";
import { NetworkError } from "./api/error-reporting";
import { APIDocs } from "./Components/APIDocs/APIDocs";
import { Login } from "./Components/Pages/Login/Login";
import { PrivateRoutes } from "./auth";
import "./App.scss";
import { Landlords } from "./Components/Pages/Landlords/Landlords";
import { Lenders } from "./Components/Pages/Lenders/Lenders";
import { Home } from "./Components/Pages/Home/Home";
import { About } from "./Components/Pages/About/About";
import { Map } from "./Components/Pages/Map/Map";

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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path="buildings" element={<Buildings />} />
            <Route path="landlords" element={<Landlords />} />
            <Route path="lenders" element={<Lenders />} />
            <Route path="about" element={<About />} />
            <Route path="map" element={<Map />} />
            <Route path="*" element={<Home />} />
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
    <>
      <header id="header">Signature Data Dashboard</header>
      <div id="main">
        <div id="sidebar">
          <nav id="nav">
            <ul id="nav-links">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/buildings" className="nav-link">
                  Buildings
                </Link>
              </li>
              <li>
                <Link to="/landlords" className="nav-link">
                  Landlords
                </Link>
              </li>
              <li>
                <Link to="/lenders" className="nav-link">
                  Lenders
                </Link>
                <ul className="sublinks">
                  <li>
                    <Link to="/lenders?lender=cpc" className="nav-link">
                      CPC
                    </Link>
                  </li>
                  <li>
                    <Link to="/lenders?lender=santander" className="nav-link">
                      Santander
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/map" className="nav-link">
                  Map
                </Link>
              </li>
              {/* <li>
                <Link to="/building?bbl=3071980006">
                  Building Page for 3071980006
                </Link>
              </li>
              <li>
                <Link to="/collection?collection=ved-parkash">
                  Collection Page for Ved Parkash
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
        <div id="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
