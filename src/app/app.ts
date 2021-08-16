import m from 'mithril';
import { Button, Icons } from 'construct-ui';
import { AuthService } from './services';
import { Dashboard, Login } from './views';

let root = document.body;

const authService = new AuthService();

let login: Login = null;
let dashboard: Dashboard = null;

const nav = {
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

const mainLayout = {
  view: (vnode: any) => {
    return m('.app', [m(nav), vnode.children]);
  },
};

m.route(root, '/login', {
  '/login': {
    view: () => {
      if (!login) {
        login = new Login(authService);
      }
      return m(mainLayout, [login.view()]);
    },
  },
  '/dashboard': {
    view: () => {
      if (!dashboard) {
        dashboard = new Dashboard(authService);
      }
      return m(mainLayout, [dashboard.view()]);
    },
  },
});
