function SQLiteStore(database, table, columns){

   /* initialise table here */


   this.fetch = function(limit, offset, sortBy, asc, callback){
     var query = "select * from "+table;
     if(limit instanceof Function){
       callback = limit;
     }else{
       query += " limit "+limit+" offset "+offset;
       if(sortBy instanceof Function){
         callback = sortBy;
       }
       else {
         query +=" sorty by "+(sortBy.join(","));
       }
     }
     database.transaction(function(transaction) {
       transaction.executeSql(query, [], function(ignored, resultSet) {
        callback(resultSet);
        });
      }, function(error) {
          callback(null, 'SELECT count error: ' + error.message);
      });
   };

   this.insert = function(obj, callback){
      callback(false);
   };

   this.replace = function(obj,callback){
     callback(false);
   };

   this.remove = function(objOrId, callback){
     callback(false);
   };

}
