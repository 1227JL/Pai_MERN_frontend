import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"

export default function RutaProtegida() {
    const { auth, cargando } = useAuth()
    
    if(cargando) return 
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
