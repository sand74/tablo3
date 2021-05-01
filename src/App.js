import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { hot } from 'react-hot-loader'
import MainLayout from "./tablo/MainLayout";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <ErrorBoundary>
                    <MainLayout/>
                </ErrorBoundary>
            </ThemeProvider>
        </BrowserRouter>
    )}

export default hot(module)(App)
