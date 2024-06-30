module.exports = {

  gerreportbydate: function (db, sql) {
    return new Promise((resolve, reject) => {
      db.query(`Select  [GAMEID],[TICKETTOTALRS],[TICKETTOTALRS],[TICKETNUMBER],CONVERT(VARCHAR, [GAMETIME], 105) + ' ' + CONVERT(VARCHAR, [GAMETIME], 108) AS GAMETIME,[WINRS],[GAMERESULT] from ticket99 where gamedate=CONVERT(DATE,'${sql['date']}') and tarminalid='${sql['username']}'  order by INTNUMBER DESC`).then((data) => {
        arraydata = []
        data.recordsets.forEach(element => {
          arraydata.push(element);
        });

        resolve(arraydata);
      })
        .catch((err) => {
          reject(err);
        }
        )

    })
  },
  getreportbydateandid: function (db, sql) {
    return new Promise((resolve, reject) => {
      db.query(`Select  [GAMEID],[TICKETTOTALRS],[TICKETTOTALRS],[TICKETNUMBER],CONVERT(VARCHAR, [GAMETIME], 105) + ' ' + CONVERT(VARCHAR, [GAMETIME], 108) AS GAMETIME,[WINRS],[GAMERESULT]from ticket99 where GAMEID='${sql['gameid']}' and gamedate=CONVERT(DATE,'${sql['date']}') and tarminalid='${sql['username']}'  order by INTNUMBER DESC`).then((data) => {
        arraydata = []
        data.recordsets.forEach(element => {
          arraydata.push(element);
        });

        resolve(arraydata);
      })
        .catch((err) => {
          reject(err);
        }
        )

    })
  },
  getticketbybarcode: function (db, sql) {
    return new Promise((resolve, reject) => {
      db.query(`Select  *,ISNULL(TARMINALCLS,"NOGO") as status from ticket99 where TICKETNUMBER='${sql['barcode']}'  order by INTNUMBER DESC`).then((data) => {
        arraydata = []
        data.recordsets.forEach(element => {
          arraydata.push(element);
        });

        resolve(arraydata);
      })
        .catch((err) => {
          reject(err);
        }
        )

    })
  },
  //SELECT [GAMEDATE] as date, [TICKETTOTALRS] as purchasepoint, [WINRS] as pwtpoint,[TICKETTOTALRS]-[WINRS] as netpoint FROM ticket99 where gamedate BETWEEN CONVERT(DATE, '2024-03-06') AND CONVERT(DATE, '2024-03-10') AND tarminalid = 'ADMIN' ORDER BY INTNUMBER DESC;
  getreportfromdatetilldate: function (db, sql) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT [GAMEDATE] as date, [TICKETTOTALRS] as purchasepoint, [WINRS] as pwtpoint,[TICKETTOTALRS]-[WINRS] as netpoint FROM ticket99 where gamedate BETWEEN CONVERT(DATE, '${sql["start_date"]}') AND CONVERT(DATE,'${sql["end_date"]}') AND tarminalid = '${sql['username']}'  ORDER BY INTNUMBER DESC;`).then((data) => {
        arraydata = []
        data.recordsets.forEach(element => {
          arraydata.push(element);
        });

        resolve(arraydata);
      })
        .catch((err) => {
          reject(err);
        }
        )

    })
  }
}
//get result by date for all 
//Select ticketnumber,gamedate,DROWTIME,gametime,tickettotalrs,tarminalcls from ticket99 where gamedate=CONVERT(DATE,'2024-03-13') and tarminalid='ADMIN' order by INTNUMBER DESC 
