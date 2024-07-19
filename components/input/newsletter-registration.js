import classes from './newsletter-registration.module.css';
import { useRef } from 'react';
function NewsletterRegistration() {
  const inputEmailRef = useRef();
  const registrationHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const reqbody = {
      email: enteredEmail
    }
    // fetch user input (state or refs)
    const res = await fetch('/api/registration', {
      method: 'POST',
      body: JSON.stringify(reqbody),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!res.ok) {
      const errordesc = await res.text();
      console.log(errordesc)
    }
    else {
      const data = await res.json();
      console.log(data)

    }
    // optional: validate input
    // send valid data to API
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={inputEmailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
