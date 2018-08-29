import Media from "../models/media.model";
import _ from "lodash";
import errorHandler from "./../helpers/dbErrorHandler";
import formidable from "formidable";
import fs from "fs";

const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    let media = new Media(fields);
    media.mediaedBy = req.profile;
    if (files.photo) {
      media.photo.data = fs.readFileSync(files.photo.path);
      media.photo.contentType = files.photo.type;

      // var hi = fs.readFileSync(files.photo.path);
      // var encodehi = new Buffer(hi).toString("base64");
      // //console.log("encodehi.toString()");
      // var path = files.photo.path;
      // function upExif(e) {
      //   // EXIF.getData(e, function() {
      //   //   var datetime = EXIF.getTag(this, "DateTimeDigitized");
      //   //   for (var i = 0; i < 2; i++) {
      //   //     datetime = datetime.replace(/:/, "/");
      //   //   }
      //   //   var date = new Date(datetime);
      //   //   date = date.toISOString();
      //   //   console.log("in the function");
      //   // });
      //   console.log(e);
      // }
      // upExif(encodehi);
    }
    media.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(result);
    });
  });
};

const mediaByID = (req, res, next, id) => {
  Media.findById(id)
    .populate("mediaedBy", "_id name")
    .exec((err, media) => {
      if (err || !media)
        return res.status("400").json({
          error: "Media not found"
        });
      req.media = media;
      next();
    });
};

const listByUser = (req, res) => {
  Media.find({ mediaedBy: req.profile._id })
    .populate("comments", "text created")
    .populate("comments.mediaedBy", "_id name")
    .populate("mediaedBy", "_id name")
    .sort("-taken")
    .exec((err, medias) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(medias);
    });
};

const remove = (req, res) => {
  let media = req.media;
  media.remove((err, deletedMedia) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(deletedMedia);
  });
};

const photo = (req, res, next) => {
  res.set("Content-Type", req.media.photo.contentType);
  return res.send(req.media.photo.data);
};

const like = (req, res) => {
  Media.findByIdAndUpdate(
    req.body.mediaId,
    { $push: { likes: req.body.userId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(result);
  });
};

const unlike = (req, res) => {
  Media.findByIdAndUpdate(
    req.body.mediaId,
    { $pull: { likes: req.body.userId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(result);
  });
};

const comment = (req, res) => {
  let comment = req.body.comment;
  comment.mediaedBy = req.body.userId;
  Media.findByIdAndUpdate(
    req.body.mediaId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("comments.mediaedBy", "_id name")
    .populate("mediaedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(result);
    });
};
const uncomment = (req, res) => {
  let comment = req.body.comment;
  Media.findByIdAndUpdate(
    req.body.mediaId,
    { $pull: { comments: { _id: comment._id } } },
    { new: true }
  )
    .populate("comments.mediaedBy", "_id name")
    .populate("mediaedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(result);
    });
};

const isMediaer = (req, res, next) => {
  let isMediaer =
    req.media && req.auth && req.media.mediaedBy._id == req.auth._id;
  if (!isMediaer) {
    return res.status("403").json({
      error: "User is not authorized"
    });
  }
  next();
};

export default {
  listByUser,
  create,
  mediaByID,
  remove,
  photo,
  like,
  unlike,
  comment,
  uncomment,
  isMediaer
};
