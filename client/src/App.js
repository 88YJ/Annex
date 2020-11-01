import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './css/App.css';
import './css/App2.css';
import './css/AppNew.css';

//Import providers
import { AuthProvider } from "./pages/authentication/context";
import { ServerProvider } from "./pages/server/context";
import { ChatProvider } from "./pages/chat/context"

//Import Pages
import { Register } from './pages/authentication/Register';
import { Login } from './pages/authentication/Login';
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ServerLanding } from "./pages/server/ServerLanding";

//Import Components
import { Header } from './components/header/Header';
import { ChannelList } from "./components/sidebar/ChannelList";
import { VoiceChat } from "./components/sidebar/VoiceChat";

import DefaultBackground from "./images/AnnexBackground.png";

let user = JSON.parse(localStorage.getItem("user"));

let sidebarwidth = 250;
let backgroundImage = user ? user.backgroundPicture : DefaultBackground;

if (localStorage.token) {
  axios.defaults.headers.common['x-auth-token'] = localStorage.token;
} else {
  delete axios.defaults.headers.common['x-auth-token'];
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ServerProvider>
          <ChatProvider>
            <Router>
              <Fragment>
                <div className='img' style={{ backgroundImage: `url(${backgroundImage})`, }} >
                  <div className='grid' style={{ gridTemplateColumns: `60px 250px auto ${sidebarwidth}px`, }}>
                    <Header />
                    <ChannelList />
                    <VoiceChat />
                    <div className='browser'>
                      <div className='dash'>
                        <Switch>
                          <Route exact path='/' component={Dashboard} />
                          <Route exact path='/register' component={Register} />
                          <Route exact path='/login' component={Login} />
                          <Route path='/server/:server_id' component={ServerLanding} />
                        </Switch>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            </Router>
          </ChatProvider>
        </ServerProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
