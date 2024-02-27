import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Unauthorized from "./unauthorized";
import Loading from "./Loading";
import checkIfLogged from "../../Utils/checkIfLogged";

const ProtectedRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(checkIfLogged);
    setIsLoading(true);
  }, []);

  switch (true) {
    case isLoading:
      return <Loading />;

    case !isLogged:
      return <Unauthorized />;

    default:
      return <Outlet />;
  }
};

export default ProtectedRoutes;
