import React from 'react'
import PropTypes from 'prop-types'
import Hover from './Hover'

const styles = {
    container: {
      position: 'relative',
      display: 'flex'
    },
    tooltip: {
      boxSizing: 'border-box',
      position: 'absolute',
      width: '160px',
      bottom: '100%',
      left: '50%',
      marginLeft: '-80px',
      borderRadius: '3px',
      backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
      padding: '7px',
      marginBottom: '5px',
      color: '#fff',
      textAlign: 'center',
      fontSize: '14px',
    }
}

export default function Tooltip ({ text, children }){
    return (
        <Hover>
            {/* children now is a function instead of a React element */}
            {(hovering)=>( // we can name this whatever we want because we're being passed it as an argument to this function
                <div style={styles.container}>
                    {hovering === true && <div style={styles.tooltip}>{text}</div>}
                    {children}
                </div>
            )}
        </Hover>
    )
}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired
    // hovering: PropTypes.bool.isRequired
}

// higher order component is just a component
// it takes in a component as its argument
// it returns a new component
// the component it returns can render the original component that was passed in (tooltip in this case)

// Tooltip actually exports an invocation of withHover
// and withHover renders a different component, WithHover
// export default withHover(Tooltip, 'hover') // second argument to avod naming collisions when using higher order components. this enables you to decide what props to pass to the component