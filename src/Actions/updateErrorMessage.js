import { UPDATE_ERROR_MESSAGE } from './actionTypes'

const updateErrorMessage = errorMessage => {
    return {
        type: UPDATE_ERROR_MESSAGE,
        errorMessage
    }
}

export default updateErrorMessage