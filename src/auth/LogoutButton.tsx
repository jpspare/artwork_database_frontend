import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom";

const LogoutButton = () => {
    const { logout } = useAuth0();
  
    return (
        <Link to='/' className="hover:underline"
            onClick={() => logout({ 
                logoutParams: { returnTo: window.location.origin } 
            })}
        >
            log out
        </Link>
    )
}

export default LogoutButton
