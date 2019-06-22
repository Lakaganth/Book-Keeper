const express = require("express");

const app = express();

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
