import Axios from 'axios'

function date_converter () {
 var d = new Date();
   var m_names = ["January", "February", "March",
   "April", "May", "June", "July", "Augustus", "Sepetember",
   "October", "November", "December"];
   var date = d.getDate();
   var month = m_names[d.getMonth()];
   var year = d.getFullYear();
   return `${date} ${month} ${year}`;
}

export const postPassword  = (newPass) => {
  return function(dispatch) {
    Axios.post('http://localhost:3000/password',
    {...newPass, "createdAt": date_converter(), "updatedAt": date_converter()})
    .then(function(responze) {
      dispatch(getPasswordInitiate())
    })
    .catch(function(err) {
      alert('Error', err);
    })
  }
}

export const getPasswordInitiate  = () => {
  return {
    type: "GET_PASSWORD_INITIATE",
    payload: Axios.get('http://localhost:3000/password')
  }
}

export const deletePasswordGo = (id) => {
  return function (dispatch) {
    Axios.delete('http://localhost:3000/password/'+id)
    .then(function(response) {
      dispatch(getPasswordInitiate())
    })
    .catch(function(err) {
      alert("ERROR", err)
    })
  }
}

export const validatePassword = (val) => {

  let obj = {
    type: "VALIDATE_PASSWORD",
    payload: {
      class: "input is-danger",
      msg: ""
    }
  }

  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}/.test(val)) { // RegexSpecialCharacter + Number + Upper and Lower case character
    obj.payload.class = "input is-success"
    obj.payload.msg = "This password is good"
    return obj
  } else if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&$]{8,}$/.test(val)){ // RegexSpecialCharacter + Number
    obj.payload.msg = "Password must consist of Uppercase and Lowercase Character"
    return obj
  } else if (/^(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}/.test(val)) { // RegexSpecialCharacter
    obj.payload.msg = "Password must consist of letter & number"
    return obj
  } else if ( val.length > 8) {
    obj.payload.msg = "Password must contain at least 1 special character"
    return obj
  } else if (val.length === 0) {
    obj.payload.class = "input"
    obj.payload.msg = ""
    return obj
  } else {
    obj.payload.msg = "Password must contain at least 8 characters"
    return obj
  }
}

export const searchPassword = (str) => {
  if (str === "") {
    return {
      type: "GET_PASSWORD_INITIATE",
      payload: Axios.get('http://localhost:3000/password')
    }
  } else {
    return {
      type: "FILTER_PASSWORD",
      payload: str
    }
  }
}

export const updatePassword = (obj) => {
  return function(dispatch) {
    Axios.put('http://localhost:3000/password/'+obj.id,
    {...obj, "updatedAt": date_converter()})
    .then(function(responze) {
      dispatch(getPasswordInitiate())
    })
    .catch(function(err) {
      alert('Error');
    })
  }
}
