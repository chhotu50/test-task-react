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
            error: "Error",
          });
        }
      });
  };
}


export { listContact, setContactDefaults };
