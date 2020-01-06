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