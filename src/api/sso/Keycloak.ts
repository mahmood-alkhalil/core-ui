import Keycloak from 'keycloak-js';
import {useSso} from "../../store/SsoStore.tsx";

const keycloak: Keycloak = new Keycloak({
  url: "https://sso.laudatur.one",
  realm: "lab",
  clientId: "core-ui",
});

try {
  const authenticated = await keycloak.init({onLoad: "login-required"});
  if (authenticated) {
    await keycloak.loadUserInfo();
    await keycloak.loadUserProfile();
    useSso.getState().setAuthenticated(authenticated);
    useSso.getState().setToken(keycloak.token ? keycloak.token : "");
    useSso.getState().setRefreshToken(keycloak.refreshToken ? keycloak.refreshToken : "");
    useSso.getState().setUserId(keycloak.subject ? keycloak.subject : "");
    useSso.getState().setInitializing(false);
  }
} catch (error) {
  useSso.getState().setInitFailed(true);
  useSso.getState().setInitializing(false);
  console.error('Failed to initialize sso adapter:', error);
}