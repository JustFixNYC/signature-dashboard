import { Routes, Route, Outlet, NavLink, Link } from "react-router-dom";
import { Buildings } from "./Components/Pages/Buildings/Buildings";
import { useRollbar } from "@rollbar/react";
import { SWRConfig } from "swr";
import { NetworkError } from "./api/error-reporting";
import { APIDocs } from "./Components/Pages/APIDocs/APIDocs";
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
      <header id="header">
        <Link to="/">Signature Portfolio Dashboard</Link>
      </header>
      <div id="main">
        <div id="sidebar">
          <nav id="nav">
            <ul id="nav-links">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/buildings"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"
                  }
                >
                  Buildings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/landlords"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"
                  }
                >
                  Landlords
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/lenders"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"
                  }
                >
                  Lenders
                </NavLink>
                <ul className="sublinks">
                  <li>
                    <NavLink to="/lenders?lender=cpc" className="nav-link">
                      CPC
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/lenders?lender=santander"
                      className="nav-link"
                    >
                      Santander
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/map"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"
                  }
                >
                  Map
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/building?bbl=3071980006">
                  Building Page for 3071980006
                </NavLink>
              </li>
              <li>
                <NavLink to="/collection?collection=ved-parkash">
                  Collection Page for Ved Parkash
                </NavLink>
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
