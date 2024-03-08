import React from "react";
import style from "./Contact.module.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const ContactCard = ({ contact }) => {
  const { title, phone, whatsapp, email, title2, phone2 } = contact;
  return (
    <div className={style.card}>
      <h1 className={style.title}>{title}</h1>
      <h2 className={style.subtitle}>
        <BsFillTelephoneFill /> {phone && <a href={`tel:${phone}`}>{phone}</a>}
      </h2>
      <h1 className={style.title}>{title2}</h1>
      <h2 className={style.subtitle}>
         {phone2 && (<> <BsFillTelephoneFill />
         <a href={`tel:${phone2}`}>{phone2}</a>
        </>)}
      </h2>
      {whatsapp && <a href={`https://wa.me/${whatsapp}`} target="blank" className={style.subtitle}><FaWhatsapp /> {whatsapp}</a>}
      {email && <h2 className={style.subtitle}><AiOutlineMail /> <a href={`mailto:${email}`}>{email}</a></h2>}
    </div>
  );
};

export default ContactCard;
