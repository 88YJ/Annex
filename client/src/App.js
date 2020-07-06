import React, { Fragment } from "react";
import "./App.css";
import "./App2.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//States
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import GameState from "./context/games/GameState";
import DashState from "./context/dash/DashState";
import ModalState from "./context/modal/ModalState";
import ServerState from "./context/server/ServerState";
import ChatState from "./context/chat/ChatState";
import ProfileState from "./context/profile/ProfileState";
import StoreState from "./context/store/StoreState";
import VoiceChatState from "./context/voicechat/VoicechatState";
//AuthRoutes
import PrivateRoute from "./components/routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";

//Pages
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dash from "./components/pages/Dash";
import About from "./components/pages/About";
import Game from "./components/pages/Game";
import ChannelPage from "./components/pages/ChannelPage";
import Store from "./components/pages/Store";
import FindServers from "./components/pages/FindServers";
import ProfileSearch from "./components/pages/ProfileSearch";
import ProfilePage from "./components/pages/ProfilePage";
import NewChat from "./components/chatbox/Chat";
import DMChat from "./components/pages/DMChat";
import RedirectChat from "./components/redirect/RedirectChat";
import StoreGamePage from "./components/pages/StoreGamePage";
import Cart from "./components/pages/Cart";
import ServerLanding from "./components/pages/ServerLanding";

//layouts
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import Serverlist from "./components/layout/Serverlist";
import RightSidebar from "./components/layout/RightSidebar";
import LeftSidebar from "./components/layout/LeftSidebar";
import Modal from "./components/layout/Modal";
import DefaultBackground from "./components/layout/Annexbackground.png";

let background = null;

if (localStorage.token) {
 setAuthToken(localStorage.token);
 console.log("profile pic" + localStorage.profilepic);

 background = localStorage.profilepic;
} else {
 background = DefaultBackground;
}

const App = () => {
 return (
  <div className='app'>
   <AuthState>
    <GameState>
     <AlertState>
      <ModalState>
       <DashState>
        <StoreState>
         <ChatState>
          <ServerState>
           <ProfileState>
            <VoiceChatState>
             <Router>
              <Fragment>
               <Navbar />
               <Alerts />
               <Modal />
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
                    <Route
                     exact
                     path='/redirectchat'
                     component={RedirectChat}
                    />
                    <Route path='/chat' component={NewChat} />
                    <Route path='/serverlanding' component={ServerLanding} />
                    <Route path='/cart' component={Cart} />
                    <Route path='/dmchat' component={DMChat} />
                    <Route exact path='/' component={Dash} />
                    <Route exact path='/store' component={Store} />
                    <Route exact path='/findservers' component={FindServers} />
                    <Route exact path='/server' component={ChannelPage} />
                    <PrivateRoute exact path='/about' component={About} />
                    <Route exact path='/game' component={Game} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route
                     exact
                     path='/profilesearch'
                     component={ProfileSearch}
                    />
                    <Route exact path='/profilepage' component={ProfilePage} />
                    <Route
                     exact
                     path='/storegamepage'
                     component={StoreGamePage}
                    />
                   </Switch>
                  </div>
                 </div>
                 <RightSidebar />
                </div>
                <Serverlist />
               </div>
              </Fragment>
             </Router>
            </VoiceChatState>
           </ProfileState>
          </ServerState>
         </ChatState>
        </StoreState>
       </DashState>
      </ModalState>
     </AlertState>
    </GameState>
   </AuthState>
  </div>
 );
};

export default App;
