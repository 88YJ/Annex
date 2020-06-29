import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//States
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import GameState from './context/games/GameState';
import ServerlistState from './context/serverlists/ServerlistState';
import DashState from './context/dash/DashState';
import ModalState from './context/modal/modalState';
import ServerState from './context/server/serverState';
import ChatState from './context/chat/ChatState';

//AuthRoutes
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';

//Pages
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dash from './components/pages/Dash';
import About from './components/pages/About';
import Game from './components/pages/Game';
import ServerPage from './components/pages/ServerPage';
import Store from './components/pages/Store';
import Chat from './components/pages/Chat';

//layouts
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Serverlist from './components/layout/Serverlist';
import RightSidebar from './components/layout/RightSidebar';
import LeftSidebar from './components/layout/LeftSidebar';
import Logo from './components/layout/Logo.jpg';

let background = null;

if (localStorage.token) {
 setAuthToken(localStorage.token);

 background = 'https://images2.alphacoders.com/928/thumb-1920-928971.jpg';
} else {
 background = 'https://wallpaperset.com/w/full/7/e/3/180293.jpg';
}

const App = () => {
 return (
  <div className='app'>
   <AuthState>
    <ServerlistState>
     <GameState>
      <AlertState>
       <ModalState>
        <DashState>
         <ChatState>
          <ServerState>
           <Router>
            <Fragment>
             <Navbar />
             <Alerts />
             <div
              className='img'
              style={{
               backgroundImage: `url(${background})`,
              }}
             >
              <div className='grid'>
               <LeftSidebar />
               <div className='browser'>
                <div className='dash'>
                 <Switch>
                  <Route exact path='/' component={Dash} />
                  <Route exact path='/store' component={Store} />
                  <Route exact path='/chat' component={Chat} />
                  <Route exact path='/server' component={ServerPage} />
                  <PrivateRoute exact path='/about' component={About} />
                  <Route exact path='/game' component={Game} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                 </Switch>
                </div>
               </div>
               <RightSidebar />
              </div>
              <Serverlist />
             </div>
            </Fragment>
           </Router>
          </ServerState>
         </ChatState>
        </DashState>
       </ModalState>
      </AlertState>
     </GameState>
    </ServerlistState>
   </AuthState>
  </div>
 );
};

export default App;
