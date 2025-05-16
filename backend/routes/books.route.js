import express from "express";
import {
    getTextbooks
} from "../controllers/books/books.controller.js";

const router = express.Router();

// ----- READ -----
router.get("/", getTextbooks);


export default router;
