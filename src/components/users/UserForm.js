import React, { useState, useEffect,useMemo } from 'react'
import { useForm } from 'react-hook-form'
import ax from '../../ax'
const UserForm = (props) => {
    const { register, handleSubmit,reset } = useForm({
        defaultValues:useMemo(()=>{
            return props.initialValues
        },[props.initialValues])
    })
    const [deviceData,setDeviceData] = useState([])
    useEffect(() => {
        const getUser = async () => {
            const res = await ax.get('/devices')
            setDeviceData(res.data)
        }
        getUser()
    }, [])
    useEffect(() => {
        reset(props.initialValues);
      }, [props.initialValues]);
    const onSubmit =(data)=>{
        console.log(data)
        props.onSubmit(data)
    }
    return (
        <form className="row g-3" onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="col-md-12">
                <label htmlFor="ad" className="form-label">Ad soyad</label>
                <input  {...register("username")} type="text" className="form-control" placeholder='Alex jorgovic' />
            </div>
            <div className="col-12">
                <label htmlFor="password" className="form-label">Şifre</label>
                <input name="password" {...register("password")} type="password" className="form-control" id="password" placeholder="******" />
            </div>
            <div className="col-md-12">
                <label htmlFor="soyad" className="form-label">Site</label>
                <input name="site" {...register("site")} type="text" className="form-control" id="soyad" placeholder='Pehlivan' />
            </div>
            <div className="col-md-12">
                <label htmlFor="kartno" className="form-label">Kart No</label>
                <input name="cartid" {...register("cardid")} type="text" className="form-control" id="kartno" placeholder='Kart No' />
            </div>
            <div className="col-12">
                <label htmlFor="device" className="form-label">Cihazlar</label>
                <select defaultValue={"Selected Devices"} {...register("devices")} name="devices" className="form-select" aria-label="Default select example">
                    <option disabled value="Selected Devices">Select Devices</option>
                    {deviceData && deviceData.map((device, i) => {
                        return <option key={i}>{device.deviceid}</option>
                    })}
                </select>

            </div>
            <div className="col-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default UserForm