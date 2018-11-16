module.exports = {
  addComment: 'INSERT INTO comments (from_user,to_user,blog_id,content) VALUES (?,?,?,?)',
  queryComments: 'SELECT from_user as fromUser, to_user as toUser, content, date_format(time, \'%Y-%m-%d %H:%i:%s\') as time, liked FROM comments WHERE blog_id=? ORDER BY time DESC',
  liked: 'update comments set liked=liked+1 where comment_id=?',
  cancelLiked: 'update comments set liked=liked-1 where comment_id=?',
  disliked: 'update comments set disliked=disliked+1 where comment_id=?',
}
