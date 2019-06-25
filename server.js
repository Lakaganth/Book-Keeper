const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json({ extended: false }));

connectDB();

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
