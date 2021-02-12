import { useEffect, useState } from "react";

function LandingPage(props) {
  const [user, setUser] = useState({ name: "", email: "" })

  useEffect(() => {
    let localData = window.localStorage.getItem("auth_data");
    if (!localData) localData = window.sessionStorage.getItem("auth_data");
    localData = JSON.parse(localData);
    setUser({ name: localData.name, email: localData.email })
  }, [])


  return (
    <div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <button onClick={() => {
        window.localStorage.clear()
        window.sessionStorage.clear()
        props.setIsLoggedIn(false)
      }}>Logout</button>
    </div>
  )
}
export default LandingPage;
