import React from 'react'
import {Link} from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import ikon from "../assets/images/ikon.PNG"
import userIcon from "../assets/icons/user.svg"

const Header = () => {
  const {logout} = useAuth()
  const userInfo = {
    username:localStorage.getItem("username"),
    admin:localStorage.getItem("admin"),
    site:localStorage.getItem("site"),
    adsoyad:localStorage.getItem("adsoyad"),
  }
  return (
    <div className="container-fluid">
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <img className="bi me-2" width={120} src={ikon} alt="logo" />
      </Link>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><Link to="/" className="nav-link px-2 link-dark">Ana Sayfa</Link></li>
        <li><Link to="/users" className="nav-link px-2 link-dark">Kullanıcılar</Link></li>
        <li><Link to="/devices" className="nav-link px-2 link-dark">Cihazlar</Link></li>
        <li><Link to="#" className="nav-link px-2 link-dark">İletişim</Link></li>
        <li><Link to="#" className="nav-link px-2 link-dark">Hakkımızda</Link></li>
      </ul>

      <div className="col-md-3 text-end">
        <Link to={`/profil/${localStorage.getItem("admin")}`} className='px-4 text-center border-0 text-decoration-none' style={{color:"black"}}>
          <img src={userIcon} width={35} style={{marginBottom:2}} alt="profil" />
          {userInfo.adsoyad}
        </Link>
        <button onClick={()=>logout()} type="button" className="btn btn-danger">Çıkış Yap</button>
      </div>
    </header>
  </div>
  )
}

export default Header