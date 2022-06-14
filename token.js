const SQL = require("mssql");
const config = require("./config");

async function getToken() {
    let connect = await SQL.connect(config);
    let res = await connect.query(`select * from Token`);
    return res.recordset[0].token_name;
}

module.exports = getToken();