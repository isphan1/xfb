import React from 'react'

    const authContext = React.createContext()
    const authProvider = authContext.Provider
    const authConsumer = authContext.Consumer
    
    export {authProvider,authConsumer}