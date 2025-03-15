import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import SignUp from './pages/signup/SignUp.jsx'
import SignIn from './pages/signin/SignIn.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import Home from './pages/home/Home.jsx'
import MainLayout from './pages/MainLayout/MainLayout.jsx'
import AddPost from './pages/AddPost/AddPost.jsx'
import PrivateRoutes from './Routes/PrivateRoutes.jsx'
import Profile from './pages/Profile/Profile.jsx'

import HelpRequest from './pages/HelpRequest/HelpRequest.jsx'
import Team from './pages/Team/Team.jsx'
import TeamDetails from './pages/Profile/TeamDetails/TeamDetails.jsx'
import LeaderBoard from './pages/LeaderBoard/LeaderBoard.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path='profile' element={<Profile></Profile>} />

            <Route path='add-post' element={<PrivateRoutes><AddPost /></PrivateRoutes>} />
            <Route path='team' element={<Team></Team>} />
            <Route path='leaderboard' element={<LeaderBoard></LeaderBoard>} />
            <Route path='team/:id' element={<PrivateRoutes><TeamDetails></TeamDetails></PrivateRoutes>} />
            <Route path='helprequest' element={<PrivateRoutes><HelpRequest></HelpRequest></PrivateRoutes>} />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
          </Route>


        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
