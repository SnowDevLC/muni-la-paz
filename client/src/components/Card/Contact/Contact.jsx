import React from "react";
import style from "./Contact.module.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const ContactCard = ({ contact }) => {
  const { title, phone, whatsapp, email, title2, phone2 } = contact;
  return (
    <div className={style.card}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.data}>
        <p className={style.contact}>
          <BsFillTelephoneFill /> {phone && <a href={`tel:${phone}`}>{phone}</a>}
        </p>
        {whatsapp && (
          <p className={style.contact}>
            <FaWhatsapp />
            <a href={`https://wa.me/${whatsapp}`} target="blank">
              {whatsapp}
            </a>
          </p>
        )}
        {email && (
          <p className={style.contact}>
            <AiOutlineMail /> <a href={`mailto:${email}`}>{email}</a>
          </p>
        )}
      </div>
      {title2 && (
        <>
          <h2 className={style.title2}>{title2}</h2>
          <p className={style.contact}>
            {phone2 && (
              <>
                {" "}
                <BsFillTelephoneFill />
                <a href={`tel:${phone2}`}>{phone2}</a>
              </>
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default ContactCard;
