import m from 'mithril';

class AuthService {
  constructor() {
    this.user = null;
    if (this.isLoggedIn()) {
      this.getUser(localStorage.getItem('uid'));
    }
  }

  login({ username, password }) {
    return new Promise((resolve, reject) => {
      m.request({
        method: 'POST',
        url: 'http://localhost:8000/api/token-auth/',
        body: {
          username,
          password,
        },
      })
        .then((data) => {
          if (data && data.id && data.token) {
            localStorage.setItem('uid', data.id);
            localStorage.setItem('token', data.token);
            this.getUser(data.id);
          }
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  logout() {
    this.user = null;
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
  }

  getUser(id) {
    m.request({
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      url: `http://localhost:8000/api/users/${id}/`,
    }).then((data) => {
      this.user = data;
    });
  }

  isLoggedIn() {
    return !!localStorage.getItem('uid') && !!localStorage.getItem('token');
  }
}

export default AuthService;
