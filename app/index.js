import React from 'react' // these are decoupled since you can render to non DOM environments, like iOS
import ReactDom from 'react-dom'
import './index.css'
// Component
// State
// Lifecycle
// UI

class App extends React.Component{ // How to define a component
    render(){
        return ( // JSX that will become JavaScript invocations by Bable
            <div>
                Hello World!
            </div>
        )
    }    
}

ReactDom.render( // How to use/render a component. You'll likely only call this once in the whole app
    // Two arguments
    // React Element, Where to render element to
    <App />,
    document.getElementById('app')
)