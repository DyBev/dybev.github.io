import { ReactNode, useState } from 'react';
import { ContactData, sendContact } from '../firebase';
import styles from './Contact.module.scss';
import { CheckmarkOutline } from '@carbon/icons-react';

const submitForm = (
  e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  data: ContactData,
  setSuccess: (data: boolean) => void,
) => {
  e.preventDefault();
  sendContact(data).then(() => {
    setSuccess(true);
  });
};

function SuccessElement(): ReactNode {
  return (
    <div className={styles.success}>
      <CheckmarkOutline />
      Message sent
    </div>
  );
}
function Contact(): ReactNode {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  return (
    <section id="contact" className={styles.contact}>
      {success && <SuccessElement />}
      <h2>Contact</h2>
      <form action="submitForm" className={styles.contactForm}>
        <label htmlFor="name">name:</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">email:</label>
        <input
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="message">message:</label>
        <textarea
          id="message"
          rows={10}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="submit"
          value="Send message"
          onClick={(e) =>
            success
              ? e.preventDefault()
              : submitForm(e, { name, email, message }, setSuccess)
          }
        />
      </form>
    </section>
  );
}

export default Contact;
