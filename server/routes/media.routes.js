import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";
import mediaCtrl from "../controllers/media.controller";

const router = express.Router();

router
  .route("/api/medias/new/:userId")
  .post(authCtrl.requireSignin, mediaCtrl.create);

router.route("/api/medias/photo/:mediaId").get(mediaCtrl.photo);

router
  .route("/api/medias/by/:userId")
  .get(authCtrl.requireSignin, mediaCtrl.listByUser);

router
  .route("/api/medias/feed/:userId")
  .get(authCtrl.requireSignin, mediaCtrl.listNewsFeed);

router.route("/api/medias/like").put(authCtrl.requireSignin, mediaCtrl.like);
router
  .route("/api/medias/unlike")
  .put(authCtrl.requireSignin, mediaCtrl.unlike);

router
  .route("/api/medias/comment")
  .put(authCtrl.requireSignin, mediaCtrl.comment);
router
  .route("/api/medias/uncomment")
  .put(authCtrl.requireSignin, mediaCtrl.uncomment);

router
  .route("/api/medias/:mediaId")
  .delete(authCtrl.requireSignin, mediaCtrl.isMediaer, mediaCtrl.remove);

router.param("userId", userCtrl.userByID);
router.param("mediaId", mediaCtrl.mediaByID);

export default router;
