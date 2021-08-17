import m from 'mithril';
import { Card } from 'construct-ui';

import { AuthService } from '../services';

export class Settings {
  private auth: AuthService;

  constructor(auth: AuthService) {
    this.auth = auth;
  }

  public view() {
    return m('.ssContainer', [
      m(
        Card,
        {
          elevation: 1,
          fluid: true,
        },
        m('h2', 'Settings'),
        m('', 'Some content on the settings card')
      ),
    ]);
  }
}
