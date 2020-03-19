import React from 'react' // these are decoupled since you can render to non DOM environments, like iOS
import ReactDom from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import { ThemeProvider } from './contexts/theme'
// Component
// State
// Lifecycle
// UI

class App extends React.Component{ // How to define a component
    constructor(props){
        super(props)

        this.state = {
            theme: 'light',
            toggleTheme: () => { // put this on the state object itself
                this.setState(({ theme })=>({ // functional setState since it depends on previous state
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }  
        }
    }
    render(){
        return ( // JSX that will become JavaScript invocations by Bable
            // need to stick method on object we're going to pass in (toggletheme) as value on the ThemeProvider component
            // wrapping entire app inside ThemePovider
            <ThemeProvider value={this.state}>
                <div className ='container'>
                    <Battle />
                </div>
            </ThemeProvider>
        )
    }    
}

ReactDom.render( // How to use/render a component. You'll likely only call this once in the whole app
    // Two arguments
    // React Element, Where to render element to
    <App />,
    document.getElementById('app')
)