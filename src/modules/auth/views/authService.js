const appName = "crash";

class AuthService {
  constructor() {
    this.token = window.localStorage.getItem(`${appName}_token`);
    this.user = window.localStorage.getItem(`${appName}_user`);
  }

  check() {
    return !!this.token;
  }

  setUser(user) {
    window.localStorage.setItem(`${appName}_names`, JSON.stringify(user));
    this.user = user;
  }

  removeSetUser() {
    window.localStorage.removeItem(`${appName}_user`);
  }

  login(token, user) {
    window.localStorage.setItem(`${appName}_token`, token);
    window.localStorage.setItem(`${appName}_user`, JSON.stringify(user));

    this.token = token;
    this.user = user;

    location.reload();
  }

  logout() {
    window.localStorage.removeItem(`${appName}_token`);
    window.localStorage.removeItem(`${appName}_user`);
    window.location.href = "/";
  }
  timerLogout() {
    window.localStorage.removeItem(`${appName}_token`);
    window.localStorage.removeItem(`${appName}_user`);
    window.location.href = "/";
  }
}

export default new AuthService();
