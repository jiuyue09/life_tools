// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let OPENID = wxContext.OPENID;
  let page_size = 10;
  let page_index = 0;
  if (event.page_size) {
     page_size = event.page_size;
  }
  if (event.page_index) {
    page_index = event.page_index;
  }
  let skip = page_index * page_size;
  let rentlist = await db.collection('rentKey').where({_openid:OPENID}).orderBy('rent_time_float','desc').skip(skip).limit(page_size).get();
  return rentlist;
}