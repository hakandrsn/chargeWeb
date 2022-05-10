import React from 'react'
import {Link} from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import ikon from "../assets/images/ikon.PNG"
import userIcon from "../assets/icons/user.svg"
import {RiUser3Fill} from "react-icons/ri"
const Header = () => {
  const {logout} = useAuth()
  const userInfo = {
    username:localStorage.getItem("username"),
    admin:localStorage.getItem("admin"),
    site:localStorage.getItem("site"),
    adsoyad:localStorage.getItem("adsoyad"),
  }
  return (
    <div className="container-fluid header-txt" style={{backgroundColor:"#353b48"}}>
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <img className="bi me-2 py-1 rounded" width={120} src={ikon} alt="logo" style={{backgroundColor:"white"}} />
      </Link>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0" >
        <li><Link to="/" className="nav-link px-2 link-light">Ana Sayfa</Link></li>
        <li><Link to="/users" className="nav-link px-2 link-light">Kullanıcılar</Link></li>
        <li><Link to="/devices" className="nav-link px-2 link-light">Cihazlar</Link></li>
        <li><Link to="/contact" className="nav-link px-2 link-light">İletişim</Link></li>
        <li><Link to="/aboutus" className="nav-link px-2 link-light">Hakkımızda</Link></li>
      </ul>

      <div className="col-md-3 text-end">
        <Link to={`/profil/${localStorage.getItem("admin")}`} className='px-4 text-center border-0 text-decoration-none' style={{color:"black"}}>
          <RiUser3Fill color='white' size={30} alt="profil" />
          {userInfo.adsoyad}
        </Link>
        <button onClick={()=>logout()} type="button" className="py-1 px-2 rounded" style={{border:"none", backgroundColor:"#F9ED69"}}>Çıkış Yap</button>
      </div>
    </header>
  </div>
  )
}

export default Header