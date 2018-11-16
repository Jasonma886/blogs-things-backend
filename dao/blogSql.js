module.exports = {
  insert: 'INSERT INTO blog_tbl (title,author,content,about,origin) VALUES (?,?,?,?,?)',
  getList: 'select author, clicked, blog_id as blogId, title, about, date_format(commit_time, "%Y.%m.%d %H:%i:%s") as commitTime, left(content, 100) as content from blog_tbl where about like ? limit 10 offset 0',
  getList1: 'select a.author, a.clicked, a.blog_id as blogId, a.title,c.count, a.about,date_format(a.commit_time, "%Y.%m.%d %H:%i:%s") as commitTime, left(a.content, 100) as content, b.c_id as liked from blog_tbl a left join collections b on a.blog_id=b.blog_id and b.user_name=? left join (select count(*) as count, blog_id from comments group by blog_id) c on a.blog_id=c.blog_id where about like ? limit 10 offset 0',
  getDetail: 'select a.author, a.origin,a.clicked, a.blog_id as blogId, a.title, a.about, date_format(a.commit_time, "%Y.%m.%d %H:%i:%s") as commitTime, a.content,b.c_id as liked from blog_tbl a left join collections b on a.blog_id=b.blog_id and b.user_name=? where a.blog_id=?',
  updateClicked: 'update blog_tbl set clicked=clicked+1 where blog_id=?',
  likedBlog: 'INSERT INTO collections (blog_id,user_name) VALUES (?,?)',
  dislikedBlog: 'DELETE FROM collections WHERE blog_id=? and user_name=?',
  getCollections: 'select a.author, a.clicked, a.blog_id as blogId, a.title,c.count, a.about,date_format(a.commit_time, "%Y.%m.%d %H:%i:%s") as commitTime, left(a.content, 100) as content, b.c_id as liked from blog_tbl a left join collections b on a.blog_id=b.blog_id left join (select count(*) as count, blog_id from comments group by blog_id) c on a.blog_id=c.blog_id where a.about like ? and b.user_name=? limit 10 offset 0'
}
