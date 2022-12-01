import { useState } from 'react';

const ProfileProvider = () => {
  const [emailProfile, setEmailProfile] = useState({ email: '' });

  const profileProviderObj = {
    emailProfile,
    setEmailProfile,
  };

  return { profileProviderObj };
};

export default ProfileProvider;
