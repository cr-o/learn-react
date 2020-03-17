import React from 'react'
import {battle} from '../utils/api' // named import since function wasn't a default export

export default class Results extends React.Component {
    componentDidMount(){
        const {
            playerOne,
            playerTwo
        } = this.props // we can get this from props since we passed it to Results component in the Battle component <Results playerOne={playerOne} playerTwo={playerTwo} />

        battle([playerOne, playerTwo]) // invoke battle with an array of players
        .then((players)=> {
            console.log('data: ', players)
        })
    }
    render(){
        return(
            <div>
                Results
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        )
    }
}