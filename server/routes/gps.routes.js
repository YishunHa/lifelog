import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";
import mediaCtrl from "../controllers/media.controller";
import gpsCtrl from "../controllers/gps.controller";

const router = express.Router();

router
  .route("/api/gps/new/:userId")
  .post(authCtrl.requireSignin, gpsCtrl.create);

export default router;
