import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
import { NavLink } from 'react-router-dom'
// link works, but NavLink allows us to pass some extra props to link

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

export default function Nav(){
    return( // use render prop pattern
        <ThemeConsumer>
            {/* because we wrapped it in Consumer, pass whatever we pass to provider's vcalue prop to this function */}
            {({theme, toggleTheme})=>(
                <nav className='row space-between'>
                    <ul className='row nav'>
                        <li>
                            <NavLink
                                to='/'
                                exact
                                activeStyle={activeStyle}
                                className='nav-link'
                            >
                                Popular
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/battle'
                                activeStyle={activeStyle}
                                className='nav-link'
                            >
                                Battle
                            </NavLink>
                        </li>
                    </ul>
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