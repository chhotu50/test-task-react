import { LIST_CONTACTS,
    LIST_CONTACTS_SUCCESS,
    LIST_CONTACTS_FAILURE,
    SET_CONTACT_DEFAULTS,
} from '../actionTypes/ContactTypes';

const initialState = {
    contacts: {},
    contact: {},
    success_message: "",
    error_message: "",
    list_spinner: false,
};

const contactReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_CONTACT_DEFAULTS:
            return {
                ...state,
                contact: {...state.contact},
                contacts:{},
                success_message: "",
                error_message: "",
                list_spinner: false,
            };
        case LIST_CONTACTS:
            return {
                ...state, 
                list_spinner: true
            };
        case LIST_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.data,
                list_spinner: false
            };
        case LIST_CONTACTS_FAILURE:
            return {
                ...state,
                error_message: action.error,
                list_spinner: false
            };
        default:
            return state;
    }
};

export default contactReducer;