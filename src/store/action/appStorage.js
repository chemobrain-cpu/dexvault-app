import axios from 'axios';
export const FORCEUSERIN = "FORCEUSERIN";
export const CREATE_PASSCODE = "CREATED_PASSCODE";
export const LOGIN = 'LOGIN';
export const CHANGE_BLACK = 'CHANGE_BLACK';
export const CHANGE_WHITE = 'CHANGE_WHITE';


// Calculates how much time (in ms) is left until the expiry timestamp
let calculateRemainingTime = (hoursUntilExpiry) => {
  const currentTime = new Date().getTime();
  const expirationTime = currentTime + hoursUntilExpiry * 60 * 60 * 1000; // Convert hours to milliseconds
  const timeLeft = expirationTime - currentTime; // Time left in milliseconds
  return Math.max(timeLeft, 0); // Ensure non-negative result
};

// Function to retrieve admin token and check its validity
let retrievedAdminStoredToken = () => {
  const tokenFromStorage = localStorage.getItem('token');
  const expiryDate = localStorage.getItem('expiry'); // This should be a timestamp


  if (!expiryDate) {
    return {
      token: "",
      expiresIn: ""
    };
  }

  const timeLeft = calculateRemainingTime(Number(expiryDate)); // Ensure expiryDate is a number

  if (timeLeft <= 1000) {
    // Less than or equal to 1 hour
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    localStorage.removeItem('user');

    return {
      token: "",
      expiresIn: ""
    };
  }

  return {
    token: tokenFromStorage,
    expiresIn: timeLeft
  };
}

export const checkIfIsLoggedIn = () => {
  return async (dispatch, getState) => {
    let backgroundColorStyle = localStorage.getItem('@backgroundColorStyle');
    if (!backgroundColorStyle) {
      let data = {
        background: 'black',
        importantText: 'white',
        normalText: '#5d616d',
        fadeColor: 'rgb(30,30,30)',
        blue: 'rgb(37, 99, 235)',
        fadeButtonColor: 'rgb(30,30,30)',
      };
      dispatch({ type: CHANGE_BLACK, payload: data });
    } else if (backgroundColorStyle === 'white') {
      let data = {
        background: 'white',
        importantText: 'black',
        normalText: '#5d616d',
        fadeColor: 'rgb(240,240,240)',
        blue: 'rgb(37, 99, 235)',
        fadeButtonColor: 'rgb(200,200,200)',
      };
      dispatch({ type: CHANGE_WHITE, payload: data });
    } else if (backgroundColorStyle === 'black') {
      let data = {
        background: 'black',
        importantText: 'white',
        normalText: '#5d616d',
        fadeColor: 'rgb(30,30,30)',
        blue: 'rgb(37, 99, 235)',
        fadeButtonColor: 'rgb(30,30,30)',
      };
      dispatch({ type: CHANGE_BLACK, payload: data });
    }

    try {
      let response;
      let { token, expiresIn } = await retrievedAdminStoredToken ();

      if (!token) {
        return {
          bool: false,
          message: 'no token',
        };
      }

      expiresIn = expiresIn / (60 * 60 * 1000);
      localStorage.setItem('expiry', `${expiresIn}`);
      localStorage.setItem('token', token);
      let userId = localStorage.getItem('userId');

      if (!userId) {
        return {
          bool: false,
          message: 'no stored user',
        };
      }

      response = await fetch(`https://dexvault-backend.onrender.com/userbytoken`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`,
        },
      });

      if (response.status === 200) {
        
        let data = await response.json();
        let res = {
          user: data.response.user,
          token: token,
          expiresIn:expiresIn
        };

        localStorage.setItem('userId', data.response.user._id);
        dispatch({ type: FORCEUSERIN, payload: res });
        return {
          bool: true,
          message: res,
        };
      }

      if (response.status === 300) {
      
        let data = await response.json();
        return {
          bool: false,
          message: data.response,
        };
      }
      if (response.status === 404) {
       
        let data = await response.json();
        return {
          bool: false,
          message: data.response,
        };
      }
    } catch (err) {
      return {
        bool: false,
        message: err.message,
      };
    }
  };
};


//login handler
export const authenticate = (data) => {

  return async (dispatch, getState) => {
    try {

      let response = await fetch('https://dexvault-backend.onrender.com/authenticate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 422) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }
      if (response.status === 500) {

        let data = await response.json()
        return {
          bool: false,
          message: data.response,

        }
      }

      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 201) {

        let data = await response.json()
        return {
          bool: true,
          url: 'password'
        }
      }
      if (response.status === 202) {

        let data = await response.json()
        return {
          bool: true,
          url: 'passcode'
        }
      }

      if (response.status === 200) {

        let data = await response.json()

        return {
          bool: true,
          url: 'verification',
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: err.message,

      }
    }

  }
}

export const verifyEmail = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://dexvault-backend.onrender.com/verifyemail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response.message,
        }
      }

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response.message,
        }
      }

      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response.message,
        }
      }

      if (response.status === 500) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response.message,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        //dispatching the LOGIN action
        localStorage.setItem('expiry', `${data.response.expiresIn}`);
        localStorage.setItem('token', data.response.token);
        localStorage.setItem('userId', data.response.user._id);

        dispatch({ type: LOGIN, payload: data.response })

        //dispatch login 
        return {
          bool: true,
          message: data.response,
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: err.message,
      }
    }

  }
}



export const createPasscode = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://dexvault-backend.onrender.com/createpasscode', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response.message,
        }
      }

      if (response.status === 200) {
        let data = await response.json()


        localStorage.setItem('expiry', `${data.response.expiresIn}`);
        localStorage.setItem('token', data.response.token);
        localStorage.setItem('userId', data.response.user._id);

        dispatch({ type: LOGIN, payload: data.response })
        //dispatch login 
        return {
          bool: true,
          message: data.response,
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: err.message,
      }
    }

  }
}

export const checkPasscode = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://dexvault-backend.onrender.com/checkpasscode', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }
      if (response.status === 401) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 500) {
        let data = await response.json()
        console.log(data)
        return {
          bool: false,
          message: data.response
          ,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        console.log(data)
        //dispatching the LOGIN action
        localStorage.setItem('expiry', `${data.response.expiresIn}`);
        localStorage.setItem('token', data.response.token);
        localStorage.setItem('userId', data.response.user._id);

        dispatch({ type: LOGIN, payload: data.response })
        //dispatch login 
        return {
          bool: true,
          message: data.response,
        }
      }

    } catch (err) {
      return {
        bool: false,
        message: err.message,
      }
    }

  }
}
