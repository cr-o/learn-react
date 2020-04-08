import React from 'react'

    export default class Hover extends React.Component{ // turned into a class. Render Prop gets rid of middleman function.
        state = { hovering: false}
        mouseOver = () => this.setState({ hovering: true })
        mouseOut = () => this.setState({ hovering: false })
        render(){
            //can get rid of this because consumer of this componetn can name this whatever they want
            // const props = {
            //     [propName]: this.state.hovering, //ES6 computed property name
            //     ...this.props // also spread all other props
            // }
            return (
                <div
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                >
                    {this.props.children(this.state.hovering)}
                    {/* <Component {...props}/> */}
                    {/* need to object spread this.props to the Component being rendered. else all the props being passed to WithHover will not pass through to the Compoment (eg. ToolTip) */}
                </div>
            )
        }
    }
