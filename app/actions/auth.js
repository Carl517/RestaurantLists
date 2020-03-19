import * as actionTypes from "./actionTypes";
import * as  API  from '../config/api';

const onLogin = data => {
  return {
    type: actionTypes.LOGIN,
    data
  };
};

export const authentication = (credential, callback) => dispatch => {
  //call api and dispatch action case

      const body = credential;      
      const request = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          url: `${API.baseUrl}`,
          method: 'post',
          body: JSON.stringify(body),
        };
      
          
      fetch(request.url, request)
        .then((res) => {
            
          if(res.ok) {
              res
              .json()
              .then((response)=> {

                console.log("--------------------------");
                console.log(response);

                if (typeof callback === "function") {
                  callback({ success: true, response:response });
                }

              })
          } else {
              dispatch({ type: actionTypes.LOGIN_ERROR });
          }
        })    
};

