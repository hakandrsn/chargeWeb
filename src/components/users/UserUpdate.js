import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ax from '../../ax'
import UserForm from './UserForm'
import history from "../../history"
import date from "date-and-time"
const UserUpdate = (props) => {
    const { id } = props.match.params
    const [userData, setUserData] = useState([])
    useEffect(() => {
        const getUser = async () => {
            const res2 = await ax.get(`users/${id}`)
            setUserData(res2.data)
        }
        getUser()
    }, [])

    // const onSubmit = async (data) => {


    // }
    const onSubmit = async data=> {
        console.log(data)
        await ax.put("/users/"+data._id, {
            userid: data.userid,
            cardid: data.cardid,
            username: data.username,
            password: data.password,
            balance: data.balance,
            devices: data.device,
            operations: data.operations,
            site: data.site,
            fills:data.fills,
            date: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')
        }).catch(err => {alert(err)})
        .then((res) => console.log(res))
        .finally(()=>{
            history.goBack()
        })
    }
       return(
           <div>
               <button className='d-block border-0 px-4 py-1 rounded' style={{backgroundColor:"#ff9911"}} onClick={()=>history.goBack()}>Geri</button>
               <label className='d-block text-center fs-4' style={{}}>Kullanıcı Bilgileri Güncelle</label>
               <UserForm initialValues={userData} onSubmit={onSubmit} />
           </div>
       )
    }

export default UserUpdate