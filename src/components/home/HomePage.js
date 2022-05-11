import React, { useEffect, useState } from 'react'
import ax from '../../ax'
import { XAxis, YAxis, Bar, BarChart, CartesianGrid, Tooltip, Legend } from "recharts"
import date from 'date-and-time';
import HomeCard from '../shared/HomeCard';
import { CgUserList } from 'react-icons/cg'
import { FcElectricity } from 'react-icons/fc'
import { GiElectricalResistance } from 'react-icons/gi'
import { FiUserCheck } from 'react-icons/fi'
import { MdPriceCheck, MdPriceChange } from 'react-icons/md'
import GoogleMapReact from 'google-map-react';
import screen from "../../screen"

const HomePage = () => {
  const [width] = screen()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [devices, setDevices] = useState([])
  const userSite = localStorage.getItem("site")
  const tarih = new Date()
  useEffect(() => {
    (async () => {
      setLoading(true)
      await ax.get(`/users`).then(res => {
        const filteredUsers = res.data.filter((user) => user.site === userSite)
        setUsers(filteredUsers)
      }).finally(() => {
        setLoading(false)
      })
      await ax.get(`/devices`).then(res => {
        setDevices(res.data)
      }).finally(() => {
        setLoading(false)
      })
    })()
  }, [])
  console.log(users)
  const deviceCount = devices && devices.length
  const deviceState = devices && devices.filter(d => d.state === "1").length
  const userCount = users && users.length
  const userFillsDate = (dt) => {
    let dayFils = []
    let weekFils = []
    let monthFils = []
    let balanceFillsDay = 0
    let balanceFillsMonth = 0
    let balanceForGrafMonth = 0

    users && users.forEach((user) => {
      user.fills && user.fills.forEach((u => {
        if (u.date == "undefined" && !u.date && u.date == "") return;
        const t = new Date(u.date)
        if (date.isSameDay(t, tarih)) {
          dayFils.push(u.date)
          balanceFillsDay += u.lastbalance
        }
        if (date.subtract(tarih, t).toDays() <= 7) {
          weekFils.push(u.date)
        }
        if ((dt * 30) <= date.subtract(tarih, t).toDays() && (date.subtract(tarih, t).toDays() < (30 * (dt + 1)))) {
          balanceForGrafMonth += u.lastbalance
        }
        if (date.subtract(tarih, t).toDays() <= 30) {
          monthFils.push(u.date)
          balanceFillsMonth += u.lastbalance
        }
      }))
    })
    return { dayFils, weekFils, monthFils, balanceFillsDay, balanceFillsMonth, balanceForGrafMonth }
  }
  const formatingDate = (nx) => {
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
    const formatDate = date.format(date.addMonths(tarih, -nx), 'YYYY-MM-DD').split("-")[1]
    return months[formatDate - 1]
  }
  const data = [
    {
      "name": formatingDate(6),
      "Aylık": userFillsDate(6).balanceForGrafMonth,
    },
    {
      "name": formatingDate(5),
      "Aylık": userFillsDate(5).balanceForGrafMonth,
    },
    {
      "name": formatingDate(4),
      "Aylık": userFillsDate(4).balanceForGrafMonth,
    },
    {
      "name": formatingDate(3),
      "Aylık": userFillsDate(3).balanceForGrafMonth,
    },
    {
      "name": formatingDate(2),
      "Aylık": userFillsDate(2).balanceForGrafMonth,
    },
    {
      "name": formatingDate(1),
      "Aylık": userFillsDate(1).balanceForGrafMonth,
    },
    {
      "name": formatingDate(0),
      "Aylık": userFillsDate(0).balanceForGrafMonth,
    }
  ]
  const Marker = ({ text }) => {
    <div>nabersin {text}</div>
  }
  return (
    <div className=''>
      <div className='text-center fs-3 mb-3 fst-italic fw-bolder' style={{ color: "#353B48" }}>Özet</div>
      <div className='row row-cols-1 row-cols-ms-2 row-cols-md-3 row-cols-lg-4 justify-content-center mb-4 mx-auto' >
        <HomeCard header="Meşgul cihaz" data={deviceState} bgColor="#535c68" icon={<FcElectricity size={40} color="#40c8b9" />} />
        <HomeCard header="Toplam cihaz" data={deviceCount} bgColor="#F08A5D" icon={<GiElectricalResistance size={40} color="#40c8b9" />} />
        <HomeCard header="Toplam kullanıcı" data={userCount} bgColor="#badc58" icon={<CgUserList size={40} color="#40c8b9" />} />
        <HomeCard header="Işlem yapan kullanıcı" data={userCount - userFillsDate().dayFils.length} bgColor="#B83B5E" icon={<FiUserCheck size={40} color="#40c8b9" />} />
        <HomeCard header="Bugün toplam gelir" data={userFillsDate().balanceFillsDay.toFixed(1)} bgColor="#6A2C70" icon={<MdPriceCheck size={40} color="#40c8b9" />} />
        <HomeCard header="Aylık toplam gelir" data={userFillsDate().balanceFillsMonth.toFixed(1)} bgColor="#686de0" icon={<MdPriceChange size={40} color="#40c8b9" />} />


      </div>
      <hr className='w-75 mx-auto' />
      <div className='text-center fs-3 mb-3 fst-italic fw-bolder' style={{ color: "#353B48" }}>Aylık Tablo</div>
      <div className='d-flex justify-content-center me-2 py-4 mb-4' >
        <div className='px-2 rounded d-flex justify-content-center py-4' style={{ backgroundColor: "rgba(223, 249, 251,1.0)" }}>
          <BarChart width={width > 700 ? 730 : width - 50} height={250} data={data}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Aylık" fill="#686de0" />
          </BarChart>
        </div>
      </div>
      <hr className='w-75 mx-auto' />
      <div className='text-center fs-3 mb-3 fst-italic fw-bolder' style={{ color: "#353B48" }}>Cihaz Konumları</div>
      <div className='mx-auto' style={{ height: '100vh', width: '100%', marginTop: 45 }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAUZNQsQHfbl0bB47lQUXvnYUyj9WF0jDU" }}
          defaultCenter={{ lat: 41.05571165402418, lng: 29.04609112693213 }}
          defaultZoom={15}
        >df
          {
            devices && devices.map((device, i) => {
              const ll = device.location.split(",")
              console.log(Number(ll[0]), Number(ll[1]))
              return (
                <Marker key={i} lat={parseInt(ll[0])} lng={parseInt(ll[1])} text="hakan" />
              )
            })
          }
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default HomePage
