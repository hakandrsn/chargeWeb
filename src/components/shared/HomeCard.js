import React from 'react'
import { HiCursorClick } from 'react-icons/hi'
const HomeCard = ({ header, icon, data, event,bgColor }) => {
    return (
        <div className='col mb-3 py-4 d-flex border-0 rounded justify-content-between mx-2 home-card' style={{ backgroundColor:bgColor, width: "content" }}>
            <div className="px-1 d-flex flex-column">
                <div className='pb-2 pt-1 mb-2' style={{fontSize:"1.3rem",color:"white"}}>{header}</div>
                <div className='d-flex'>
                    <label className='pe-2'>{icon}</label>
                    <label className='fs-3'>{data}</label>
                </div>
            </div>
            <div className='pt-1'>
                <button onClick={() => event()} style={{ backgroundColor: "transparent", border: "none" }}><HiCursorClick size={24} color="white"/></button>
            </div>
        </div>
    )
}

export default HomeCard