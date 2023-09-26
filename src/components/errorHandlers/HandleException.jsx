import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import "./errors.css"

export const HandleException = () => {
    const error = useRouteError();
    let errorMessage = <></>
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
        errorMessage = <h2>It looks like the page you requested doesn't exist.</h2>
    } 
    
    if (error.status === 401) {
        errorMessage = <h2>You aren't authorized to see this</h2>;
    } 
    
    if (error.status === 503) {
        errorMessage = <h2>Looks like our API is down</h2>;
    }

  } else {
    errorMessage = <h2>Something went wrong</h2>;
  }

  return <article className="errorPage">
    <h1 className="errorPage__header">Oops!</h1>
    <section>
        {errorMessage}
    </section>
    <p>Please let us know if you feel that this is a mistake</p>
    <h4>Click <Link to={"/"}>here</Link> to return to the home page</h4>
  </article>
}