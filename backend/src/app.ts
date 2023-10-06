import express from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./routes/index";

const app = express();

//app middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app routes
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is Listening on PORT ${PORT}`);
});
