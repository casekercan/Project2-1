var connection = require("./connection.js");


var orm = {
  all_posts: function (qryres) {
    var qrystrg =
      "select Posts.*, Usr.username from Posts inner join Usr on Posts.UserID = Usr.UserID";
    connection.query(qrystrg, function (err, res) {
      if (err) throw err;

      qryres(res);
    });
  },
  city_search: function (schcity, qryres) {
    var qrystrg =
      "select Posts.*, Usr.username from Posts inner join Usr on Posts.UserID = Usr.UserID where Posts.City like '%" + schcity + "%'";
    connection.query(qrystrg, function (err, res) {
      if (err) throw err;
      qryres(res);
    });
  },
  zip_search: function (schzip, qryres) {
    var qrystrg =
      "select Posts.*, Usr.username from Posts inner join Usr on Posts.UserID = Usr.UserID where Posts.Zip like '%" + schzip + "%'";
    connection.query(qrystrg, function (err, res) {
      if (err) throw err;
      qryres(res);
    });
  },
  post_info: function (post_id, qryres) {
    var qrystrg = "select Posts.*, Usr.username post_user from Posts inner join Usr on Posts.UserID = Usr.UserID where Posts.PostID = " + post_id;
    connection.query(qrystrg, function (err, res) {
      if (err) throw err;
      qryres(res);
    });
  },
  comment_info: function (post_id, qryres) {
    var qrystrg = "select Comments.*, Usr.username comm_user from Comments inner join Usr on Comments.UserID = Usr.UserID where Comments.PostID = " + post_id;
    connection.query(qrystrg, function (err, res) {
      if (err) throw err;
      qryres(res);

    });
  },
  comment_dlt: function(comment_id,qryres){
    var qrystrg = "delete from Comments where CommentID = " + comment_id;
    connection.query(qrystrg, function(err,res){
      if(err)
      {
        res.json = ({success: false});
        qryres(res);
      }
      else
      {
        console.log("Deleted");
        res.json = ({success: true});
        qryres(res);
      }
    });
  },
  comment_crt: function(vals,qryres){
    var qrystrg = "insert into Comments (PostID,UserID,CommentText,CommentRating) values( ?,?,?,?)";
    connection.query(qrystrg,vals, function(err,res){
      if(err)
      {
        throw err;
      }

    })
  },

  create_location: function (table, col, val, qryres) {

    var qrystring = "INSERT INTO " + table;
    qrystring += " (";
    qrystring += col.toString();
    qrystring += ") ";
    qrystring += "VALUES (";
    qrystring += val
    qrystring += ") ";

    console.log(qrystring);

    connection.query(qrystring, function (err, res) {
      if (err) throw err;

      qryres(res);
    });
  }
};

module.exports = orm;
