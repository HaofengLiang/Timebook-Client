import { useRouteError } from 'react-router-dom';

export default function ErrorScreen() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="errorScreen">
      <h1>Oops!</h1>
      <p>Looks like something went wrong</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
