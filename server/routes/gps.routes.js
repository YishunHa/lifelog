import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";
import gpsCtrl from "../controllers/gps.controller";

const router = express.Router();

router
  .route("/api/gps/new/:userId")
  .post(authCtrl.requireSignin, gpsCtrl.create);

router.route("/api/gps/by/:userId").get(gpsCtrl.listByUser);

router.param("userId", userCtrl.userByID);

export default router;
