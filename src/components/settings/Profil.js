import React from 'react'
import { Link } from 'react-router-dom'
import { icons } from "./icons"
const Profil = () => {
    const randomIcon = Math.floor(Math.random() * icons.length)
    return (
        <div className='d-flex justify-content-center align-items-center container'>
            <div className='border rounded p-4 d-flex justify-content-between'>
                <div className='text-capitalize pe-5'>
                    <div>
                        <label className='fw-bolder' style={{ width: 110 }}>Kullanıcı Adı</label>
                        <label>: {localStorage.getItem("username")}</label>
                    </div>
                    <div>
                        <label className='fw-bolder' style={{ width: 110 }}>Yetki</label>
                        <label>: admin</label>
                    </div>
                    <div>
                        <label className='fw-bolder' style={{ width: 110 }}>Site</label>
                        <label>: {localStorage.getItem("site")}</label>
                    </div>
                    <div>
                        <label className='fw-bolder' style={{ width: 110 }}>Password</label>
                        <Link to={`/reset/${localStorage.getItem("admin")}`} className='text-decoration-underline border-0' style={{ color: "blue" }}>: change</Link>
                    </div>
                </div>
                <div>
                    <img src={icons[randomIcon]} width={100} alt="profil" />
                </div>
            </div>
        </div>
    )
}

export default Profil