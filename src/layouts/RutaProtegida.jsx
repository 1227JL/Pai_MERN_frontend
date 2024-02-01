import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Spinner from "../components/Spinner"

export default function RutaProtegida() {
    const { auth, cargando } = useAuth()
    
    if(cargando) return <div className="mt-56"><Spinner>Autenticando...</Spinner></div>
    return (
        <>
            {auth?._id ? (
                <div>
                    <Header/>
                    <div className="lg:flex">
                        <main className="flex-1 px-8 py-5">
                            <Outlet/>
                        </main>
                    </div>
                </div>
            ): <Navigate to={'/'}/>}
        </>
    )
}
