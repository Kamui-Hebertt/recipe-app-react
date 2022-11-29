import { useEffect, useState } from 'react';

const minCharacter = 6;
const ContextLogin = () => {
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

  const contextLoginObj = {
    setEmail,
    email,
    setPassword,
    disabled,
  };

  return { contextLoginObj };
};

export default ContextLogin;
