import express from "express"
import morgan from "morgan"

const app = express()

// middleware
app.use(express.json());
app.use(morgan('dev'));

app.get("/", (req, res) => {
    res.send({username: "Dinesh Tamang"});
})


app.listen(5000, () => console.log("server is running on port 5000"))