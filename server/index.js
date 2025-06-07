require("dotenv").config();

const express = require("express");
const cors = require("cors");
const allRoutes = require("./routes/allRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", allRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started running at port ${PORT}`);
});
