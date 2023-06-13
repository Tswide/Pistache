import { useEffect, useState } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import Logo from "../../assets/logo.png"
import './header.css'

function NavBar() {
    const[activeNav, setActiveNav] = useState('#accueil');
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, user => {
          if (user) {
            setAuthUser(user);
          } else {
            setAuthUser(null);
          }
        });
    
        return() => {
          listen();
        }
    }, []);

    const userSignout = () => {
        signOut(auth).then(() => {
            console.log("sign out successful");
            navigate("/");
        }).catch(error => console.log(error));
    }

    return(
        <>
            <nav id="navigation">
                {/* LOGO */}
                <Link
                  to="/"
                >
                  <img id="logo" src={Logo} />
                </Link>

                {/* PARTIE LIENS ET NAVIGATIONS */}
                <div id="liens_navigation">                
                    {
                        // VERIFICATION SI L'UTILISATEUR EST CONNECTER
                        authUser 
                        // SI OUI
                        ? 
                        <ul className="liens_nav">
                            <li>
                                <Link
                                    to="/Menu"
                                    onClick={() => setActiveNav("#menu")}
                                    className={
                                        activeNav === "#menu" ? "nav__link active-link" : "nav__link"
                                    }
                                >
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    onClick={() => setActiveNav("#contact")}
                                    className={
                                        activeNav === "#contact" ? "nav__link active-link" : "nav__link"
                                    }
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/Administration"
                                    onClick={() => setActiveNav("#administration")}
                                    className={
                                        activeNav === "#Administration" ? "nav__link active-link" : "nav__link"
                                    }
                                >
                                    Administration
                                </Link>
                            </li>
                        </ul>
                        // SI NON
                        :
                        <ul className="liens_nav">
                            <li>
                                <Link
                                    to="/menu"
                                    onClick={() => setActiveNav("#menu")}
                                    className={
                                        activeNav === "#menu" ? "nav__link active-link" : "nav__link"
                                    }
                                >
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    onClick={() => setActiveNav("#contact")}
                                    className={
                                        activeNav === "#contact" ? "nav__link active-link" : "nav__link"
                                    }
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    }
                    {/* ICONS */}
                        <i className="uil uil-instagram"></i>
                        <i className="uil uil-facebook"></i>
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default NavBar
