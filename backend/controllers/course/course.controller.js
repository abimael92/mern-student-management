import Course from "../../models/course.schema.js";
import { generateCourseCode } from '../../services/subjectCode.service.js';


// ----- READ -----
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        console.log('Courses fetched:', courses.length);
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ----- CREATE -----
export const createCourse = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ message: "Course name is required" });
        }

        const code = await generateCourseCode(req.body.name);
        if (!code) {
            return res.status(400).json({ message: "Failed to generate course code" });
        }

        const course = new Course({
            ...req.body,
            code,  // Assign generated code here
        });

        await course.save();
        res.status(201).json(course);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// ----- UPDATE -----
export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ----- DELETE -----
export const deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
