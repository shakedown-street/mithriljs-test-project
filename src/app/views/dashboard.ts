import m from 'mithril';
import { Card } from 'construct-ui';

import { AuthService } from '../services';

export class Dashboard {
  private auth: AuthService;

  constructor(auth: AuthService) {
    this.auth = auth;
  }

  public view() {
    return [
      m('.ssContainer', {}, [
        m(
          Card,
          {
            fluid: true,
          },
          m('h2', 'Dashboard'),
          m('', 'Here is some dashboard content')
        ),
      ]),
    ];
  }
}
