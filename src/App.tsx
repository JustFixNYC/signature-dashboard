import { Routes, Route, Outlet, Link } from "react-router-dom";
import { BuildingPage } from "./Components/BuildingPage/BuildingPage";
import { useRollbar } from "@rollbar/react";
import { SWRConfig } from "swr";
import { NetworkError } from "./api/error-reporting";
import { APIDocs } from "./Components/APIDocs/APIDocs";
import { Login } from "./Components/Login/Login";
import { PrivateRoutes, useAuth } from "./auth";
import "./App.scss";
import { CollectionPage } from "./Components/CollectionPage/CollectionPage";

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
            <Route index element={<>home</>} />
            <Route path="building" element={<BuildingPage />} />
            <Route path="collection" element={<CollectionPage />} />
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
  const { user, logout } = useAuth();
  return (
    <div>
      <h1>Signature Dashboard</h1>
      <div className="header-bar">
        {user && (
          <>
            <span className="user-name">Welcome, {user}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
        <Link className="api-link" to="/api_docs">
          API Docs
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/building?bbl=3071980006">
              Building Page for 3071980006
            </Link>
          </li>
          <li>
            <Link to="/collection?collection=ved-parkash">
              Collection Page for Ved Parkash
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
