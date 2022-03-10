    function SQLiteConnector(){
     var  db = window.sqlitePlugin.openDatabase({
        name: 'myDataBase.db',
        location: 'default'
      });
  }
 module.exports=SQLiteConnector;