import {
  Routes,
  Route,
  Outlet,
  NavLink,
  Link,
  useSearchParams,
} from "react-router-dom";
import { Buildings } from "./Components/Pages/Buildings/Buildings";
import { useRollbar } from "@rollbar/react";
import { SWRConfig } from "swr";
import { NetworkError } from "./api/error-reporting";
import { APIDocs } from "./Components/Pages/APIDocs/APIDocs";
import { Login } from "./Components/Pages/Login/Login";
import { PrivateRoutes } from "./auth";
import { Landlords } from "./Components/Pages/Landlords/Landlords";
import { LoanPools } from "./Components/Pages/LoanPools/LoanPools";
import { Home } from "./Components/Pages/Home/Home";
import { About } from "./Components/Pages/About/About";
import { Map } from "./Components/Pages/Map/Map";
import { EntirePortfolio } from "./Components/Pages/EntirePortfolio/EntirePortfolio";
import "./App.scss";
import { Icon } from "@justfixnyc/component-library";

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
            <Route path="entire-portfolio" element={<EntirePortfolio />} />
            <Route path="buildings" element={<Buildings />} />
            <Route path="landlords" element={<Landlords />} />
            <Route path="loan-pools" element={<LoanPools />} />
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
  const [searchParams] = useSearchParams();
  const loanPool = searchParams.get("loan-pool");
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
                  <span className="nav-link__icon">
                    <Icon icon="house" />
                  </span>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"
                  }
                >
                  <span className="nav-link__icon">
                    <Icon icon="memoPad" />
                  </span>
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
                  <span className="nav-link__icon">
                    <Icon icon="mapLocationDot" />
                  </span>
                  Map
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/buildings"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"
                  }
                >
                  <span className="nav-link__icon">
                    <Icon icon="building" />
                  </span>
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
                  <span className="nav-link__icon">
                    <Icon icon="addressCard" />
                  </span>
                  Landlords
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/loan-pools"
                  className={({ isActive }) =>
                    isActive && !loanPool
                      ? "nav-link nav-link-active"
                      : "nav-link"
                  }
                >
                  <span className="nav-link__icon">
                    <Icon icon="buildingColumns" />
                  </span>
                  Loan pools
                </NavLink>
                <ul className="sublinks">
                  <li>
                    <NavLink
                      to="/loan-pools?loan-pool=cpc"
                      className={({ isActive }) =>
                        isActive && loanPool === "cpc"
                          ? "nav-link nav-link-active"
                          : "nav-link"
                      }
                    >
                      <span className="nav-link__icon"></span>CPC
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/loan-pools?loan-pool=santander"
                      className={({ isActive }) =>
                        isActive && loanPool === "santander"
                          ? "nav-link nav-link-active"
                          : "nav-link"
                      }
                    >
                      <span className="nav-link__icon"></span> Santander
                    </NavLink>
                  </li>
                </ul>
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
