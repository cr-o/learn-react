import React from 'react'
import {battle} from '../utils/api' // named import since function wasn't a default export
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'

function ProfileList({ profile }){
    return(
        <ul className='card-list'>
            <li>
                <FaUser color='rgb(239, 115, 115)' size={22}/>
            {profile.name}
            </li>
            {profile.location && (
                <li>
                    <FaCompass color='rgb(144, 115, 255)' size={22}/>
                    {profile.location}
                </li>
            )}
            {profile.company && (
                <li>
                    <FaBriefcase color='#795548' size={22}/>
                    {profile.company}
                </li>
            )}
            <li>
                <FaUsers color='rgb(129, 195, 245)' size={22}/>
                {profile.followers.toLocaleString()} followers
            </li>
            <li>
                <FaUserFriends color='rgb(64, 183, 95)' size={22}/>
                {profile.following.toLocaleString()} following
            </li>
        </ul>
    )
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
}

export default class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount(){
        const {
            playerOne,
            playerTwo
        } = this.props // we can get this from props since we passed it to Results component in the Battle component <Results playerOne={playerOne} playerTwo={playerTwo} />

        battle([playerOne, playerTwo]) // invoke battle with an array of players
        .then((players)=> {
            this.setState({
                winner: players[0],
                loser: players[1],
                error: null, // this would be a successful reqiest
                loading: false
            })
        }).catch(({message})=>{ // destructure the message that we're getting form the error
            this.setState({
                error: message,
                loading: false
            })
        })
    }
    render(){
        const { winner, loser, error, loading } = this.state
        if(loading === true){
            return <Loading text='Battling'/>
        }
        if(error){
            return(
                <p className='center-text error'>{error}</p>
            )
        }
        return(
            <React.Fragment>
                <div className='grid space-around container-sm'>
                {/* ----ABSTRACT THIS INTO CARD----
                    <h4 className='header-lg center-text'>
                        {loser.score === winner.score ? 'Tie' : 'Loser'}
                    </h4>
                    <img
                        className='avatar'
                        src={loser.profile.avatar_url}
                        alt={`Avatar for ${loser.profile.login}`}
                    />
                    <h4 className='center-text'>
                        Score: {winner.score.toLocaleString()}
                    </h4>                    
                    <h2 className='center-text'>
                        <a className='link' href={loser.profile.html_url}>
                            {loser.profile.login}
                        </a>
                    </h2> 
                */}
                    <Card
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        subheader={`Score: ${winner.score.toLocaleString()}`}
                        avatar={winner.profile.avatar_url}
                        href={winner.profile.html_url}
                        name={winner.profile.login}
                    >
                    {/* open Card tag up, and move the custom details in between the tags */}
                        {/* <ul className='card-list'>
                            <li>
                                <FaUser color='rgb(239, 115, 115)' size={22}/>
                            {winner.profile.name}
                            </li>
                            {winner.profile.location && (
                                <li>
                                    <FaCompass color='rgb(144, 115, 255)' size={22}/>
                                    {winner.profile.location}
                                </li>
                            )}
                            {winner.profile.company && (
                                <li>
                                    <FaBriefcase color='#795548' size={22}/>
                                    {winner.profile.company}
                                </li>
                            )}
                            <li>
                                <FaUsers color='rgb(129, 195, 245)' size={22}/>
                                {winner.profile.followers.toLocaleString()} followers
                            </li>
                            <li>
                                <FaUserFriends color='rgb(64, 183, 95)' size={22}/>
                                {winner.profile.following.toLocaleString()} following
                            </li>
                        </ul> */}
                        {/* putting above in its own component */}
                        <ProfileList profile={winner.profile}/>
                    </Card>

                    <Card
                        header={loser.score === winner.score ? 'Tie' : 'Loser'}
                        subheader={`Score: ${winner.score.toLocaleString()}`}
                        avatar={loser.profile.avatar_url}
                        href={loser.profile.html_url}
                        name={loser.profile.login}
                    >
                        <ProfileList profile={loser.profile}/>
                    </Card>
                </div>
                <button
                    onClick={this.props.onReset}
                    className='btn dark-btn btn-space'
                >
                    Reset
                </button>
            </React.Fragment>
            
        )
    }
}

Results.propTypes = {
    playerOne: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}