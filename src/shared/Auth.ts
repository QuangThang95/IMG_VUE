import store from '@/store';
import { current, navigation } from './utilities';

const auth = {

  logout() {
    localStorage.clear();
    navigation.login();
  },

  ifAuthenticated(to: any, from: any, next: any) {
    if (!auth.checkToken()) {
      navigation.login();
    } else {
      next();
    }
  },

  ifNotAuthenticated(to: any, from: any, next: any) {
    if (auth.checkToken()) {
      navigation.sshi0038();
    } else {
      next();
    }
  },

  checkToken() {
    const token = store.getters["authModule/isAuthenticated"];
    if (token)
      return true;
    return false;
  },

  requireAuth(to: any, from: any, next: any) {
    const permission = current.permission();
    if (permission) {
      if (to.meta.permission.includes(permission)) {
        next();
      } else {
        navigation.error403();
      }
    } else {
      navigation.error403();
    }
  },
};

export default auth;
