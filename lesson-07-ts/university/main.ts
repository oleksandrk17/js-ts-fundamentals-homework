// main.ts
import { Student, Professor, AssociateProfessor } from "./person-hierarchy";
import { Course } from "./learning-units";
import { Faculty } from "./faculty";
import { InMemoryRepository } from "./repository";

async function runDemonstration() {
  console.log("=== 1. Створення викладачів (Поліморфізм та спадкування) ===");
  const profShevchenko = new Professor(
    "t-1",
    "Тарас",
    "Шевченко",
    "t.shevchenko@univ.edu",
    20000
  );

  const docentKoval = new AssociateProfessor(
    "t-2",
    "Олена",
    "Коваль",
    "o.koval@univ.edu",
    16000
  );

  console.log(`${profShevchenko.getRoleDescription()} | Зарплата: ${profShevchenko.calculateSalary()}`);
  console.log(`${docentKoval.getRoleDescription()} | Зарплата: ${docentKoval.calculateSalary()}`);

  console.log("\n=== 2. Створення факультету та груп (Композиція) ===");
  const csFaculty = new Faculty("f-1", "Факультет комп'ютерних наук");
  
  // Факультет породжує групу
  const groupKN21 = csFaculty.createGroup("g-kn21", "КН-21", docentKoval);
  console.log(`Створено групу "${groupKN21.name}" на факультеті "${csFaculty.name}"`);

  console.log("\n=== 3. Студенти та оцінки (Агрегація + Інкапсуляція) ===");
  const studentIvan = new Student("s-101", "Іван", "Мельник", "ivan.m@univ.edu", "KB123456");
  const studentAnna = new Student("s-102", "Анна", "Бойко", "anna.b@univ.edu", "KB123457");

  // Агрегуємо студентів у групу
  groupKN21.addStudent(studentIvan);
  groupKN21.addStudent(studentAnna);

  // Створюємо курс (Агрегує викладача)
  const tsCourse = new Course("c-ts", "TypeScript Enterprise Patterns", 5, profShevchenko);

  // Виставляємо оцінки
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
}

runDemonstration().catch(console.error);