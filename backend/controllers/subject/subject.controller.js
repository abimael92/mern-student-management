import Subject from '../../models/subject.schema.js';
import { generateSubjectCode } from '../../services/subjectCode.service.js';

// Create a new subject
export const createSubject = async (req, res) => {
    try {
        const subjectCode = await generateSubjectCode(req.body.name); // Generate the subject code
        const subject = new Subject({ ...req.body, code: subjectCode }); // Add the generated code to the subject
        await subject.save();
        res.status(201).json(subject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all subjects
export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get one subject by ID
export const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) return res.status(404).json({ error: 'Subject not found' });
        res.json(subject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Subject controller
export const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };



        // Check if subject exists
        const existingSubject = await Subject.findById(id);
        if (!existingSubject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        // Proceed with update
        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.json(updatedSubject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete subject
export const deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) return res.status(404).json({ error: 'Subject not found' });
        res.json({ message: 'Subject deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
