import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.get("/",(req,res)=>{
  res.send("API is working");
});

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getComapny);
router.route("/get/:id").get(isAuthenticated, getComapnyById);
router.route("/update/:id").put(isAuthenticated,updateCompany);

export default router;
