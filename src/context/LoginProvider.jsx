import { useMemo, useEffect, useState } from 'react';
import LoginContext from './LoginContext';

export default function LoginProvider({ children }) {
  const minCharacter = 6;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const emailCheck = email.toLowerCase().match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
    const passwordCheck = password.length > minCharacter;
    if (emailCheck && passwordCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const [emailProfile, setEmailProfile] = useState({ email: '' });

  const value = useMemo(() => ({
    setEmail,
    email,
    setPassword,
    disabled,
    password,
    setEmailProfile,
    emailProfile,
  }), [email, disabled, password, emailProfile]);
  return (
    <LoginContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {}.isRequired;
