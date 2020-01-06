import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

function LanguagesNav({selected, onUpdateLanguage}){
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python' ]
    return(
        <ul className ='flex-center'>
            {languages.map((language) =>(
                <li key = {language}>
                    <button className='btn-clear nav-link'
                        style={language === selected ? {color: 'rgb(187, 46, 31)'}: null}
                        onClick={() => onUpdateLanguage(language)}> 
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popupar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedLanguage: 'All',
            repos : {},
            error: null
        }
        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }
    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }
    updateLanguage(selectedLanguage){
        this.setState({
            selectedLanguage,
            error: null
        })
        if(!this.state.repos[selectedLanguage]){
            fetchPopularRepos(selectedLanguage)
            .then((data)=>{
                this.setState(({repos})=>({ // pass a function in set state because we are depending on the previous dtate
                    repos: {
                        ...repos, //merging what was previously there
                        [selectedLanguage] : data
                    }
                }))
            })
            .catch(()=>{
                console.warn('Error fetching repos: ', error)
                this.setState({
                    error: `There was an error fetching the repositories`
                })
            })
        }
    }
    isLoading(){
        const { selectedLanguage, repos, error } = this.state
        return !repos[selectedLanguage] && error === null // still fetching, error is nothing, then we are loading 
    }
    render(){
        const {selectedLanguage, repos, error} = this.state
        return(
            <React.Fragment>
                <LanguagesNav
                selected={selectedLanguage}
                onUpdateLanguage={this.updateLanguage}/>
                {this.isLoading() && <p>LOADING</p>}
                {error && <p>{error}</p>}
        {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
            </React.Fragment>

        )
    }
}