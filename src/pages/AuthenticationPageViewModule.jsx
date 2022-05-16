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
        return <>
            <nav>
                <div className="nav-wrapper">
                    &nbsp; &nbsp; <h4 className="brand-logo">Movie search page based on OMDB API </h4>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/signUp">Still no account? Sign Up</a></li>
                        <li><a href="/login">Already have an account? Log In</a></li>
                    </ul>
                </div>
            </nav>
        </>

    return <>
        <img alt="poster" src={user.userIconLink} className="user-icon-image"></img> &nbsp; &nbsp;
        <label>user name: user.userName</label> &nbsp; &nbsp;
        <button className="line-button" onClick={logOut}>Log Out</button>
    </>
}

export default AuthenticationPageViewModule;
