import { SET_LOGIN } from './actionTypes'

const setLogin = login => {
    return {
        type: SET_LOGIN,
        login
    }
}

export default setLogin