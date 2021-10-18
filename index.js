//Dependences
const express = require('express')
const app = express()
const morgan = require('morgan')

//routes
const empleados = require("./routes/empleados")
const user = require("./routes/user")

//middleware
const auth = require("./middleware/auth")
const notFound = require("./middleware/notFound")
const index = require("./middleware/index")
const cors = require("./middleware/cors")


app.use(cors)
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", index)
app.use("/user", user)
app.use(auth)
app.use("/panel", empleados)
app.use(notFound)

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running")
})

