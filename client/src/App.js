import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './css/App.css';

//Import providers
import { AuthProvider } from './pages/authentication/context';
import { ServerProvider } from './pages/server/context';
import { ChatProvider } from './pages/chat/context';
import { DashProvider } from './pages/dashboard/context';

//Import Pages
import { Register } from './pages/authentication/Register';
import { Login } from './pages/authentication/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { ServerLanding } from './pages/server/ServerLanding';

//Import Components
import { Header } from './components/header/Header';
import { SideBar } from './components/sidebar/SideBar';
import { VoiceChat } from './components/sidebar/VoiceChat';

import DefaultBackground from './images/DefaultBackground.png';

let user = JSON.parse(localStorage.getItem('user'));
let backgroundImage = DefaultBackground;
if (user) {
  backgroundImage = user.backgroundPicture ? user.backgroundPicture : DefaultBackground;
}

if (localStorage.token) {
  axios.defaults.headers.common['x-auth-token'] = localStorage.token;
} else {
  delete axios.defaults.headers.common['x-auth-token'];
}

function App() {
  return (
    <div className='app'>
      <AuthProvider>
        <ServerProvider>
          <ChatProvider>
            <DashProvider>
              <Router>
                <Fragment>
                  <div className='app-background' style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <div className='app-mainGrid'>
                      <Header />
                      <SideBar />
                      <VoiceChat />
                      <div className='app-browser'>
                        <Switch>
                          <Route exact path='/' component={Dashboard} />
                          <Route exact path='/register' component={Register} />
                          <Route exact path='/login' component={Login} />
                          <Route path='/server/:server_id' component={ServerLanding} />
                        </Switch>
                      </div>
                      <SideBar />
                    </div>
                  </div>
                </Fragment>
              </Router>
            </DashProvider>
          </ChatProvider>
        </ServerProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
