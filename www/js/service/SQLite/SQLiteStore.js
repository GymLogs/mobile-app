function SQLiteStore(database, table, columns){

     this.createTable = function () {
    database.transaction(function (transaction) {
      var query =
        "CREATE TABLE IF NOT EXISTS " + table + " (" + columns.join(",") + ")";
      transaction.executeSql(
        query,
        undefined,
        function (ignored, resultSet) {
          console.log(resultSet);
        },
        function (error) {
          console.log( error.message);
        }
      );
    });
  };


   this.fetch = function(limit, offset, sortBy, asc, callback){
     var query = "SELECT * FROM " + table;
    if (sortBy instanceof Function) {
      callback = sortBy;
    } else {
      query += " ORDER BY " + sortBy.join(",");

      if (limit instanceof Function) {
        callback = limit;
      } else {
        query += " LIMIT " + limit + " OFFSET " + offset;
      }
    }
    database.transaction(
      function (transaction) {
        transaction.executeSql(query, [], function (ignored, resultSet) {
          callback(resultSet);
        });
      },
      function (error) {
        callback(error);
      }
    );
   };

   this.insert = function(obj, callback){
      var cols = Object.keys(obj).join(", ");
    var placeholders = Object.keys(obj).fill("?").join(", ");
    var query =
      `INSERT INTO  ${table} (` + cols + `) VALUES(` + placeholders + `)`;
    database.transaction(function (transaction) {
      transaction.executeSql(
        query,
        Object.values(obj),
        function (transaction, error) {
          callback(transaction);
        },
        function (transaction, error) {
          callback( error);
        }
      );
    });
   };

   this.replace = function (obj, condition,callback) {
    var query = `UPDATE ` + table + ` SET `;
    var cols = Object.keys(obj);
    var vals = Object.values(obj);
    var arr = [];
    for (var i = 0; i < Object.keys(obj).length; i++) {
      arr.push(cols[i] + `=\'` + vals[i] + `\'`);
    }
    query += arr.join(` , `)+` WHERE `+condition;
    database.transaction(function (transaction) {
      transaction.executeSql(
        query,
        undefined,
        function (transaction, error) {
          callback(transaction);
        },
        function (transaction, error) {
          callback(error.message);
        }
      );
    });
  };

   this.remove = function (objOrId, callback) {
    var query = `DELETE FROM ` + table + ` WHERE `;
    if (objOrId instanceof Number) {
      query += `rowid = "` + objOrId + `"`;
    } else {
      var cols = Object.keys(objOrId);
      var vals = Object.values(objOrId);
      var arr = [];
      for (var i = 0; i < Object.keys(objOrId).length; i++) {
        arr.push(cols[i] + `=\'` + vals[i] + `\'`);
      }
      query += arr.join(` AND `);
    }
    database.transaction(function (transaction) {
      transaction.executeSql(
        query,
        undefined,
        function (transaction, error) {
          callback(transaction);
        },
        function (transaction, error) {
          callback( error.message);
        }
      );
    });
  };

}
module.exports=SQLiteStore;
