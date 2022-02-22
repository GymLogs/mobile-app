function SQLiteConnector(dbName){
  var database = window.sqlitePlugin.openDatabase({name: dbName, location: 'default'});
  return database;
}
