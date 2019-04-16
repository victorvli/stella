import Mysql from 'mysql'
import MysqlConfig from './mysqlConfig'

var pool = Mysql.createPool({
    host     : MysqlConfig.host,
    user     : MysqlConfig.user,
    password : MysqlConfig.password,
    database : MysqlConfig.database
});


export default class DB {
    static query( sql, values ) {
        return new Promise(( resolve, reject ) => {
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject( err )
                } else {
                    connection.query(sql, values, ( err, rows) => {

                        if ( err ) {
                            reject( err )
                        } else {
                            resolve( rows )
                        }
                        connection.release()
                    })
                }
            })
        })
    }
}