// Root
const unifiedLogin = 'unified-login';
const fetchAccountProfile = 'fetch-account-profiles';
const switchProfile = 'switch-profiles';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  unifiedLogin: {
    root: unifiedLogin,
    fetchAccountProfile: `/${fetchAccountProfile}/:firebaseUserId`,
    switchProfile: `/${switchProfile}/switch`,
    login: `/${unifiedLogin}/login`,

  },
  dummySession: {
    root: unifiedLogin,
    login: `/${unifiedLogin}/login`,
  },
  fetchAccountProfile: {
    root: unifiedLogin,
    fetch: `/${unifiedLogin}/${fetchAccountProfile}/:firebaseUserId`
  },
  switchProfile: {
    root: unifiedLogin,
    switch: `/${unifiedLogin}/${switchProfile}/switch`
  }
};
