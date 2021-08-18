import m from 'mithril';
import { Card } from 'construct-ui';

class Settings {
  constructor(auth) {
    this.auth = auth;
  }

  view() {
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

export default Settings;
