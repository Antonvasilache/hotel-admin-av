import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. Load authenticated user
  const { isAuthenticated, isLoading, fetchStatus } = useUser();

  //2. If there is no authenticated user, redirect to the /login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && fetchStatus !== "fetching")
        navigate(`/login`);
    },
    [isAuthenticated, isLoading, navigate, fetchStatus]
  );

  //3.While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If there is a user, render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
