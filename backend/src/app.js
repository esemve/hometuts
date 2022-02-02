const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');
const scanner = require('./services/Scanner');
const config = require('./config/config');


const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

scanner.scan();

sequelize.sync()
    .then(() => {
        app.listen(config.port, () => {
            console.log('server is listening on port '+ config.port + '...')
        })
    });
