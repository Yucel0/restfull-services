const router = require("express").Router();
const SQL = require("mssql");
const config = require("../config");

router.get("/", (req, res) => {
    SQL.connect(config).then(status => {
        status.query("select * from WebDeveloper").then(result => {
            res.status(200).json(result.recordset);
        })
    })
})

router.get("/:ID", (req, res) => {
    const {
        ID
    } = req.params;
    SQL.connect(config).then(status => {
        status.query(`select * from WebDeveloper where ID = ${Number(ID)}`).then(result => {
            if(result.recordset.length == 0){
                res.status(200).json({
                    status: false,
                    message: "user not found"
                });
            }else {
                res.status(200).json(result.recordset);
            }
        })
    })
})

router.post("/", (req, res) => {
    const {
        FullName,
        Age,
        JobTitle,
        City,
        Country,
        Username,
        Password
    } = req.body;
    SQL.connect(config).then(status => {
        status.query(`insert into WebDeveloper (FullName,Age,JobTitle,City,Country,Username,Password) values('${FullName}',${Age},'${JobTitle}','${City}','${Country}', 
                '${Username}','${Password}')`);
        res.status(201).json({
            status: true,
            message: "new user added"
        }).end();

    }).catch(err => {
        console.log(err);
    })
})

router.put("/:ID", (req, res) => {
    const {
        ID
    } = req.params;
    const {
        FullName,
        Age,
        JobTitle,
        City,
        Country,
        Username,
        Password
    } = req.body;
    SQL.connect(config).then(status => {
        status.query(`update WebDeveloper set FullName='${FullName}',Age='${Age}',JobTitle='${JobTitle}',City='${City}',Country='${Country}', 
            Username='${Username}',Password='${Password}' where ID = ${Number(ID)}`);
        res.status(201).json({
            status: true,
            message: "changed successfully"
        }).end();

    }).catch(err => {
        throw err;
    })
})

router.delete("/:ID", (req, res) => {
    const {
        ID
    } = req.params;
    SQL.connect(config).then(status => {
        status.query(`delete from WebDeveloper where ID = ${Number(ID)}`)
        res.status(202).json({
            status: true,
            message: "successfully deleted"
        }).end();
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;