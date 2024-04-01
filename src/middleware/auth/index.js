export const middlewareLogin = () => {
  if (!window.localStorage.token && window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
  if (
    window.localStorage.token &&
    window.localStorage.user &&
    window.location.pathname === "/login"
  ) {
    window.location.href = "/";
  }
};
