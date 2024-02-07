import {HANDLE_PUBLIC_FILTER, HANDLE_ADMIN_FILTER, HANDLE_PUBLIC_PRICE, HANDLE_ADMIN_PRICE} from './types';

const initialState = {
    publicFilter: {
      sports: {
        Basket: true ,
        Futbol_5: true,
        Futbol_11: true,
        Tenis: true
      },
      smallest: '',
      largest: ''
    },
    adminFilter: {
      sports: {
        Basket: true ,
        Futbol_5: true,
        Futbol_11: true,
        Tenis: true
      },
      smallest: '',
      largest: ''
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

    case HANDLE_PUBLIC_PRICE: {
      const {smallest,largest} = payload
      return {
        ...state,
        publicFilter: {
          ...state.publicFilter,
          smallest,
          largest
        }
      };
    }

    case HANDLE_ADMIN_FILTER: {
      const updatedSports = Object.entries(state.adminFilter.sports).map(
        ([sportName, value]) => {
          return {
            [sportName]: sportName === payload ? !value : value
          };
        }
      );

      return {
        ...state,
        adminFilter: {
          ...state.adminFilter,
          sports: Object.assign({}, ...updatedSports)
        }
      };
    }

    case HANDLE_ADMIN_PRICE: {
      const {smallest,largest} = payload
      return {
        ...state,
        adminFilter: {
          ...state.adminFilter,
          smallest,
          largest
        }
      };
    }

    default:
      return state;
  }
};

export default reducer