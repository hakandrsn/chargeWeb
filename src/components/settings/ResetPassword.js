import React, { useState } from 'react'
import visibility from "../../assets/icons/visibility.svg"
import hidden from "../../assets/icons/hidden.svg"
import { useForm } from "react-hook-form"
const ResetPassword = () => {
  const { register, handleSubmit } = useForm()
  const [isHidden, setIsHidden] = useState(true)
  const isVisibility = () => {
    setIsHidden(!isHidden)
  }
  let message;
  const onSubmit = data => {
    if (data.newPassword === data.newPasswordAgain){
      console.log(data)
    }else {
      message = "Kontrol Ediniz"
    }
     
  }
  return (
    <div className='d-flex justify-content-center align-items-center container'>
      <form onSubmit={handleSubmit(data => onSubmit(data))} className='border rounded p-4 d-flex justify-content-between flex-column' style={{ minWidth: 350 }}>
        <label>{message}</label>
        <label className='text-center mb-1'>Mevcut Şifren</label>
        <div className="form-floating mb-2">
          <input {...register("currentPassword")} name="currentPassword" type="password" className="form-control" id="floatingInput" placeholder="Mevcut Şifre" />
          <label htmlFor="floatingInput">Mevcut Şifre</label>
        </div>
        <label className='text-center mb-1'>Yeni Şifre</label>

        <div className="form-floating mb-2">
          <input {...register("newPassword")} name="newPassword" type={isHidden ? "password" : "text"} className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Şifre</label>
          <img onClick={() => isVisibility()} alt="password" style={{ position: "absolute", right: 7, top: 20 }} src={isHidden ? hidden : visibility} width={19} />
        </div>
        <label className='text-center mb-1'>Yeni Şifre Tekrar</label>

        <div className="form-floating mb-4">
          <input {...register("newPasswordAgain")} name="newPasswordAgain" type={isHidden ? "password" : "text"} className="form-control" id="floatingPasswordAgain" placeholder="Password" />
          <label htmlFor="floatingPasswordAgain">Şifre Tekrar</label>
          <img onClick={() => isVisibility()} alt="password" style={{ position: "absolute", right: 7, top: 20 }} src={isHidden ? hidden : visibility} width={19} />
        </div>
        <button className='w-50 mx-auto border-0 px-3 py-2' type="submit" name='Değiştir'>Değiştir</button>
      </form>
    </div>
  )
}

export default ResetPassword