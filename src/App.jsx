import './App.css'
import CurrentUserPage from './components/СurrentUser/CurrentUserPage'
import GitHub from './components/GitHub/GitHubSearch/GitHub'
import Home from './components/HomePage/Home'
import Setting from './components/Chart/Setting/Setting'
import Header from './components/Header/Header'

import { HashRouter, Route, Routes } from 'react-router-dom'



function App() {

  return (
    <>
     
      <HashRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='gitHub' >
            <Route index element={<GitHub />} />
            <Route path=':login' element={<CurrentUserPage />} />
          </Route>
          <Route path='setting' element={<Setting />} />

       
        </Routes>

      </HashRouter>
    </>
  )
}

export default App
