import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"

export default function RutaProtegida() {
    const { auth, cargando } = useAuth()
    
    if(cargando) return 'Cargando'
    return (
        <>
            {auth?._id ? (
                <div className="p-8">
                    <Header/>
                    <div className="lg:flex">
                        <main className="flex-1 mt-8">
                            <Outlet/>
                        </main>
                    </div>
                </div>
            ) : <Navigate to={'/'}/>}
        </>
    )
}
