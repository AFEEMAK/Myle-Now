require("dotenv").config();

const http = require("http");
const express = require("express");
const cookiesParser = require("cookie-parser");

const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const homeRoutes = require("./routes/home");
const serviceRoutes = require("./routes/service");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');



// express app
const app = express();
// middleware
app.use(express.json());
app.use(cookiesParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


app.use("/api/user", userRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/home/four-categories", homeRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/serviceproviders', serviceProviderRoutes);




mongoose.set("debug", true);

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
