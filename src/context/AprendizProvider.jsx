import { createContext } from "react";

const AprendizContext = createContext()

const AprendizProvider = async () => {
    return (
        <AprendizContext.Provider 
            value={{

            }}
        />
        
    )
}


export {
    AprendizProvider
}

export default AprendizContext