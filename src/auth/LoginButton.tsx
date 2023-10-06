import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/dashboard',
      }
    })
  }
  
  return (
    <Link to='/' className="hover:underline"
      onClick={handleLogin}
    >
      log in
    </Link>
  )
}

export default LoginButton
