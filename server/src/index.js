const express = require('express')
const app = express()
const cors = require("cors");
const route = require('./routes');
const helmet = require("helmet");
require('dotenv').config();
const port = parseInt(process.env.PORT);
const session = require('express-session');

// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET
// }));
const allowedOrigins = [process.env.ORIGIN_PATH, "http://localhost:3000"];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET','POST','PUT', 'DELETE', 'PATCH'],
        credentials: true,
        exposedHeaders: 'isAuth',
    }
));

if(process.env.NODE_ENV === 'development'){
    const morgan = require("morgan");
    app.use(morgan("combined"));
}



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

route(app);
//socket(io);

app.listen(port, ()=> {
    console.log(`Server is running in `+ process.env.NODE_ENV);
});
// server.listen(portSocket, ()=> {
//     console.log(`Server socket is running on: http://localhost:${portSocket} `);
// });
