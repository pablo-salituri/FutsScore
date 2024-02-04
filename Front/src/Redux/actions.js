import {HANDLE_PUBLIC_FILTER, HANDLE_ADMIN_FILTER} from './types';


export const handleFilter = (location, sportName) => {
    return async function(dispatch) {
        try {
            return dispatch({
                type: location === 'Home' ? HANDLE_PUBLIC_FILTER : HANDLE_ADMIN_FILTER,
                payload: sportName
            })
        }
        catch (error) {
            return dispatch({type: 'ERROR', payload: error})
        }
    }
}