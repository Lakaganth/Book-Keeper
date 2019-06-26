const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
const pasth = require("path");

const app = express();
app.use(cors());

app.use(express.json({ extended: false }));

connectDB();

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));

//Serve Static Assets in Production

if (process.env.NODE_ENV === "production") {
  //SET STATIC FOLDER

  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
