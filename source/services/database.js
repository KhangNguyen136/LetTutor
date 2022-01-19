import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: 'userDB.db' });

export function initDB(callBack) {
    db.transaction(tx => {
        // tx.executeSql('drop table userInfoTable');
        tx.executeSql(
            'create table if not exists userInfoTable(id integer primary key, accessToken text, refreshToken text)'
        )
        tx.executeSql(
            'select * from userInfoTable where id = ?', [0],
            (tx, result) => {
                console.log(result)
                if (result.rows.length == 0) {
                    callBack(null, null)
                }
                else {
                    const data = result.rows.item(0);
                    callBack(data.accessToken, data.refreshToken);
                }
            }
        )
    }, errorHandle)
}

export function saveTokenToDB(accessToken, refreshToken) {
    db.transaction(
        tx => {
            tx.executeSql('select * from userInfoTable where id =?', [0],
                (tx, result) => {
                    if (result.rows.length == 0) {
                        tx.executeSql(
                            'insert into userInfoTable(id, accessToken, refreshToken) values (?,?,?)',
                            [0, accessToken, refreshToken]
                        )
                    }
                    else {
                        tx.executeSql(
                            'update userInfoTable set accessToken = ?, refreshToken = ?',
                            [accessToken, refreshToken]
                        )
                    }
                })
        }, errorHandle
    )
}

export function ResetDB() {
    db.transaction(tx => {
        tx.executeSql('delete from userInfoTable')
    }, errorHandle)
}

function errorHandle(error) {
    console.log(error);
}