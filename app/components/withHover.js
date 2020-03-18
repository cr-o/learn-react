import React from 'react'

export default function withHover(Component, propName = 'hovering'){ // ES6 default parmeter
    return class WithHover extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                hovering: false
            }
            this.mouseOver = this.mouseOver.bind(this)
            this.mouseOut = this.mouseOut.bind(this)
        }
    
        mouseOver(){
            this.setState({
                hovering: true
            })
        }
        mouseOut(){
            this.setState({
                hovering: false
            })
        }
        render(){
            const props = {
                [propName]: this.state.hovering, //ES6 computed property name
                ...this.props // also spread all other props
            }
            return (
                <div
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}
                >
                    <Component {...props}/>
                    {/* need to object spread this.props to the Component being rendered. else all the props being passed to WithHover will not pass through to the Compoment (eg. ToolTip) */}
                </div>
            )
        }
    }
}