import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus, checkIfApplied } from "../controllers/application.controller.js";

const router = express.Router();

router.get("/",(req,res)=>{
  res.send("API is working");
});

router.route("/apply/:id").post(isAuthenticated, applyJob); 
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);
router.route("/check").get(isAuthenticated, checkIfApplied);

export default router; 

