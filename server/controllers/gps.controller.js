import GPS from "../models/gps.model";
import _ from "lodash";
import errorHandler from "./../helpers/dbErrorHandler";
import formidable from "formidable";
import fs from "fs";
import csv from "fast-csv";
import mongoose from "mongoose";

const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  //console.log(req);
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "GPS could not be uploaded"
      });
    }
    //let gps = new GPS(fields);
    var UploadBy = req.profile;
    if (files.file) {
      let info = [];
      csv
        .fromPath(files.file.path, {
          headers: true,
          ignoreEmpty: true
        })
        .on("data", function(data) {
          data["UploadBy"] = UploadBy;
          data["_id"] = new mongoose.Types.ObjectId();
          info.push(data);
        })
        .on("end", function() {
          GPS.create(info, function(err, docoment) {
            if (err) {
              return res.status(400).json({
                error:
                  "file format is not compatible by the system,plase rename the header of the csv,and repalce space with '_'"
              });
            }
          });
          res.json(info.length + " GPS records have successfully uploaded.");
        });
      //gps.file.data = fs.readFileSync(files.file.path);
      //gps.file.contentType = files.file.type;
    }
    // gps.save((err, result) => {
    //   if (err) {
    //     return res.status(400).json({
    //       error: errorHandler.getErrorMessage(err)
    //     });
    //   }
    //   res.json(result);
    // });
  });
};

const listByUser = (req, res) => {
  GPS.find({ UploadBy: req.profile._id })
    .populate("UploadBy", "_id name")
    .sort("-UTC_DATE")
    .skip(0)
    .exec((err, gpsinfo) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(gpsinfo);
    });
};

export default {
  create,
  listByUser
};
