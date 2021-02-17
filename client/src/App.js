import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import './GlobalCSS.css'

//Import providers
import { AuthProvider } from './pages/authentication/context'
import { ServerProvider } from './pages/server/context'
import { ChatProvider } from './pages/chat/context'
import { DashProvider } from './pages/dashboard/context'
import { SideBarProvider } from './components/sidebar/context'
import { ProfileProvider } from './pages/profile/context'
import { ShopProvider } from './pages/shop/context'
import { SocketProvider } from './components/socketManager'
import { MessageProvider } from './components/messages/context'
import { ModalProvider } from './components/modal/context'

//Import Pages
import { Register } from './pages/authentication/Register'
import { Login } from './pages/authentication/Login'
import { Dashboard } from './pages/dashboard/Dashboard'
import { ServerLanding } from './pages/server/ServerLanding'
import { Stream } from './pages/stream/Stream'
import { ProfilePage } from './pages/profile/ProfilePage'
import { MyGame } from './pages/profile/MyGame'
import { Shop } from './pages/shop/Shop'
import { ShopGamePage } from './pages/shop/ShopGamePage'
import { Cart } from './pages/shop/Cart'
import { DirectMessage } from './pages/directmessage/DirectMessage'
import { Search } from './pages/search/Search'

//Import Components
import { Header } from './components/header/Header'
import { Nav } from './components/header/Nav'
import { PinnedGames } from './components/games/PinnedGames'
import { SideBar } from './components/sidebar/SideBar'
import { Modal } from './components/modal/Modal'
import { SocketMaster } from './components/socketManager/SocketMaster'

//Import Types
import { SHOW_RIGHT_SIDEBAR, SHOW_LEFT_SIDEBAR } from './components/sidebar/context/types'

import DefaultBackground from './images/DefaultBackgroundV2.png'

let user = JSON.parse(localStorage.getItem('user'))
let backgroundImage = DefaultBackground
if (user) {
    backgroundImage = user.backgroundPicture ? user.backgroundPicture : DefaultBackground
}

if (localStorage.token) {
    axios.defaults.headers.common['x-auth-token'] = localStorage.token
} else {
    delete axios.defaults.headers.common['x-auth-token']
}

function App() {
    return (
        <div className='app'>
            <AuthProvider>
                <ServerProvider>
                    <ChatProvider>
                        <ModalProvider>
                            <MessageProvider>
                                <DashProvider>
                                    <SideBarProvider>
                                        <ProfileProvider>
                                            <ShopProvider>
                                                <SocketProvider>
                                                    <Router>
                                                        <Fragment>
                                                            <Modal />
                                                            <div className='app-background' style={{ backgroundImage: `url(${backgroundImage})` }}>
                                                                <div className='app-mainGrid'>
                                                                    {/* <Header /> */}
                                                                    <Nav />
                                                                    <SideBar type={SHOW_LEFT_SIDEBAR} />
                                                                    <SocketMaster />
                                                                    <div></div>
                                                                    <div className='app-browser'>
                                                                        <Switch>
                                                                            <Route exact path='/' component={Dashboard} />
                                                                            <Route exact path='/register' component={Register} />
                                                                            <Route exact path='/login' component={Login} />
                                                                            <Route exact path='/search' component={Search} />
                                                                            <Route exact path='/shop' component={Shop} />
                                                                            <Route exact path='/shop/cart' component={Cart} />
                                                                            <Route exact path='/shop/page/:game_id' component={ShopGamePage} />
                                                                            <Route path='/server/:server_id/:channel_id' component={ServerLanding} />
                                                                            <Route path='/directchat/:profile_id' component={DirectMessage} />
                                                                            <Route path='/profile/:profile_id' component={ProfilePage} />
                                                                            <Route path='/game/:game_id' component={MyGame} />
                                                                            <Route path='/stream' component={Stream} />
                                                                        </Switch>
                                                                    </div>
                                                                    <PinnedGames />
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                    </Router>
                                                </SocketProvider>
                                            </ShopProvider>
                                        </ProfileProvider>
                                    </SideBarProvider>
                                </DashProvider>
                            </MessageProvider>
                        </ModalProvider>
                    </ChatProvider>
                </ServerProvider>
            </AuthProvider>
        </div>
    )
}

export default App
