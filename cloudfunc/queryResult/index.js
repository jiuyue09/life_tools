// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

const formatTime = date => {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 云函数入口函数
exports.main = async (event, context) => {
  let page_size = 10;
  let page_index = 0;
  if (event.page_size) {
    page_size = event.page_size;
  }
  if (event.page_index) {
    page_index = event.page_index;
  }
  let skip = page_index * page_size;
  if (event.time) {
    let time = new Date();
    let formatTime_serverTime = formatTime(time);
    let rentlist = await db.collection('rentKey').where({
      rent_time: new db.RegExp({
        regexp: formatTime_serverTime,
        options: 'i',
      })
    }).orderBy('rent_time_float','desc').skip(skip).limit(page_size).get();
    return rentlist;
  } else if (event.is_rent) {
    let rentlist = await db.collection('rentKey').where({ is_rent: false }).orderBy('rent_time_float','desc').skip(skip).limit(page_size).get();
    return rentlist;
  }
  else {
    let rentlist = await db.collection('rentKey').orderBy('rent_time_float','desc').skip(skip).limit(page_size).get();
    return rentlist;
  }

}