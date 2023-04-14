import { useSelector } from "react-redux"
import Logging from "../util/Logging"
import _ from 'underscore'
import { useParams } from "react-router-dom";
import { DeviceState } from "../services/device/deviceSlice"
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useEffect } from "react"
import { useGetDeviceDatabyDeviceIdQuery, useReadDeviceByDeviceIdQuery } from "../services/device/device"
import DeviceData from "./DeviceData"

const GetDevice = (device_Id: string) => {

  const dev_Id = {device_Id};
  // const { device_Id } = useParams();
  Logging.info("Device Header Device ID :" + dev_Id);

  let deviceInfo: any = useReadDeviceByDeviceIdQuery(dev_Id)
  
  Logging.info("Device Header :" + JSON.stringify(deviceInfo.data));

  return (
    
    <div className="devices">
      <h1>Device Header</h1>
      {
        deviceInfo.data &&
       
        <div>
            
              
              
                <p>
                    {JSON.stringify(deviceInfo.data)}
                 </p>
              
              
            </div>
          
          
        }
        
      
    </div>
  )
}


export default GetDevice;