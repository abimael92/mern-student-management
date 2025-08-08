import Course from "../../models/course.schema.js";
import { generateCourseCode } from '../../services/codeGenerator.service.js';


// ----- READ -----
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getCourseWithSubjects = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('subject', 'name code');

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ----- CREATE -----
export const createCourse = async (req, res) => {
    try {
        if (!req.body.name || !req.body.credits || !req.body.description || !req.body.subject || !req.body.semester || !req.body.prerequisites) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const courseCode = await generateCourseCode(req.body.name);
        if (!courseCode) {
            return res.status(400).json({ message: "Failed to generate course code" });
        }

        const course = new Course({
            ...req.body,
            courseCode, // 🔧 fix field name
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

export const assignSubjectToCourse = async (req, res) => {
    try {
        const { subjectId } = req.body;

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid course ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
            return res.status(400).json({ message: "Invalid subject ID" });
        }

        // Check if subject exists
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { subject: subjectId },
            { new: true }
        ).populate('subject', 'name code');

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
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
