import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
        textAlign: 'center'
    }
}

export default class Loading extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            content: props.text
        }
    }
    componentDidMount(){
        const {speed, text} = this.props // destructure from props
        this.interval = window.setInterval(()=>{ // setInterval returns an ID value
            this.state.content === text + '...'
                ? this.setState({content: text}) // reset if three dots are reached
                : this.setState(({content})=>({content: content + '.'})) // else, add dot to whatever content used to be. this depends on the previous state so use functional setState
                // instead of accessing this.state.content, we are going to be passed content from the function that we pass to setState
        }, speed) 
    }
    componentWillUnmount(){ // so when the component unmounts, call clearInterval and pass it what setInterval returns to stop the timer
        window.clearInterval(this.interval)
    }
    render(){
        return (
            <p style={styles.content}>
                {this.state.content}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}
// give some default props in case user just wants to call Loading component as is <Loading/>
Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}