import express from "express";
import {
    getTeachers,

} from "../controllers/teachers/teacher.controller.js";


const router = express.Router();


// ----- READ -----
router.get("/", getTeachers);




export default router;