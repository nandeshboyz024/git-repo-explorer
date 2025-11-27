import "../styles/PageNotFound.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function RateLimitExceeded() {
  return (
    <div style={{ padding: 30 }}>
      <main>
        <h1>
          4<span><FontAwesomeIcon icon={faClock} /></span>3
        </h1>
        <h2>Error: Rate Limit Exceeded</h2>
        <p>You’ve made too many requests to GitHub API.</p>
        <p>Please wait a few minutes and try again.</p>
      </main>
    </div>
  );
}
