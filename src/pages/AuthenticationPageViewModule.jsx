import { useUser } from '../auth/useUser';
import { useNavigate } from "react-router-dom";

function AuthenticationPageViewModule() {

    const navigate = useNavigate();

    const user = useUser();

    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    if (!user)
        return <div>
            <label>Movie search page based on OMDB API </label> &nbsp; &nbsp;
            <label>You are not logged in -> </label>
            &nbsp; &nbsp;
            <button className="line-button" onClick={() => navigate('/signUp')}>Still no account? Sign Up</button>
            &nbsp; &nbsp;
            <button className="line-button" onClick={() => navigate('/login')}>Already have an account? Log In</button>
        </div>

    return <div>
        <img alt="poster" src={user.userIconLink} className="user-icon-image"></img> &nbsp; &nbsp;
        <label>user name: user.userName</label> &nbsp; &nbsp;
        <button className="line-button" onClick={logOut}>Log Out</button>
    </div>
}

export default AuthenticationPageViewModule;
