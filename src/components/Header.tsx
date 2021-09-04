import '../styles/Header.css'
import NetflixLogo from '../assets/images/logo-netflix.png'
import Perfil from '../assets/images/perfil.png'

export default ({ black } : any) => {
    return (
        <header className={black===true ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={NetflixLogo} alt="" />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={Perfil} alt="" />
                </a>
            </div>
        </header>
    )
}