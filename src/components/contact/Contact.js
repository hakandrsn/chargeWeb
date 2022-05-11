import React from 'react'
import "./contact.css"
import wp from "../../assets/contactIcons/wp.svg"
import meta from "../../assets/contactIcons/meta.svg"
import mail from "../../assets/contactIcons/mail.svg"
import ws from "../../assets/contactIcons/ws.png"
import linkedin from "../../assets/contactIcons/linkedin.svg"




const Contact = ({className}) => {
  const [open, setOpen] = React.useState(false)
  const DropdownItem =({icon,children,event,content})=>{
    return(
      <a href={`${event}${content}`} target="_blank" className='menu-item text-decoration-none px-3 py-1'>
        <span className='icon-button'>{icon}</span>
        <span className='text-nowrap' style={{color:"white"}}>{children}</span>
      </a>
    )
  }
  return (
    <div className="dropdown px-4 py-3">
          <DropdownItem
          event={''}
          content={'https://www.facebook.com'}
          icon={<img src={meta} alt="meta facebook" width={45} />}
          >
            facebook
          </DropdownItem>
          <DropdownItem
          event={'mailto:'}
          content={`abc@gmail.com`}
          icon={<img src={mail} alt="e-mail" width={45} />}
          >
            E-mail
          </DropdownItem>    
           <DropdownItem
          event={'https://www.mar-sis.com/'}
          icon={<img src={ws} alt="website" width={45} />}
          >
            Website
          </DropdownItem>
          <DropdownItem
          event={``}
          content={`https://wa.me/905363196587/?text=Merhaba`}
          icon={<img src={wp} alt="whatsapp" width={45} />}
          >
            Whatssapp
          </DropdownItem>
          <DropdownItem
          event={``}
          content={`https://www.linkedin.com/company/marsis-bilisim/?originalSubdomain=tr`}
          icon={<img src={linkedin} alt="linkedin" width={45} />}
          >
            Whatssapp
          </DropdownItem>
        </div>
  )
}

export default Contact