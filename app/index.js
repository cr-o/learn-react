import React from 'react' // these are decoupled since you can render to non DOM environments, like iOS
import ReactDom from 'react-dom'
import './index.css'
// dynamically importing instead
// import Popular from './components/Popular'
// import Battle from './components/Battle'
// import Results from './components/Results'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'
// Component
// State
// Lifecycle
// UI

const Popular = React.lazy(() => import('./components/Popular'))
// invoke React.lazy. Pass it a function. That function needs to return to us a promise that resolves with a particular module or component. As in we need to return the invokation of import and we give it the path.
// Popular won't be imported when it is needed. As in, React will not import Popular until the Popular component is going to be renderd, which is when the path matches the index route exactly.
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

class App extends React.Component{ // How to define a component
    state = {
        theme: 'light',
        toggleTheme: () => { // put this on the state object itself
            this.setState(({ theme })=>({ // functional setState since it depends on previous state
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }  
    }
    render(){
        return ( // JSX that will become JavaScript invocations by Bable
            // need to stick method on object we're going to pass in (toggletheme) as value on the ThemeProvider component
            // wrapping entire app inside ThemePovider
            // also wrapping entire app inside Router. Router needs to pass any component and certain info about the route, like history and redirect and query strings. Router will use context to pass info
            // wrap the Routes with a React.Suspense and give it a fallback prop. Show fallback during loading.
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className ='container'>
                            <Nav/>
                            <React.Suspense fallback={<Loading/>}>
                                <Switch>
                                    <Route exact path='/' component={Popular} />
                                    {/* need to tell webpack that if there are any requests, instead of trying to handle them like a server would, just redirect all requests to the index page. Then from there, the index page is going to load React router, which will handle it*/}
                                    <Route exact path='/battle' component={Battle} />
                                    <Route path='/battle/results' component={Results} />
                                    {/* if you leave off a path, that route is always going to render. render allows you to inline some JSX. Because of the Switch, this only renders if none above matches */}
                                    <Route render={() => <h1>404</h1>} />
                                </Switch>
                            </React.Suspense>
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