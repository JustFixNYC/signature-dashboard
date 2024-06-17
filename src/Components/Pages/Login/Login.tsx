import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useContext(AuthContext);

  interface LocationState {
    from: {
      pathname: string;
      search: string;
    };
  }

  const fromPath = (location.state as LocationState)?.from?.pathname || "/";
  const queryParams = (location.state as LocationState)?.from?.search || "";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;

    login(password, () => {
      navigate(`${fromPath}${queryParams}`, { replace: true });
    });
  }

  return (
    <div className="container">
      <p>You must log in to view the dashboard</p>
      <form onSubmit={handleSubmit}>
        <label>
          Password: <input name="password" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
        <div style={{ marginTop: ".5rem", fontSize: ".9rem" }}>
          (hint: try "organizer" or "tenantsunion")
        </div>
      </form>
    </div>
  );
};
