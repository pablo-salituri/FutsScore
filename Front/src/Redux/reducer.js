import {HANDLE_PUBLIC_FILTER/* , HANDLE_ADMIN_FILTER */} from './types';

const initialState = {
    publicFilter: {
      sports: {
        Basket: true ,
        Futbol_5: true,
        Futbol_11: true,
        Tenis: true
      },
      price: 0
    },
    adminFilter: {
      sports: {
        Basket: true ,
        Futbol_5: true,
        Futbol_11: true,
        Tenis: true
      },
      price: 0
    },
  };


const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HANDLE_PUBLIC_FILTER: {
      const updatedSports = Object.entries(state.publicFilter.sports).map(
        ([sportName, value]) => {
          return {
            [sportName]: sportName === payload ? !value : value
          };
        }
      );

      return {
        ...state,
        publicFilter: {
          ...state.publicFilter,
          sports: Object.assign({}, ...updatedSports)
        }
      };
    }

    default:
      return state;
  }
};

export default reducer