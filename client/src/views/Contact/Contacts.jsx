import style from "./Contacts.module.css";
import { Contact } from '../../components';

import { contacts } from '../../utils/const';

const Contacts = () => {
  return (
    <div className={style.generalContainer}>
      {contacts?.map((contact, index) =>
        <Contact key={index} contact={contact} />
      )}
    </div>
  );
};

export default Contacts;
