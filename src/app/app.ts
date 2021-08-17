import m from 'mithril';
import { Button, Icons } from 'construct-ui';
import { AuthService } from './services';
import { Dashboard, Login } from './views';

let root = document.body;

// Initialize services
const authService = new AuthService();

// Define view controllers
let login: Login = null;
let dashboard: Dashboard = null;

const Nav = {
  view: () => {
    const user = authService.user;
    return [
      m('.nav', [
        m('.ssContainer', [
          m('.nav__content', [
            m('.nav__left', [m('h1.nav__title', 'My App')]),
            user &&
              m('.nav__right', [
                m('.nav__username', `${user?.username}`),
                m(Button, {
                  iconRight: Icons.LOG_OUT,
                  label: 'Logout',
                  onclick: (e) => {
                    authService.logout();
                    m.route.set('/login');
                  },
                }),
              ]),
          ]),
        ]),
      ]),
    ];
  },
};

const MainLayout = {
  view: (vnode: any) => {
    return m('.app', [m(Nav), vnode.children]);
  },
};

function redirectIfLoggedIn() {
  if (authService.isLoggedIn()) {
    m.route.set('/dashboard');
    return true;
  }
  return false;
}

function redirectIfNotLoggedIn() {
  if (!authService.isLoggedIn()) {
    m.route.set('/login');
    return true;
  }
  return false;
}

m.route(root, '/login', {
  '/login': {
    view: () => {
      if (redirectIfLoggedIn()) {
        return;
      }
      if (!login) {
        login = new Login(authService);
      }
      return m(MainLayout, [m(login)]);
    },
  },
  '/dashboard': {
    view: () => {
      if (redirectIfNotLoggedIn()) {
        return;
      }
      if (!dashboard) {
        dashboard = new Dashboard(authService);
      }
      return m(MainLayout, [m(dashboard)]);
    },
  },
});
