const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//importing models
const sequelize = require('./util/database');
const User = require('./models/user');
const Address = require('./models/address');
//routes
const authRoutes = require('./routes/auth');
const addressRoutes = require('./routes/address');

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(addressRoutes);

app.use((error, req, res, next) => {
    if(!error.field) {
        return res.status(400).json({
            error:error.message,
        })
    } else {
        return res.status(error.status).json({
            message:error.message,
            field:error.field,
        })
    }
})
Address.belongsTo(User);
User.hasMany(Address);


sequelize.sync()
.then(()=> {
    app.listen(3000,()=> {
        console.log('listening at http://localhost:3000');
    })
})
.catch(err => console.log(err));
