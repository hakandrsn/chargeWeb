import React from 'react'
import ikon from "../../assets/images/ikon.PNG"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import {useAuth} from '../../context/AuthContext';


const schema = yup.object({
  email: yup.string(),
  password: yup.string()
})
const Login = () => {
  const {login,user} = useAuth()
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = data => {
    // console.log(data)
    login(data.username,data.password)
  }
  return (
    <div className="text-center d-flex justify-content-center align-items-center" style={{ height: "100vh" }} cz-shortcut-listen="true">
      <main className="form-signin">
        <form style={{ width: 350 }} onSubmit={handleSubmit((data)=>onSubmit(data))}>
          <img className="mb-5" src={ikon} alt="" width={350} />
          <h1 className="h3 mb-3 fw-normal">Giriş Yapın</h1>

          <div className="form-floating mb-1">
            <input {...register("username")} name="username" type="text" className="form-control" id="floatingInput" placeholder="username" />
            <label htmlFor="floatingInput">Kullanıcı adınız</label>
          </div>
          <div className="form-floating mb-2">
            <input {...register("password")} name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Şifreniz</label>
          </div>

          <div className="checkbox mb-4">
            <label>
              <input type="checkbox" {...register("rememberMe")} name="rememberMe" /> Beni hatırla
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Giriş</button>
          <p className="mt-5 mb-3 text-muted">made by Hakan Dursun to marsis informatics</p>
        </form>
      </main>

    </div>
  )
}

export default Login