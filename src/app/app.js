import m from 'mithril';
import { Button, Icons, Intent, MenuItem, PopoverMenu } from 'construct-ui';

import { AuthService } from './services';
import { Dashboard, Login, Settings } from './views';

import 'construct-ui/lib/index.css';
import '../scss/app.scss';

let root = document.body;

// Initialize services
const authService = new AuthService();

// Define view controllers
let loginController;
let dashboardController;
let settingsController;

const Nav = {
  view: () => {
    const user = authService.user;
    return [
      m('.nav', [
        m('.ssContainer', [
          m('.nav__content', [
            m('.nav__left', [
              m(
                'h1.nav__title',
                {
                  style: {
                    cursor: 'pointer',
                  },
                  onclick: (e) => m.route.set('/'),
                },
                'My App'
              ),
            ]),
            user &&
              m('.nav__right', [
                m(PopoverMenu, {
                  content: [
                    m(MenuItem, {
                      iconLeft: Icons.USER,
                      label: `${user?.username}`,
                      onclick: (e) => {
                        m.route.set('/settings');
                      },
                    }),
                    m(MenuItem, {
                      iconLeft: Icons.LOG_OUT,
                      label: 'Logout',
                      onclick: (e) => {
                        authService.logout();
                        m.route.set('/login');
                      },
                    }),
                  ],
                  trigger: m(Button, {
                    intent: Intent.PRIMARY,
                    iconLeft: Icons.USER,
                  }),
                }),
              ]),
          ]),
        ]),
      ]),
    ];
  },
};

const MainLayout = {
  view: (vnode) => {
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
      if (!loginController) {
        loginController = new Login(authService);
      }
      return m(MainLayout, [m(loginController)]);
    },
  },
  '/dashboard': {
    view: () => {
      if (redirectIfNotLoggedIn()) {
        return;
      }
      if (!dashboardController) {
        dashboardController = new Dashboard(authService);
      }
      return m(MainLayout, [m(dashboardController)]);
    },
  },
  '/settings': {
    view: () => {
      if (redirectIfNotLoggedIn()) {
        return;
      }
      if (!settingsController) {
        settingsController = new Settings(authService);
      }
      return m(MainLayout, [m(settingsController)]);
    },
  },
});
