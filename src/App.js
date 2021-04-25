import React from 'react'
//import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import { StaticRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { hot } from 'react-hot-loader'
import Dashboard from "./dashboard/Dashboard";

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Dashboard/>
            </ThemeProvider>
        </BrowserRouter>
    )}

export default hot(module)(App)
