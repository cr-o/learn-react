import React from 'react'
import {battle} from '../utils/api' // named import since function wasn't a default export

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
        return(
            <div>
                Results
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        )
    }
}