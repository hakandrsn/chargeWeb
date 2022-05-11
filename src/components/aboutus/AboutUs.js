import React from 'react'
import "./About.css"
import bg from "../../assets/images/background.jpg"
const AboutUs = () => {
    return (
        <div className='' style={{ marginTop: -25 }}>
            <img src={bg} height="400" width="100%" style={{ objectFit: "cover" }} className="mb-5" alt='about-us' />
            <div className='container d-flex flex-column justify-content-center align-items-center '>
                <h1 className='mb-4 text-capitalize fst-italic fw-bolder'>Marsis Bilişim Teknolojileri</h1>
                <p className='w-75 mx-auto mb-5' style={{fontFamily:"revert"}}>
                    Misyonumuz,
                    Güçlü ve deneyimli danışman kadrosu,
                    profesyonel bakış açısı, farklı sektörlerdeki
                    proje tecrübesi ve kendisini birçok kulvarda
                    ispatlamış yazılımı ile müşterilerine uygun maliyetli,
                    hızlı, kaliteli ve sektörel çözümler sunmaktır.
                    <br />
                    <br />

                    Vizyonumuz,
                    Başarılı bir projenin anahtarının, firma ihtiyaçlarını doğru bir şekilde analiz edip,
                    firmaya değer katabilecek etkin çözümler üretmek olduğu ilkesini benimsemiş
                    bir firma olarak uzun yıllar boyunca firmaların güvenilir bir iş ortağı olmak ve
                    ülke endüstrisine sürekli bir katma değer sağlamaktır.
                </p>
             
            </div>
        </div>
    )
}

export default AboutUs