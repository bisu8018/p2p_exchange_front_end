import * as types from './mutation_types'

export default {
    [types.EMAIL](state, email) {
        state.email = email
    },
    [types.ERROR_STATE](state, errorState) {
        state.errorState = errorState
    },
    [types.IS_AUTH](state, isAuth) {
        state.isAuth = isAuth
    }
}