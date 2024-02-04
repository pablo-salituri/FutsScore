import {HANDLE_PUBLIC_FILTER/* , HANDLE_ADMIN_FILTER */} from './types';

const initialState = {
    publicFilter: {
      sports: [
        { Basket: true },
        { Futbol_5: true },
        { Futbol_11: true },
        { Tenis: true }
      ],
      price: 0
    },
    adminFilter: {
      sports: [
        { basket: true },
        { futbol_5: true },
        { futbol_11: true },
        { tenis: true }
      ],
      price: 0
    }
  };


const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HANDLE_PUBLIC_FILTER:{
      const updatedSports = state.publicFilter.sports.map((sport) => {
        const sportName = Object.keys(sport)[0];
        return {
          [sportName]: sportName === payload ? !sport[sportName] : sport[sportName]
        };
      });

      return {
        ...state,
        publicFilter: {
          ...state.publicFilter,
          sports: updatedSports
        }
      }
    }

    default:
      return state;
  }
};

export default reducer