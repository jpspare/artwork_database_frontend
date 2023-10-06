import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { createContext, useState } from 'react';

import routes from './config/routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import store from './redux/store';
import { auth0Config } from './config/auth0_config';
import AuthChecker from './auth/AuthChecker';

export const UserContext = createContext<any>('baseContext');

function App() {
    const [ userInfo, setUserInfo ] = useState({
      'email': window.localStorage.getItem('email'),
      'userID': window.localStorage.getItem('userID')
    });

  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <HashRouter>
        <Navbar />
          <Provider store={store}>
            <UserContext.Provider value={{userInfo, setUserInfo}}>
              <Routes>
                { routes.map((route: any, index: any) => (
                  <Route
                    key={index}
                    path={route.path}
                    element = {
                      route.protected ? (
                        <AuthChecker>
                          <route.component />
                        </AuthChecker>
                      ) : (<route.component />)
                    }
                    />
                )) }
              </Routes>
            </UserContext.Provider>
          </Provider>
        <Footer />
      </HashRouter>
    </Auth0Provider>
  )
}

export default App
