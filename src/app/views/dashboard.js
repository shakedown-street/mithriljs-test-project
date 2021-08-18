import m from 'mithril';
import { Card } from 'construct-ui';

class Dashboard {
  constructor(auth) {
    this.auth = auth;
  }

  view() {
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

export default Dashboard;
