// main.ts
import { Student, Professor, AssociateProfessor, Staff } from "./person-hierarchy";
import { Course } from "./learning-units";
import { Faculty } from "./faculty";
import { InMemoryRepository } from "./repository";
import { XmlReportGenerator, JsonReportGenerator } from "./report-generator";

async function runDemonstration() {
  console.log("=== 1. Створення викладачів (Поліморфізм та спадкування) ===");
  const profShevchenko = new Professor("t-1", "Тарас", "Шевченко", "t.shevchenko@univ.edu", 20000);
  const docentKoval = new AssociateProfessor("t-2", "Олена", "Коваль", "o.koval@univ.edu", 16000);

  console.log(`${profShevchenko.getRoleDescription()} | Зарплата: ${profShevchenko.calculateSalary()}`);
  console.log(`${docentKoval.getRoleDescription()} | Зарплата: ${docentKoval.calculateSalary()}`);

  console.log("\n=== 2. Створення факультету та груп (Композиція) ===");
  const csFaculty = new Faculty("f-1", "Факультет комп'ютерних наук");
  const groupKN21 = csFaculty.createGroup("g-kn21", "КН-21", docentKoval);
  console.log(`Створено групу "${groupKN21.name}" на факультеті "${csFaculty.name}"`);

  console.log("\n=== 3. Студенти та оцінки (Агрегація + Інкапсуляція) ===");
  const studentIvan = new Student("s-101", "Іван", "Мельник", "ivan.m@univ.edu", "KB123456");
  const studentAnna = new Student("s-102", "Анна", "Бойко", "anna.b@univ.edu", "KB123457");

  groupKN21.addStudent(studentIvan);
  groupKN21.addStudent(studentAnna);

  const tsCourse = new Course("c-ts", "TypeScript Enterprise Patterns", 5, profShevchenko);

  studentIvan.addGrade({ courseId: tsCourse.id, score: 95, date: new Date() });
  studentIvan.addGrade({ courseId: tsCourse.id, score: 87, date: new Date() });
  studentAnna.addGrade({ courseId: tsCourse.id, score: 98, date: new Date() });
  studentAnna.addGrade({ courseId: tsCourse.id, score: 92, date: new Date() });

  console.log(`GPA Івана: ${studentIvan.calculateGPA()}`);
  console.log(`GPA Анни: ${studentAnna.calculateGPA()}`);
  console.log(`Середній бал групи ${groupKN21.name}: ${groupKN21.getGroupAverageScore()}`);

  console.log("\n=== 4. Узагальнене сховище даних (Generic Repository) ===");
  const studentRepo = new InMemoryRepository<Student>();
  await studentRepo.save(studentIvan);
  await studentRepo.save(studentAnna);

  const foundStudent = await studentRepo.findById("s-101");
  console.log(`Знайдено в репозиторії: ${foundStudent?.fullName} (${foundStudent?.email})`);
  console.log(`Всього студентів у сховищі: ${(await studentRepo.findAll()).length}`);

  const topStudents = await studentRepo.findWhere(s => s.calculateGPA() > 93);
  console.log(`Студенти з GPA > 93: ${topStudents.map(s => s.fullName).join(", ")}`);

  console.log("\n=== 5. Передумови курсів ===");
  const advancedCourse = new Course("c-adv", "Advanced TypeScript", 5, docentKoval, [tsCourse]);
  const newbie = new Student("s-103", "Петро", "Сидоренко", "p.sydorenko@univ.edu", "KB123458");
  console.log(`Іван може записатися: ${advancedCourse.canEnroll(studentIvan)}`);
  console.log(`Петро може записатися: ${advancedCourse.canEnroll(newbie)}`);

  console.log("\n=== 6. Звіти (шаблонний метод) ===");
  const allStudents = await studentRepo.findAll();
  console.log(new XmlReportGenerator().generate(allStudents));
  console.log(new JsonReportGenerator().generate(allStudents));

  console.log("\n=== 7. Staff ===");
  const admin = new Staff("st-1", "Марія", "Ткаченко", "m.tkachenko@univ.edu", "Деканат");
  console.log(admin.getRoleDescription());
  console.log(admin.generateBadge());
}

runDemonstration().catch(console.error);