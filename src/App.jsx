import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import OlvidePassword from './pages/OlvidePassword'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import { AuthProvider } from './context/AuthProvider'
import Home from './pages/Home'
import RutaProtegida from './layouts/RutaProtegida'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}></Route>
              <Route path='registrar' element={<Registrar/>}></Route>
              <Route path='olvide-password' element={<OlvidePassword/>}></Route>
              <Route path='olvide-password/:token' element={<NuevoPassword/>}></Route>
              <Route path='confirmar/:token' element={<ConfirmarCuenta/>}></Route>
            </Route>

            <Route path='/inicio' element={<RutaProtegida/>}>
              <Route index element={<Home/>}/>
            </Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
