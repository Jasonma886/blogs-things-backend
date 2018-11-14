module.exports = {
  insert: 'INSERT INTO blog_tbl (title,author,content,about,origin) VALUES (?,?,?,?,?)',
  getList: 'select author, clicked, blog_id as blogId, title, about, date_format(commit_time, "%Y.%m.%d %H:%i:%s") as commitTime, left(content, 100) as content from blog_tbl limit 10 offset 0',
  getDetail: 'select author, origin,clicked, blog_id as blogId, title, about, date_format(commit_time, "%Y.%m.%d %H:%i:%s") as commitTime, content from blog_tbl where blog_id=?',
  updateClicked: 'update blog_tbl set clicked=clicked+1 where blog_id=?'
}
