import * as Actions from '../actions';

const initialState = {
    data: [],
    error: ''
};

const corretoresReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_CORRETORES:
            {
                return {
                    ...state,
                    data: action.payload.data,
                    error: ''
                };
            }
        case Actions.ERROR_MESSAGE_CORRETOR:
            {
                return {
                    ...state,
                    error: action.payload
                };
            }
        default:
            {
                return {
                    ...state,
                    error: ''
                }
            }
    }
};

export default corretoresReducer;
