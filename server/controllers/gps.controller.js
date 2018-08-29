import GPS from "../models/gps.model";
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
        error: "GPS could not be uploaded"
      });
    }
    let gps = new GPS(fields);
    gps.UploadBy = req.profile;
    if (files.file) {
      console.log(files.file);
      gps.file.data = fs.readFileSync(files.file.path);
      gps.file.contentType = files.file.type;
    }
    gps.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(result);
    });
  });
};

export default {
  create
};
