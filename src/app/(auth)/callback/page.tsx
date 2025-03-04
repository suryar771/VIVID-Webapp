import React from 'react'


const AuthCallbackPage = async ()=>{
  const auth = await onAuthenticateUser();
  return <div> AuthCallbackPage</div>
}
export default AuthCallbackPage