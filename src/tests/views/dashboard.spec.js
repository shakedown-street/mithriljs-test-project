import m from 'mithril';
import { tidy } from 'mithril-jest';
import AuthService from '../../app/services/auth.service';
import Dashboard from '../../app/views/dashboard';

describe('Dashboard view', () => {
  it('Should be able to inject auth service', () => {
    const authService = new AuthService();
    const ctrl = new Dashboard(authService);
    expect(ctrl.auth).toBeTruthy();
    expect(ctrl.auth).toBeInstanceOf(AuthService);
    expect(ctrl.auth.isLoggedIn()).toBeFalsy();
  });
});
