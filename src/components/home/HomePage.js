import React, { useEffect, useState } from 'react'
import { picons } from '../users/userIcons'
import ax from '../../ax'
import { ComposedChart, XAxis, YAxis, Line, Bar, BarChart, Area, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar } from "recharts"
import date from 'date-and-time';

const HomePage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [devices, setDevices] = useState([])
  const userSite = localStorage.getItem("site")
  const tarih = new Date()
  useEffect(() => {
    (async () => {
      setLoading(true)
      await ax.get(`/users`).then(res => {
        setUsers(res.data)
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

  // const filteredUsers = users.filter((user) => user.site === userSite).length
  // const filteredDevice = devices.filter((device) => device.site === userSite).length
  const formatingDate = (nx) => {
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
    const formatDate = date.format(date.addMonths(tarih, -nx), 'YYYY-MM-DD').split("-")[1]
    return months[formatDate - 1]
  }
  console.log(userFillsDate(0).balanceForGrafMonth)
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
  return (
    <div className=''>
      <div className='d-flex justify-content-evenly mb-4 '>
        <div className='d-flex flex-column align-items-center' style={{}}>
          <label className=' text-capitalize pb-1 px-2 mb-3' style={{ fontSize: 15 }}>Kullanılabilir Cihaz Miktarı</label>
          <label>{deviceState}</label>
        </div>
        <div className='d-flex flex-column align-items-center' style={{ fontSize: 15 }}>
          <label className='text-capitalize pb-1 px-2 mb-3' style={{ fontSize: 15 }}>Toplam Cihaz</label>
          <label>{deviceCount}</label>
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Aylık" fill="#8884d8" />
          {/* <Bar dataKey="Haftalık" fill="#82ca9d" /> */}
        </BarChart>
        <div className='d-flex flex-column p-4'>
          <div className='mb-3'>
            <label className='fs-6'>Toplam Kullanıcı </label>
            : <label className='fs-5'>  {userCount}</label>
          </div>
          <div className='mb-3'>
            <label className='fs-6'>Bugün işlem yapan kullanıcı sayısı</label>
            : <label className='fs-5'>  {userCount - userFillsDate().dayFils.length}</label>
          </div>
          <div className='mb-3'>
            <label className='fs-6'>Bugün yapılan toplam ücret</label>
            : <label className='fs-5'>  {userFillsDate().balanceFillsDay.toFixed(1)}</label>
          </div>
          <div className='mb-3'>
            <label className='fs-6'>Bu ay yapılan toplam ücret</label>
            : <label className='fs-5'>  {userFillsDate().balanceFillsMonth.toFixed(1)}</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage