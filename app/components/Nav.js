import React from 'react'
import { ThemeConsumer } from '../contexts/theme'

export default function Nav(){
    return( // use render prop pattern
        <ThemeConsumer>
            {/* because we wrapped it in Consumer, pass whatever we pass to provider's vcalue prop to this function */}
            {({theme, toggleTheme})=>(
                <nav className='row space-between'>
                    <button
                        style={{fontSize: 30}}
                        className='btn-clear'
                        onClick={toggleTheme}
                        // whenever this button is clicked, we want to invoke our toggleTheme function which we are getting from our ThemeConsumer
                    >
                        {theme === 'light' ? '🔦' : '💡'}
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}