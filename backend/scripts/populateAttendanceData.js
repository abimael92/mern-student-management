// ===== ./backend/scripts/populateNarutoAttendance.js =====
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from '../modules/students/student.schema.js';
import Teacher from '../modules/teachers/teacher.schema.js';
import Class from '../modules/classes/class.schema.js';
import AttendanceRecord from '../modules/attendance/attendance.schema.js';

dotenv.config();

// Suppress Mongoose warning
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Grade Level Mapper - Maps Naruto ranks to actual GradeEnum values
const GRADE_MAPPER = {
    'Academy Student': 'Kindergarten',
    'Genin': '6th',           // Middle school equivalent
    'Chunin': '9th',          // Early high school
    'Jonin': '12th',          // Senior year
    'Special Jonin': '12th',
    'Kage': '12th'
};

// NARUTO CHARACTER DATA - Updated with actual grade levels + aliases
const NARUTO_CHARACTERS = {
    // TEAM 7 (Kakashi's Team) - Genin (Middle School)
    team7: {
        students: [
            {
                firstName: 'Naruto',
                lastName: 'Uzumaki',
                studentNumber: 'ST2025-101',
                gradeAlias: 'Genin',
                gradeLevel: '6th',
                age: 12,
                gender: 'male',
                attendancePattern: 'oftenLate'
            },
            {
                firstName: 'Sasuke',
                lastName: 'Uchiha',
                studentNumber: 'ST2025-102',
                gradeAlias: 'Genin',
                gradeLevel: '6th',
                age: 12,
                gender: 'male',
                attendancePattern: 'sometimesAbsent'
            },
            {
                firstName: 'Sakura',
                lastName: 'Haruno',
                studentNumber: 'ST2025-103',
                gradeAlias: 'Genin',
                gradeLevel: '6th',
                age: 12,
                gender: 'female',
                attendancePattern: 'alwaysPresent'
            }
        ],
        teacher: {
            firstName: 'Kakashi',
            lastName: 'Hatake',
            teacherNumber: 'TC2025-101',
            gradeAlias: 'Jonin'  // Teacher rank
        },
        className: 'Team 7',
        classCode: 'T7N2025'
    },

    // TEAM 8 (Kurenai's Team) - Genin (Middle School)
    team8: {
        students: [
            {
                firstName: 'Hinata',
                lastName: 'Hyuga',
                studentNumber: 'ST2025-104',
                gradeAlias: 'Genin',
                gradeLevel: '7th',
                age: 13,
                gender: 'female',
                attendancePattern: 'usuallyPresent'
            },
            {
                firstName: 'Kiba',
                lastName: 'Inuzuka',
                studentNumber: 'ST2025-105',
                gradeAlias: 'Genin',
                gradeLevel: '7th',
                age: 13,
                gender: 'male',
                attendancePattern: 'usuallyPresent'
            },
            {
                firstName: 'Shino',
                lastName: 'Aburame',
                studentNumber: 'ST2025-106',
                gradeAlias: 'Genin',
                gradeLevel: '7th',
                age: 13,
                gender: 'male',
                attendancePattern: 'alwaysPresent'
            }
        ],
        teacher: {
            firstName: 'Kurenai',
            lastName: 'Yuhi',
            teacherNumber: 'TC2025-102',
            gradeAlias: 'Jonin'
        },
        className: 'Team 8',
        classCode: 'T8N2025'
    },

    // TEAM 10 (Asuma's Team) - Chunin (High School)
    team10: {
        students: [
            {
                firstName: 'Shikamaru',
                lastName: 'Nara',
                studentNumber: 'ST2025-107',
                gradeAlias: 'Chunin',
                gradeLevel: '9th',
                age: 15,
                gender: 'male',
                attendancePattern: 'sometimesLate'
            },
            {
                firstName: 'Choji',
                lastName: 'Akimichi',
                studentNumber: 'ST2025-108',
                gradeAlias: 'Chunin',
                gradeLevel: '9th',
                age: 15,
                gender: 'male',
                attendancePattern: 'usuallyPresent'
            },
            {
                firstName: 'Ino',
                lastName: 'Yamanaka',
                studentNumber: 'ST2025-109',
                gradeAlias: 'Chunin',
                gradeLevel: '9th',
                age: 15,
                gender: 'female',
                attendancePattern: 'usuallyPresent'
            }
        ],
        teacher: {
            firstName: 'Asuma',
            lastName: 'Sarutobi',
            teacherNumber: 'TC2025-103',
            gradeAlias: 'Special Jonin'
        },
        className: 'Team 10',
        classCode: 'T102025'
    },

    // TEAM GUY (Might Guy's Team) - Genin (Middle School)
    teamGuy: {
        students: [
            {
                firstName: 'Rock',
                lastName: 'Lee',
                studentNumber: 'ST2025-110',
                gradeAlias: 'Genin',
                gradeLevel: '6th',
                age: 12,
                gender: 'male',
                attendancePattern: 'alwaysPresent'
            },
            {
                firstName: 'Neji',
                lastName: 'Hyuga',
                studentNumber: 'ST2025-111',
                gradeAlias: 'Genin',
                gradeLevel: '7th',
                age: 13,
                gender: 'male',
                attendancePattern: 'usuallyPresent'
            },
            {
                firstName: 'Tenten',
                lastName: 'Unknown',
                studentNumber: 'ST2025-112',
                gradeAlias: 'Genin',
                gradeLevel: '7th',
                age: 13,
                gender: 'female',
                attendancePattern: 'usuallyPresent'
            }
        ],
        teacher: {
            firstName: 'Might',
            lastName: 'Guy',
            teacherNumber: 'TC2025-104',
            gradeAlias: 'Jonin'
        },
        className: 'Team Guy',
        classCode: 'TGN2025'
    }
};

const populateData = async () => {
    try {
        console.log('🎯 Starting Naruto-themed data population...');
        console.log('✨ Creating authentic Naruto anime school system\n');
        console.log('📚 Grade System: Using actual GradeEnum values with Naruto aliases\n');

        // ==================== CREATE TEACHERS ====================
        console.log('👨‍🏫 Creating/updating teachers...');
        const createdTeachers = {};

        for (const teamKey in NARUTO_CHARACTERS) {
            const team = NARUTO_CHARACTERS[teamKey];
            const teacherData = team.teacher;

            // Check if teacher exists
            let teacher = await Teacher.findOne({
                teacherNumber: teacherData.teacherNumber
            });

            if (!teacher) {
                teacher = await Teacher.create({
                    teacherNumber: teacherData.teacherNumber,
                    firstName: teacherData.firstName,
                    lastName: teacherData.lastName,
                    email: `${teacherData.firstName.toLowerCase()}.${teacherData.lastName.toLowerCase()}@konoha.edu`,
                    isActive: true,
                    status: 'available',
                    subjects: ['Ninjutsu', 'Taijutsu', 'Genjutsu'],
                    profilePicture: '',
                    yearsOfExperience: Math.floor(Math.random() * 15) + 5,
                    hireDate: new Date(2015, 0, 1)
                });
                console.log(`✅ Created teacher: ${teacher.firstName} ${teacher.lastName} (${teacherData.gradeAlias})`);
            } else {
                console.log(`✓ Teacher exists: ${teacher.firstName} ${teacher.lastName}`);
            }

            createdTeachers[teamKey] = teacher;
        }

        // ==================== CREATE STUDENTS ====================
        console.log('\n👨‍🎓 Creating/updating students...');
        const createdStudents = {};

        for (const teamKey in NARUTO_CHARACTERS) {
            const team = NARUTO_CHARACTERS[teamKey];
            const teamStudents = [];

            for (const studentData of team.students) {
                // Check if student exists
                let student = await Student.findOne({
                    studentNumber: studentData.studentNumber
                });

                if (!student) {
                    // Calculate date of birth based on age
                    const currentYear = new Date().getFullYear();
                    const birthYear = currentYear - studentData.age;
                    const dob = new Date(birthYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);

                    student = await Student.create({
                        studentNumber: studentData.studentNumber,
                        firstName: studentData.firstName,
                        lastName: studentData.lastName,
                        isEnrolled: true,
                        enrollmentDate: new Date(2025, 0, 1),
                        gradeLevel: studentData.gradeLevel,      // Actual GradeEnum value
                        gradeAlias: studentData.gradeAlias,      // Naruto alias
                        dateOfBirth: dob,
                        gender: studentData.gender,
                        contact: {
                            email: `${studentData.firstName.toLowerCase()}.${studentData.lastName.toLowerCase()}@konoha.edu`,
                            phone: `555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
                        },
                        _attendancePattern: studentData.attendancePattern // Custom field for our logic
                    });
                    console.log(`✅ Created student: ${student.firstName} ${student.lastName} (${student.gradeLevel} - ${student.gradeAlias})`);
                } else {
                    // Update existing student with attendance pattern and alias
                    student._attendancePattern = studentData.attendancePattern;
                    if (!student.gradeAlias) {
                        student.gradeAlias = studentData.gradeAlias;
                    }
                    await student.save();
                    console.log(`✓ Student exists: ${student.firstName} ${student.lastName} (${student.gradeLevel} - ${student.gradeAlias})`);
                }

                teamStudents.push(student);
            }

            createdStudents[teamKey] = teamStudents;
        }

        // ==================== CREATE CLASSES ====================
        console.log('\n🏫 Creating/updating classes...');
        const createdClasses = {};

        for (const teamKey in NARUTO_CHARACTERS) {
            const team = NARUTO_CHARACTERS[teamKey];
            const teacher = createdTeachers[teamKey];
            const students = createdStudents[teamKey];

            // Check if class exists
            let classDoc = await Class.findOne({
                name: team.className
            });

            if (!classDoc) {
                classDoc = await Class.create({
                    name: team.className,
                    section: teamKey === 'team7' ? 'A' : teamKey === 'team8' ? 'B' : teamKey === 'team10' ? 'C' : 'D',
                    code: team.classCode,
                    teacher: teacher._id,
                    maxCapacity: 3,
                    schedule: getClassSchedule(teamKey),
                    isActive: true,
                    attendanceRequired: true,
                    isExtracurricular: false,
                    students: students.map(student => ({
                        student: student._id,
                        enrollmentDate: new Date(),
                        status: 'active'
                    }))
                });
                console.log(`✅ Created class: ${classDoc.name} (${team.gradeAlias ? team.gradeAlias + ' Level' : ''})`);
            } else {
                console.log(`✓ Class exists: ${classDoc.name}`);

                // Update class with correct teacher and students
                classDoc.teacher = teacher._id;
                classDoc.students = students.map(student => ({
                    student: student._id,
                    enrollmentDate: new Date(),
                    status: 'active'
                }));
                await classDoc.save();
            }

            // Update students with enrolled class
            for (const student of students) {
                if (!student.enrolledClasses || !student.enrolledClasses.includes(classDoc._id)) {
                    student.enrolledClasses = student.enrolledClasses || [];
                    student.enrolledClasses.push(classDoc._id);
                    await student.save();
                }
            }

            createdClasses[teamKey] = classDoc;
        }

        // ==================== CREATE ATTENDANCE RECORDS ====================
        console.log('\n📝 Creating detailed attendance records...');

        // Create attendance for the past 30 days (more comprehensive)
        const attendanceRecords = [];
        const totalDays = 30;
        const today = new Date();

        for (let day = 0; day < totalDays; day++) {
            const date = new Date(today);
            date.setDate(date.getDate() - day);
            date.setHours(0, 0, 0, 0);

            // Skip weekends (Saturday=6, Sunday=0)
            if (date.getDay() === 0 || date.getDay() === 6) continue;

            const dayOfWeek = date.getDay(); // 1=Monday, 5=Friday

            for (const teamKey in createdClasses) {
                const classDoc = createdClasses[teamKey];
                const students = createdStudents[teamKey];

                // Check if class has schedule on this day
                const hasClassToday = classDoc.schedule?.some(s =>
                    s.day === getDayName(dayOfWeek) && s.active === true
                );

                if (!hasClassToday) continue;

                for (const student of students) {
                    // Skip if attendance already exists
                    const existingAttendance = await AttendanceRecord.findOne({
                        student: student._id,
                        class: classDoc._id,
                        date: {
                            $gte: new Date(date.setHours(0, 0, 0, 0)),
                            $lte: new Date(date.setHours(23, 59, 59, 999))
                        }
                    });

                    if (existingAttendance) continue;

                    // Determine status based on character pattern and day
                    const status = getNarutoAttendanceStatus(student, day, dayOfWeek, classDoc);

                    // Create check-in time (9 AM with variations)
                    let checkInTime = null;
                    if (status === 'present' || status === 'late') {
                        checkInTime = new Date(date);
                        checkInTime.setHours(9, 0, 0, 0);

                        if (status === 'late') {
                            // Late by 5-30 minutes
                            const lateMinutes = 5 + Math.floor(Math.random() * 25);
                            checkInTime.setMinutes(checkInTime.getMinutes() + lateMinutes);
                        }

                        // Add some random variation even for on-time
                        const variation = Math.floor(Math.random() * 10) - 5;
                        checkInTime.setMinutes(checkInTime.getMinutes() + variation);
                    }

                    attendanceRecords.push({
                        student: student._id,
                        class: classDoc._id,
                        date: date,
                        status: status,
                        checkInTime: checkInTime,
                        markedBy: classDoc.teacher,
                        session: 'full_day',
                        remarks: getNarutoAttendanceRemarks(student, status, day),
                        isExcused: status === 'absent' && (student.firstName === 'Sasuke' || day % 7 === 0)
                    });
                }
            }
        }

        if (attendanceRecords.length > 0) {
            await AttendanceRecord.insertMany(attendanceRecords);
            console.log(`✅ Created ${attendanceRecords.length} detailed attendance records`);

            // Create some special events
            await createSpecialEvents(createdClasses, createdStudents, createdTeachers);
        } else {
            console.log('✓ Attendance records already exist');
        }

        // ==================== SUMMARY ====================
        console.log('\n🎉 Naruto data population completed successfully!');
        console.log('='.repeat(50));
        console.log('\n📊 FINAL DATABASE STATUS:');
        console.log(`   👨‍🏫 Teachers: ${await Teacher.countDocuments()}`);
        console.log(`   👨‍🎓 Students: ${await Student.countDocuments()}`);
        console.log(`   🏫 Classes: ${await Class.countDocuments()}`);
        console.log(`   📝 Attendance Records: ${await AttendanceRecord.countDocuments()}`);

        console.log('\n👥 CLASS ROSTERS:');
        for (const teamKey in NARUTO_CHARACTERS) {
            const team = NARUTO_CHARACTERS[teamKey];
            console.log(`\n   ${team.className} (${team.gradeAlias ? team.gradeAlias + ' Level' : ''}):`);
            console.log(`     👨‍🏫 Teacher: ${team.teacher.firstName} ${team.teacher.lastName} (${team.teacher.gradeAlias})`);
            console.log(`     👨‍🎓 Students:`);
            team.students.forEach(s => {
                console.log(`       - ${s.firstName} ${s.lastName} (Grade ${s.gradeLevel} - ${s.gradeAlias})`);
            });
        }

        console.log('\n📈 ATTENDANCE INSIGHTS:');
        console.log('   • Naruto: Often late (training too hard)');
        console.log('   • Sasuke: Sometimes absent (revenge missions)');
        console.log('   • Sakura: Perfect attendance (studious)');
        console.log('   • Rock Lee: Always early (youth!)');
        console.log('   • Shikamaru: Finds attendance "troublesome"');

        console.log('\n✅ Your Naruto-themed attendance system is ready!');
        console.log('🌊 Believe it!');

    } catch (error) {
        console.error('❌ Error populating data:', error.message);
        if (error.errors) {
            Object.keys(error.errors).forEach(key => {
                console.error(`   ${key}: ${error.errors[key].message}`);
            });
        }
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
};

// Helper functions
function getClassSchedule(teamKey) {
    const baseSchedule = [
        { day: 'Monday', startTime: '09:00', endTime: '12:00', active: true },
        { day: 'Wednesday', startTime: '09:00', endTime: '12:00', active: true },
        { day: 'Friday', startTime: '09:00', endTime: '12:00', active: true }
    ];

    // Team 8 has different schedule
    if (teamKey === 'team8') {
        return [
            { day: 'Tuesday', startTime: '09:00', endTime: '12:00', active: true },
            { day: 'Thursday', startTime: '09:00', endTime: '12:00', active: true },
            { day: 'Friday', startTime: '13:00', endTime: '16:00', active: true }
        ];
    }

    // Team 10 afternoon classes
    if (teamKey === 'team10') {
        return [
            { day: 'Monday', startTime: '13:00', endTime: '16:00', active: true },
            { day: 'Wednesday', startTime: '13:00', endTime: '16:00', active: true },
            { day: 'Friday', startTime: '13:00', endTime: '16:00', active: true }
        ];
    }

    return baseSchedule;
}

function getDayName(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}

function getNarutoAttendanceStatus(student, dayIndex, dayOfWeek, classDoc) {
    const pattern = student._attendancePattern;

    // Special character behaviors
    if (student.firstName === 'Naruto') {
        // Naruto is often late, especially on Mondays
        if (dayOfWeek === 1) return 'late'; // Monday
        if (dayIndex % 4 === 0) return 'late'; // Every 4th day
        return Math.random() > 0.1 ? 'present' : 'absent';
    }

    if (student.firstName === 'Sasuke') {
        // Sasuke is sometimes absent (revenge missions)
        if (dayIndex % 7 === 3) return 'absent'; // Every Wednesday
        if (Math.random() > 0.85) return 'absent';
        return 'present';
    }

    if (student.firstName === 'Sakura') {
        // Sakura is always present
        return 'present';
    }

    if (student.firstName === 'Rock' && student.lastName === 'Lee') {
        // Rock Lee is always early (but we mark as present)
        return 'present';
    }

    if (student.firstName === 'Shikamaru') {
        // Shikamaru finds attendance troublesome
        if (dayOfWeek === 1 && Math.random() > 0.5) return 'late'; // Lazy Monday
        return Math.random() > 0.2 ? 'present' : 'late';
    }

    // Default patterns
    switch (pattern) {
        case 'alwaysPresent':
            return 'present';
        case 'oftenLate':
            return Math.random() > 0.3 ? 'late' : 'present';
        case 'sometimesLate':
            return Math.random() > 0.7 ? 'late' : 'present';
        case 'sometimesAbsent':
            return Math.random() > 0.85 ? 'absent' : 'present';
        case 'usuallyPresent':
            return Math.random() > 0.1 ? 'present' : 'absent';
        default:
            return Math.random() > 0.15 ? 'present' : (Math.random() > 0.5 ? 'late' : 'absent');
    }
}

function getNarutoAttendanceRemarks(student, status, dayIndex) {
    const remarks = {
        present: [
            'Present and accounted for',
            'Ready for training',
            'Chakra levels normal',
            'Mission ready'
        ],
        late: [
            'Overslept',
            'Training ran long',
            'Helping old lady cross street',
            'Ramen delay',
            'Shadow clone confusion'
        ],
        absent: [
            'Sick leave',
            'Family emergency',
            'Personal training',
            'Mission assignment',
            'Chakra exhaustion'
        ]
    };

    // Character-specific remarks
    if (student.firstName === 'Naruto') {
        if (status === 'late') return 'Eating ramen';
        if (status === 'absent') return 'Training with Jiraiya';
    }

    if (student.firstName === 'Sasuke') {
        if (status === 'absent') return 'Revenge mission';
    }

    if (student.firstName === 'Shikamaru') {
        if (status === 'late') return 'Cloud watching';
        if (status === 'absent') return 'Too troublesome';
    }

    if (student.firstName === 'Rock' && student.lastName === 'Lee') {
        if (status === 'present') return 'YOUTH!';
    }

    // Random remark from appropriate category
    const categoryRemarks = remarks[status] || ['No remarks'];
    return categoryRemarks[Math.floor(Math.random() * categoryRemarks.length)];
}

async function createSpecialEvents(classes, students, teachers) {
    console.log('\n🎭 Creating special Naruto events...');

    const specialEvents = [
        {
            name: 'Chunin Exams',
            date: new Date(new Date().setDate(new Date().getDate() - 14)),
            description: 'Major ninja examination'
        },
        {
            name: 'Sasuke Retrieval Mission',
            date: new Date(new Date().setDate(new Date().getDate() - 21)),
            description: 'Team 7 special mission'
        },
        {
            name: 'Konoha Crush Attack',
            date: new Date(new Date().setDate(new Date().getDate() - 28)),
            description: 'Village under attack'
        }
    ];

    for (const event of specialEvents) {
        // Mark many students absent for major events
        for (const teamKey in students) {
            const teamStudents = students[teamKey];

            for (const student of teamStudents) {
                // Skip if already has attendance for this date
                const existing = await AttendanceRecord.findOne({
                    student: student._id,
                    date: {
                        $gte: new Date(event.date.setHours(0, 0, 0, 0)),
                        $lte: new Date(event.date.setHours(23, 59, 59, 999))
                    }
                });

                if (!existing) {
                    await AttendanceRecord.create({
                        student: student._id,
                        class: classes[teamKey]._id,
                        date: event.date,
                        status: 'absent',
                        remarks: `Special event: ${event.name}`,
                        markedBy: classes[teamKey].teacher,
                        session: 'full_day',
                        isExcused: true
                    });
                }
            }
        }

        console.log(`✅ Created records for: ${event.name}`);
    }
}

// Run the script
connectDB().then(populateData);