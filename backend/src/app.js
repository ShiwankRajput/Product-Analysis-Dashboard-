const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const trackRoutes = require("./routes/track.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

app.use(
  cors({
    origin: "https://product-analysis-dashboard-frontend.onrender.com/api",
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/track", trackRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;