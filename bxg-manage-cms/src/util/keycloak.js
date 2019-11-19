import store from '@/store/index'
import keycloakConfig from '@/config/keycloak'
import Keycloak from 'keycloak-js'
let keycloak = new Keycloak(keycloakConfig);
export default next => {
    keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
        if (authenticated) {
            store.commit('setAuthenticated', authenticated);
            store.commit('setKeyCloak', keycloak);
            // console.log(keycloak.tokenParsed.resource_access)
            setInterval(() => {
                keycloak.updateToken(30) //剩30秒刷新
                    .then(refreshed => {
                        if (refreshed) {
                            store.commit('setAuthenticated', refreshed);
                            store.commit('setKeyCloak', keycloak);
                        } else {
                            console.log('Token not refreshed, valid for ' + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
                        }
                    }).catch(() => {
                        console.log('Failed to refresh the token');
                    });
            }, 290000);
            next();
        } else {
            window.location.reload();
        }
    }).catch(function (error) {
        console.log(error)
    });
}
