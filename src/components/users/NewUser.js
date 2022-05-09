import React, { useEffect, useState } from 'react'
import Modal from '../../modal/Modal'
import history from '../../history'
import ax from '../../ax'
import { useForm } from 'react-hook-form'
import UserForm from './UserForm'
import date from "date-and-time"
const NewUser = () => {
    const [userData, setUserData] = useState([])
    useEffect(() => {
        const getUser = async () => {
            const res = await ax.get('/devices')
            setUserData(res.data)
        }
        getUser()
    }, [])

    const onSubmit = async (data) => {
        await ax.post("/users", {
            userid: data.userid,
            cardid: data.cardid,
            username: data.username,
            password: data.password,
            balance: data.balance,
            devices: data.devices,
            operations: data.operations,
            site: data.site,
            date: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')
        }).catch((err) => alert(err))
            .then((res) => console.log(res))
            .finally(() => {
                history.goBack()
            })

    }

    return (
        <div>
            <button className='d-block border-0 px-4 py-1 rounded' style={{ backgroundColor: "#ff9911" }} onClick={() => history.goBack()}>Geri</button>
            <label className='d-block text-center fs-4' style={{}}>Kullanıcı Ekle</label>
            <UserForm onSubmit={onSubmit} />
        </div>
    )
}

export default NewUser