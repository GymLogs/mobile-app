
 const SQLiteConnector=require("../service/SQLite/SQLiteConnector.js");
 const SQLiteStore=require("../service/SQLite/SQLiteStore.js");
 const sqlDB=new SQLiteConnector();
 const sqlStore=new SQLiteStore(sqlDB,"UserTable",["name","phone"]);

  describe("SQLiteStore:insert",()=>{

   test("Should return value with promise",async()=>{
       return sqlStore.insert({name:"Jhon",phone:"333"},fn).then(data=>{
            expect(data).toBe(data)//???
       })     
    })
    test("Should return error",async()=>{
     return sqlStore.insert().then(data=>{
          expect(data).toBeInstanceOf(Error);
     })     
  })
})
describe("SQLiteStore:replace",()=>{

     test("Should return value with promise",async()=>{
         return sqlStore.replace({name:"Mike"},phone="333",fn).then(data=>{
              expect(data).toBe(data)//???
         })     
      })
      test("Should return error",async()=>{
       return sqlStore.insert().then(data=>{
            expect(data).toBeInstanceOf(Error);
       })     
    })
  })
  describe("SQLiteStore:remove",()=>{

     test("Should return value with promise",async()=>{
         return sqlStore.remove({name:"Mike"},fn).then(data=>{
              expect(data).toBe(data)//???
         })     
      })
      test("Should return error",async()=>{
       return sqlStore.insert().then(data=>{
            expect(data).toBeInstanceOf(Error);
       })     
    })
  })
  
