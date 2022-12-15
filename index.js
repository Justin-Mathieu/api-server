require('dotenv').config();
const { sequelize } = require('./src/models');
const { server } = require('./src/server');

const port = process.env.PORT || 3000;
server.listen(port, async () => {
    await sequelize.sync();
    console.log(`server listening on ${port}`);
});

