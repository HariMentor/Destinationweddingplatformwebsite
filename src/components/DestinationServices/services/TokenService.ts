const TokenService = {
  getLocalAccessToken() {
    try {
      return localStorage.getItem("access_token");
    } catch (e) {
      return null;
    }
  },
  setLocalAccessToken(token: string) {
    try {
      localStorage.setItem("access_token", token);
    } catch (e) {
      // ignore
    }
  },
  getLocalRefreshToken() {
    try {
      return localStorage.getItem("refresh_token");
    } catch (e) {
      return null;
    }
  },
  setLocalRefreshToken(token: string) {
    try {
      localStorage.setItem("refresh_token", token);
    } catch (e) {
      // ignore
    }
  },
};

export default TokenService;
