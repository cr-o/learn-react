import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'
import { ThemeConsumer } from  '../contexts/theme'
import { Link } from 'react-router-dom'

function Instructions(){
    return(
        <ThemeConsumer>
            {({ theme }) => (
                <div className ='insturctions-container'>
                    <h1 className='center-text header-lg'>
                        Instructions
                    </h1>
                    <ol className="container-sm grid center-text battle-instructions">
                        <li>
                            <h3 className='header-sm'> Enter two Github users</h3>
                            <FaUserFriends className={`bg-${theme}`} color='rgb(255, 191, 116)' size={140} />
                        </li>
                        <li>
                            <h3 className='header-sm'>Battle</h3>
                            <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
                        </li>
                        <li>
                            <h3 className='header-sm'>See the winners</h3>
                            <FaTrophy className={`bg-${theme}`} color='rgb(255, 215, 0)' size={140} />
                        </li>
                    </ol>
                </div>
            )}
            
        </ThemeConsumer>
    )
}

// using classField instead
class PlayerInput extends React.Component { // to get username from input field
    // render this inside Battle, pass it a prop
    // whenever the form is submitted, the onSubmit function is invoked, passing the username
    state = {
        username: ''
    }
    handleSubmit = (event) => {
        event.preventDefault() // because we don't want any of the normal browser events to take place 
        this.props.onSubmit(this.state.username); // this is how username is retrieved for player inside battle component
    }
    handleChange = (event) => {
        this.setState({ // user will type something in input field, handleCHange is invoked by React, then get value form event and set state and rerender component, which changes value of input field
            username: event.target.value
        })
    }
    render(){
        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <form className='column player' onSubmit={this.handleSubmit}>
                        {/* whenever this form is submitted, handleSubmit is going to be invoked */}
                        <label htmlFor = 'username' className='player-label'>
                            {this.props.label}
                        </label>
                        <div className='row player-inputs'>
                            <input
                                type='text'
                                id='username'
                                className={`input-${theme}`}
                                placeholder='github username'
                                autoComplete='off'
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <button
                                className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
                                type='submit'
                                disabled={!this.state.username}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </ThemeConsumer>
        )
    }
}

// class PlayerInput extends React.Component { // to get username from input field
//     // render this inside Battle, pass it a prop
//     // whenever the form is submitted, the onSubmit function is invoked, passing the username 
//     constructor(props){
//         super(props);
//         this.state = {
//             username: ''
//         }
//         this.handleSubmit = this.handleSubmit.bind(this)
//         this.handleChange = this.handleChange.bind(this)
//     }
//     handleSubmit(event){
//         event.preventDefault() // because we don't want any of the normal browser events to take place 
//         this.props.onSubmit(this.state.username); // this is how username is retrieved for player inside battle component
//     }
//     handleChange(event){
//         this.setState({ // user will type something in input field, handleCHange is invoked by React, then get value form event and set state and rerender component, which changes value of input field
//             username: event.target.value
//         })
//     }
//     render(){
//         return (
//             <ThemeConsumer>
//                 {({ theme }) => (
//                     <form className='column player' onSubmit={this.handleSubmit}>
//                         {/* whenever this form is submitted, handleSubmit is going to be invoked */}
//                         <label htmlFor = 'username' className='player-label'>
//                             {this.props.label}
//                         </label>
//                         <div className='row player-inputs'>
//                             <input
//                                 type='text'
//                                 id='username'
//                                 className={`input-${theme}`}
//                                 placeholder='github username'
//                                 autoComplete='off'
//                                 value={this.state.username}
//                                 onChange={this.handleChange}
//                             />
//                             <button
//                                 className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
//                                 type='submit'
//                                 disabled={!this.state.username}
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </form>
//                 )}
//             </ThemeConsumer>
//         )
//     }
// }

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

function PlayerPreview({ username, onReset, label}){
    return(
        <ThemeConsumer>
            {({ theme }) => (
                <div className='column player'>
                    <h3 className='player-label'>{label}</h3>
                    <div className={`row bg-${theme}`}>
                        <div className='player-info'>
                            <img
                                className='avatar-small'
                                src={`https://github.com/${username}.png?size=200`}
                                alt={`Avatar for ${username}`}
                            />
                            <a
                                href={`https://github.com/${username}`}
                                className='link'>
                                {username}
                            </a>
                        </div>
                        <button className='btn-clear flex-center' onClick={onReset}>
                            <FaTimesCircle color='rgc(194, 57, 42)' size={26} />
                        </button>
                    </div>
                </div>
            )}
        </ThemeConsumer>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default class Battle extends React.Component{
    state = {
        playerOne: null,
        playerTwo: null
    }
    handleSubmit = (id, player) => {
        this.setState({
            [id]: player // ES6 computed property name. lets you have an expression to be computed as a property name
        })
    }
    handleReset = (id) => {
        this.setState({
            [id]: null
        })
    }
    render(){
        const { playerOne, playerTwo } = this.state
        // move out of state
        // if(battle === true){
        //     return(
        //         // we want to reset the state inside of Results UI (at button)
        //         // so we define where the button lives, which is here, inside of Battle
        //         // and pass a prop to where the function is going to be invoked, which is inside of Results (at button)
        //         // the prop that we're passing is a function
        //         <Results
        //             playerOne={playerOne}
        //             playerTwo={playerTwo}
        //             onReset={()=>this.setState({
        //                 playerOne: null,
        //                 playerTwo: null,
        //                 battle: false
        //             })}
        //         />
        //     )
        //     // results will receive those players as props and then it will fetch the info from the gitHub API
        // }

        return (
            <React.Fragment>
                <Instructions/>
                <div className='players-container'>
                    <h1 className='center-text header-lg'>Players</h1>
                    <div className='row space-around'>
                        {/* changing to ternary operator for conditional */}
                        {playerOne === null
                            ? <PlayerInput
                                label='Player One'
                                onSubmit={(player)=>this.handleSubmit('playerOne', player)} // onSubmit is a prop to PlayerInput
                            />
                            : <PlayerPreview
                                username={playerOne}
                                label='Player One'
                                onReset={()=>this.handleReset('playerOne')}
                            />
                        }
                        {playerTwo === null
                            ? <PlayerInput
                                label='Player Two'
                                onSubmit={(player)=>this.handleSubmit('playerTwo', player)}
                            />
                            : <PlayerPreview
                                username={playerTwo}
                                label='Player Two'
                                onReset={()=>this.handleReset('playerTwo')}
                            />
                        }
                    </div>
                    {/* we want to show the button when both playerOne and playerTwo are not null */}
                    {/* change button to link */}
                    {playerOne && playerTwo && (
                        <Link
                            className='btn dark-btn btn-space'
                            to={{
                                pathname: '/battle/results',
                                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                            }}
                        >
                            Battle
                        </Link>
                    )}
                </div>
            </React.Fragment>
        )
    }
}