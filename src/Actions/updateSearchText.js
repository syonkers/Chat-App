import { UPDATE_SEARCH_TEXT } from './actionTypes'

const updateSearchText = text => {
    return {
        type: UPDATE_SEARCH_TEXT,
        text
    }
}

export default updateSearchText