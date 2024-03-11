import style from "./Contacts.module.css";
import { Contact } from "../../components";

import { contacts } from "../../utils/const";

const Contacts = () => {
  return (
    <div className={style.container}>
      <header className={style.imgHeader}>
        <div className={style.titleHeader}>
          <h1>Teléfonos útiles</h1>
        </div>
      </header>
      <div className={style.grid}>
        {contacts?.map((contact, index) => (
          <Contact key={index} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
