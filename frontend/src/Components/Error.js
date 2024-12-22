import React from 'react';
import { useRouteError } from 'react-router';

const Error= () => {

  const error = useRouteError();
  
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>The page you are looking for doesn't exist or an error occurred.</p>
      <p><strong>Error Message:</strong> {error?.statusText || error?.message}</p>
      {error?.status && <p><strong>Status Code:</strong> {error.status}</p>}
    </div>
  );
};

export default Error;

