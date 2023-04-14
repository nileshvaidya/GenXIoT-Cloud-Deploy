import { Moment } from 'moment';
// import { logger } from 'pino';
//import { getClientCode, updateTimeStamp } from './../db/DevicesDB';
import Logger from '../utils/logging';
//import mongoose from 'mongoose';
import { getClientCodeFromDeviceId, getDevicesById, saveDeviceData, updateTimeStamp } from '../db/DevicesDB';
import{readDeviceByDeviceId} from '../controllers/Device';
import moment from 'moment';
import { ServerSocket } from '../socket';
import {IDevice} from '../models/Device';

const extractTimeStamp = (data: string) => {
    let json = JSON.parse(data);
    let ts = json.timestamp;
    const dateTime = moment(ts * 1000).format('YYYY-MM-DD[T]HH:mm:ss');

    Logger.info('extractTimestamp', 'Time Stamp', dateTime);
    return dateTime;
};

const FormClientMessage = (deviceId: string, lastUpdated: string) => {
    let jsonObj = {
        deviceId: deviceId,
        lastUpdated: lastUpdated
    };

    return JSON.stringify(jsonObj);
};

export const processIncomingData = async (topic: string, message: string) => {
    const { ObjectId } = require('mongodb');
    
    let v = topic.split('/');
    if (v[0] === 'askdevicedata') {
        var device_id = v[1];
        Logger.info('ProcessHelper', 'Device ID....................................................... : ', device_id);
        var clientCode = await getClientCodeFromDeviceId(device_id);
        /** UnComment when Data from Device needs to be saved. Commented for development */
        if (!clientCode){
            clientCode="SBF0001";
        }
        Logger.info('ProcessHelper', 'Reveived Message : ', JSON.parse(message));
        Logger.info('ProcessHelper', 'Client ID : ', clientCode);
        let tsData = extractTimeStamp(message);
        updateTimeStamp(device_id, tsData);
        let dataTimeStamp = {};
        let str = '{"' + device_id + '":"' + tsData + '"}';
        Logger.info('ProcessHelper', 'TimeStamp string : ', str);
        dataTimeStamp = JSON.parse(str);
        Logger.info('ProcessHelper', 'TimeStamp object : ', dataTimeStamp);
        // saveDeviceData(device_id, clientCode!, topic, JSON.parse(message));
        // let isClientOnline = CheckIfClientIsOnline(clientCode!);
        // if (isClientOnline) {
        //     let clientMessage = FormClientMessage(device_id, tsData);
        //     sendClientData(clientCode!, clientMessage);
        //     let isDeviceOnline = CheckIfDeviceIsOnline(device_id);
        //     if (isDeviceOnline) {
        //         sendDeviceData(device_id!, message);
        //     }
        // }
        CheckForAlarm(clientCode!, device_id,message);
        ServerSocket.PrepareMessage(clientCode!, device_id, dataTimeStamp, JSON.parse(message));
        return clientCode;
    }
    return '';
};

const CheckForAlarm = async (clientCode:string, deviceId : string, data:string) =>
{
    const deviceTemp :any | null = await getDevicesById(clientCode,deviceId);
    if (!deviceTemp) {
        const device:IDevice = deviceTemp
        CheckAnalogParams(device,data)
    }
}
const CheckAnalogParams = async (device: IDevice , data: string) =>{
    const mappedVal = Object.keys(device.analog_params).map((key) => {
        const param = device.analog_params[key];
        const name = param.an_name;
        const setValue = param.set_value;
        const highAlarm = param.alarm_on_high;
        const highAlarmValue = param.high_alarm_value;
        const alertOnHigh = param.alert_on_high;
        const highAlertValue= param.high_alert_value;
        const lowlow = param.lowLow;
        const low = param.low;
        const alarmOnLow= param.alarm_on_low;
        const lowAlarmValue = param.low_alarm_value;
        const alertOnLow = param.alert_on_low;
        const lowAlertValue = param.low_alert_value
    })
}