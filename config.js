const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DB,
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true
    },
    port: 1433
}

module.exports = config;