// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let OPENID = wxContext.OPENID;
    let time = new Date();
    let formatTime_serverTime = formatTime(time);
    let timeInt = new Date().getTime();
    let params = {
      'rent_name':event.rent_name,
      'user_shops':event.user_shops,
      'rent_tel':event.rent_tel,
      'key_address':event.key_address,
      'rent_shops':'黄河南路城铁店',
      'rent_time':formatTime_serverTime,
      '_openid':OPENID,
      'rent_time_float':timeInt,
      'is_rent':false
    };
    if (event.sys_num && event.sys_num != '') {
      params.sys_num = event.sys_num;
    }
    return await db.collection('rentKey').add({
      data:params
    })
}