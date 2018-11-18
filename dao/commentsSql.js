module.exports = {
  addComment: 'INSERT INTO comments (from_user,to_user,blog_id,content) VALUES (?,?,?,?)',
  queryComments: 'SELECT SQL_CALC_FOUND_ROWS from_user as fromUser,(@i:=@i-1) i, to_user as toUser, content, date_format(time, \'%Y-%m-%d %H:%i:%s\') as time, liked FROM comments, (SELECT @i:=(select count(*) from comments where blog_id=?)+1) as i WHERE blog_id=? ORDER BY time DESC;SELECT FOUND_ROWS() as total;',
  liked: 'update comments set liked=liked+1 where comment_id=?',
  cancelLiked: 'update comments set liked=liked-1 where comment_id=?',
  disliked: 'update comments set disliked=disliked+1 where comment_id=?',
  queryCommentsByUser: 'SELECT a.comment_id,a.to_user,a.content, date_format(a.time, \'%Y-%m-%d %H:%i:%s\') as time,b.title from comments a left join blog_tbl b on a.blog_id=b.blog_id where a.from_user=?',
  deleteComment: 'DELETE FROM comments where comment_id=?',
  getCommentById: 'select from_user as user from comments where comment_id=?'
}
