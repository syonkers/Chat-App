import { UPDATE_SEARCH_RESULTS } from './actionTypes'

const updateSearchResults = results => {
    return {
        type: UPDATE_SEARCH_RESULTS,
        results
    }
}

export default updateSearchResults