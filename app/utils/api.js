const id = "YOUR_CLIENT_ID"
const sec = "YOUR_SECRET_ID"
const params = `?client_id=${id}&client_secret=${sec}`

function getErrorMsg(message, username){
    if(message === 'Not Found'){
        return `${username} doesn't exist`
    }
}

function getProfile(username){
    return fetch(`https://api.github.com/users/${username}${params}`)
    .then((res)=>res.json())
    .then((profile)=>{
        if(profile.message){
            throw new Error(getErrorMsg(profile.message, username)) // in UI you want to show user what error occured
        }
        return profile
    })
}

function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then((res)=>res.json()) // call json on api call result
    .then((repos)=>{ // it gives back repos
        if(repos.message){ // if it has error message
            throw new Error(getErrorMsg(repos.message, username)) // no need to return since throw automatically returns; above is same
        }
        return repos
    })
}

function calculateScore(followers, repos){
    return (followers*3) + getStarCount(repos)
}

function getStarCount(repos){ // array of repos, each repos as property stargazers_count
    return repos.reduce((count, {stargazers_count})=>count+stargazers_count,0) // reduce lets you convert the repositories into a single number
    // for each repo in the repos array, the above function inside reduce will be invoked
    // each time it is invoked, count is going be what the previous function returned. initial value is 0
}

function getUserData(player){
    return Promise.all([ // pass array of promises
        getProfile(player), // returns profiles
        getRepos(player) // returns repositories
        // array destructuring
    ]).then(([profile, repos])=>({ // once the array of promises resolves, this function is called. it is passed an array
        profile, // first item in the array is whatever the first in before array returns (getProfile).
        score: calculateScore(profile.followers, repos)
        // implicit return of an object with a profile and a score. implicit returns must be wrapped in parenthesis
    }))
}

function sortPlayers(players){
    return players.sort((a,b) => b.score - a.score) // sort by each's score property to have first item be the one with higher score
}

export function battle(players){
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1]) // Promises.all will return an array that we will call results
    ]).then((results)=>sortPlayers(results))
}

export function fetchPopularRepos(language){
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint) // make a request
    .then((res)=>res.json()) // turn response into json
    .then((data)=>{
        if(!data.items){ // if there aren't any items
            throw new Error (data.message) // throw an error with the error message
        }
        return data.items
    })
}