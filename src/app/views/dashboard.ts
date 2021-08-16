import m from 'mithril';
import 'construct-ui/lib/index.css';

import { AuthService } from '../services';

export class Dashboard {
  private auth: AuthService;

  constructor(auth: AuthService) {
    this.auth = auth;
    console.log('dashboard controller init');
  }

  view() {
    if (!this.auth.isLoggedIn()) {
      m.route.set('/login');
      return null;
    }
    return [m('.ssContainer', [m('h1', 'You made it to the dashboard!')])];
  }
}
