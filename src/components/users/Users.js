import React, { useEffect, useState } from 'react'
import ax from '../../ax'
import { Link } from "react-router-dom"
import { picons } from './userIcons'
const Users = (props) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState("")
  const { path } = props.match
  const userSite = localStorage.getItem("site")
  useEffect(() => {
    (async () => {
      setLoading(true)
      ax.get(`${path}`).then(res => {
        setUsers(res.data)
      }).catch(err => {
        setError(err)
        console.log(error)
      }).finally(() => {
        setLoading(false)
      })
    })()
  }, [error, path])
  const filteredUsers = users
    .filter((user) => user.site === userSite)
    .sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) return 1
      if (new Date(a.date) > new Date(b.date)) return -1
      return 0
    })
    .filter((user) => user.username.toString().toLowerCase().includes(search.toLowerCase()))



  const renderUsers = () => {
    return users && filteredUsers.map((user, i) => {
      let randomIcon = Math.floor(Math.random() * picons.length)
      return (
        <div key={i} style={{ color: "black", cursor: "pointer" }} className='d-flex justify-content-between mb-4 border-bottom p-2 rounded align-items-center'>
          <div className='d-flex align-items-center'>
            <div>
              <img src={picons[randomIcon]} style={{ width: 80 }} alt='görsel' />
            </div>
            <div className='ms-3 text-capitalize'>
              <Link to={`users/update/${user._id}`} >
                <div className='text-decoration-none' style={{ color: "black" }}>
                  <label style={{ width: 90 }}>Kullanıcı Adı</label>
                  <label>:<strong> {user.username}</strong></label>
                </div>
              </Link>
              <div>
                <label style={{ width: 90 }}>Bakiye</label>
                <label>: {user.balance}</label>
              </div>
              <div>
                <label style={{ width: 90 }}>Kart id</label>
                <label>: {user.cardid}</label>
              </div>
              <div>
                <label style={{ width: 90 }}>Site</label>
                <label>: {user.site}</label>
              </div>
              <div>
                <label style={{ width: 90 }}>Tarih</label>
                <label>: {user.date.slice(0, 10)}</label>
              </div>

            </div>
          </div>
          <div className='d-flex flex-column'>
            <Link to={`/user/balance/${user._id}`} style={{ backgroundColor: "#f3f3f3", color: "black" }} className='mb-4 border px-4 py-1 rounded opacity-75 text-decoration-none text-center'>Bakiye Yükle</Link>
            <Link to={`/user/${user._id}`} style={{ backgroundColor: "#f3f3f3", color: "black" }} className=' border px-4 py-1 rounded opacity-75 text-decoration-none text-center'>Detaylar</Link>
          </div>
        </div>
      )
    })

  }
  if (loading) return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
  return (
    <div className=''>
      <div className='d-flex justify-content-center align-items-center'>
        <Link
          to={`/users/newuser`}
          className="mb-2 rounded text-center text-decoration-none py-1"
          style={{
            width: 130,
            border: "none",
            bottom: 35,
            right: 35,
            backgroundColor: "tomato",
            color: "white"
          }}
        >Yeni Kullanıcı +</Link>
      </div>
      <div className='text-center fs-3'>Kullanıcılarda ara</div>
      <div className="form-floating  w-75 mx-auto">
        <input onChange={(e) => setSearch(e.target.value)} type="search" className="form-control" id="search" placeholder="Search" />
        <label htmlFor="floatingPassword">Searching...</label>
      </div>
      {renderUsers()}

    </div>
  )
}

export default Users