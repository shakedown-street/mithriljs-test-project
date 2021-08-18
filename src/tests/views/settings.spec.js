import m from 'mithril';
import { tidy } from 'mithril-jest';
import AuthService from '../../app/services/auth.service';
import Settings from '../../app/views/settings';

describe('Settings view', () => {
  it('Should be able to inject auth service', () => {
    const authService = new AuthService();
    const ctrl = new Settings(authService);
    expect(ctrl.auth).toBeTruthy();
    expect(ctrl.auth).toBeInstanceOf(AuthService);
    expect(ctrl.auth.isLoggedIn()).toBeFalsy();
  });
});
