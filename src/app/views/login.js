import m from 'mithril';
import { Button, Card, Form, FormGroup, FormLabel, Icon, Icons, Input } from 'construct-ui';

class Login {
  constructor(auth) {
    this.auth = auth;
    this.isSubmitting = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.isSubmitting = true;
    const target = e.target;
    const inputs = target.elements;
    const values = {};

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      values[input.name] = input.value;
    }

    this.auth
      .login({
        username: values['username'],
        password: values['password'],
      })
      .then(() => {
        this.isSubmitting = false;
        m.route.set('/dashboard');
      })
      .catch(() => {
        this.isSubmitting = false;
      });
  }

  view() {
    return m('.ssContainer', [
      m(
        Card,
        {
          style: {
            margin: '1rem auto',
            width: '288px',
          },
        },
        [
          m('h2', 'Login'),
          m(
            Form,
            {
              justify: 'center',
              onsubmit: (e) => this.handleSubmit(e),
            },
            [
              m(FormGroup, {}, [
                m(FormLabel, { for: 'username' }, 'Username'),
                m(Input, {
                  contentLeft: m(Icon, { name: Icons.USER }),
                  id: 'username',
                  name: 'username',
                  type: 'text',
                }),
              ]),
              m(FormGroup, {}, [
                m(FormLabel, { for: 'password' }, 'Password'),
                m(Input, {
                  contentLeft: m(Icon, { name: Icons.LOCK }),
                  id: 'password',
                  name: 'password',
                  type: 'password',
                }),
              ]),
              m(FormGroup, {}, [
                m(Button, {
                  iconRight: Icons.LOG_IN,
                  type: 'submit',
                  label: 'Login',
                  intent: 'primary',
                  fluid: true,
                  loading: this.isSubmitting,
                }),
              ]),
            ]
          ),
        ]
      ),
    ]);
  }
}

export default Login;
