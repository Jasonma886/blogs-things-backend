module.exports = {
  getList: function (offset, size) {
    return `select SQL_CALC_FOUND_ROWS user_name,user_age,date_format(create_date, '%Y-%m-%d %H:%i:%s') as createTime,date_format(last_login, '%Y-%m-%d %H:%i:%s') as last_login from user LIMIT ${offset},${size};SELECT FOUND_ROWS() as total;`
  },
  getUserByName: 'select user_name, user_password as password from user where user_name=?'
}
