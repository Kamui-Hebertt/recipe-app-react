import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <>
      <Header search={ false } pageName="Profile" />
      <Footer />
    </>
  );
}

export default Profile;
