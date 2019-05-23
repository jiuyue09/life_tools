// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID;
  if (openid=='oC6F45DEanKcIK6rVnIB2wgkwfUU' || openid== 'oC6F45JW_tKJLDow11qBnpcg0TNs') {
     return true;
  } else {
    return false;
  }
}