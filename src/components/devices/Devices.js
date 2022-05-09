import React, { useEffect, useState } from 'react'
import ax from '../../ax'
import { Link } from "react-router-dom"
import image1 from "../../assets/images/charge2.png"

const Devices = (props) => {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { path } = props.match
  const userSite = localStorage.getItem("site")
  useEffect(() => {
    (async () => {
      setLoading(true)
      ax.get(path).then(res => {
          setDevices(res.data)
        }).catch(err => {
          setError(err)
          console.log(error)
        }).finally(() => setLoading(false))
      })()
  }, [path,error])
  const filteredDevice = devices.filter((device) => device.site === userSite)

  const renderDevices = () => {
    return devices && filteredDevice.map((device, i) => {
      return (
        <div key={i} className='d-flex justify-content-between mb-4 border-bottom p-2 rounded align-items-center'>
          <div className='d-flex align-items-center'>
            <div>
              <img src={image1} style={{ width: 80 }} alt='görsel' />
            </div>
            <div className='ms-3 text-capitalize'>
              <div className='' >
                <label style={{ width: 130 }}>Site</label>
                <label>: {device.site}</label>
              </div>
              <div>
                <label style={{ width: 130 }}>Konum</label>
                <label>: {device.location}</label>
              </div>
              <div>
                <label style={{ width: 130 }}>Kullanan Kullanıcı</label>
                <label>: {device.charginguser}</label>
              </div>
              <div>
                <label style={{ width: 130 }}>Ücret</label>
                <label>: {device.price}</label>
              </div>
              <div>
                <label style={{ width: 130 }}>Tip</label>
                <label>: {device.type}</label>
              </div>

            </div>
          </div>
          <div className='d-flex flex-column'>
            <div className={`${device.state == "1" ? "bg-danger" : "bg-success"} text-center mb-4 badge rounded-pill py-2 `}>
              {device.state  == "1" ? "Meşgul" : "Müsait"}
            </div>
            <Link to={`/device/${device._id}`} style={{ backgroundColor: "#f3f3f3", color: "black" }} className=' border px-4 py-1 rounded opacity-75 text-decoration-none text-center'>Detaylar</Link>
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
      <div className='text-center fs-3 '>Cihazlar</div>
      {renderDevices()}
    </div>
  )
}

export default Devices