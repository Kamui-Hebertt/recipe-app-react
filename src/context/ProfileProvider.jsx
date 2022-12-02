import { useMemo, useState } from 'react';
import ProfileContext from './ProfileContext';

export default function ProfileProvider({ children }) {
  const [emailProfile, setEmailProfile] = useState({ email: '' });

  const value = useMemo(() => ({
    emailProfile,
    setEmailProfile,
  }), [emailProfile]);

  return (
    <ProfileContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </ProfileContext.Provider>
  );
}

ProfileProvider.propTypes = {}.isRequired;
