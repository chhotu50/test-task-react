import { LIST_CONTACTS, LIST_CONTACTS_SUCCESS, LIST_CONTACTS_FAILURE, SET_CONTACT_DEFAULTS } from "../actionTypes/ContactTypes";

import Contact from "../../apis/Contact";

function setContactDefaults() {
  return function (dispatch, getState) {
    dispatch({
      type: SET_CONTACT_DEFAULTS,
    });
  };
}

/**
 * list contacts action
 */
function listContact(params) {
  return function (dispatch, getState) {
    dispatch({
      type: LIST_CONTACTS,
    });
    Contact.list(params)
      .then((response) => {
        const data = response.data.contacts;
        if(data && Object.keys(data).length !== 0){
          response.data['formatedContactData'] = Object.keys(data).map((key) => data[key]);
        }
        dispatch({
          type: LIST_CONTACTS_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: LIST_CONTACTS_FAILURE,
            error: error.response.data,
          });
        } else {
          dispatch({
            type: LIST_CONTACTS_FAILURE,
            error: error?.message?error?.message:'Something went wrong',
          });
        }
      });
  };
}


export { listContact, setContactDefaults };
