import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Auth0Provider
    domain="indusuno.us.auth0.com"
    clientId="DBY0hVvYFQi9SIRRbNkeUcvDxR0QprG9"
    authorizationParams={{
      redirect_uri: "https://pn7mww-3000.csb.app/home",
    }}
  >
    <App />
  </Auth0Provider>,
);
