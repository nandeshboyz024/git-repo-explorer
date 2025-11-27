import "../styles/PageNotFound.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost } from "@fortawesome/free-solid-svg-icons";

export default function PageNotFound() {
  return (
    <div style={{ padding: 30 }}>
        <main>
            <h1>
                4<span><FontAwesomeIcon icon={faGhost} /></span>4
            </h1>
            <h2>Error: 404 page not found</h2>
            <p>Sorry, the page you're looking for cannot be accessed</p>
            </main>
    </div>
  );
}