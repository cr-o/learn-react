import React from 'react' // these are decoupled since you can render to non DOM environments, like iOS
import ReactDom from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import Results from './components/Results'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route } from 'react-router-dom'
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
            // also wrapping entire app inside Router. Router needs to pass any component and certain info about the route, like history and redirect and query strings. Router will use context to pass info
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className ='container'>
                            <Nav/>
                            <Route exact path='/' component={Popular} />
                            {/* need to tell webpack that if there are any requests, instead of trying to handle them like a server would, just redirect all requests to the index page. Then from there, the index page is going to load React router, which will handle it*/}
                            <Route exact path='/battle' component={Battle} />
                            <Route path='/battle/results' component={Results} />
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }    
}

ReactDom.render( // How to use/render a component. You'll likely only call this once in the whole app
    // Two arguments
    // React Element, Where to render element to
    <App />,
    document.getElementById('app')
)