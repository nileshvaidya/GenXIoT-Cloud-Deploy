import React from 'react';

import './index.module.scss';

import DeviceList from './DeviceList';
import Devices from '../../components/Devices';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function HomePage() {
  return (
    <>
     {/* <div className="col my-3"> 
        Welcome to ASK Info-Solution's IoT Portal
        </div> */}
        <Header/>
      <Devices />
      <Footer />
  {/* //  </div> */}
       </>
  )
}

export default HomePage;