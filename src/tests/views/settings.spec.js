import mq from 'mithril-query';
import AuthService from '../../app/services/auth.service';
import Settings from '../../app/views/settings';

describe('Settings view', () => {
  let authService;
  let controller;

  beforeEach(() => {
    authService = new AuthService();
    controller = new Settings(authService);
  });

  it('Should be able to inject auth service', () => {
    expect(controller.auth).toBeTruthy();
    expect(controller.auth).toBeInstanceOf(AuthService);
    expect(controller.auth.isLoggedIn()).toBeFalsy();
  });
  it('Should have a title of h2 containing "Settings"', () => {
    let out = mq(controller);
    let h2 = out.first('h2');
    expect(h2.innerHTML).toContain('Settings');
  });
});
