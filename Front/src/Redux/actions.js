import {HANDLE_PUBLIC_FILTER, HANDLE_ADMIN_FILTER, HANDLE_PUBLIC_PRICE, HANDLE_ADMIN_PRICE} from './types';


export const handleSportFilter = (location, sportName) => {
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

export const handlePriceFilter = (location, smallest, largest) => {
    return async function(dispatch) {
        try {
            return dispatch({
                type: location === 'Home' ? HANDLE_PUBLIC_PRICE : HANDLE_ADMIN_PRICE,
                payload: {smallest, largest}
            })
        }
        catch (error) {
            return dispatch({type: 'ERROR', payload: error})
        }
    }
}