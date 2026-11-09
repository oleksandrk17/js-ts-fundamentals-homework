// learning-units.ts
import { Identifiable } from "./basic-contracts";
import { Student, Teacher } from "./person-hierarchy";

const PASSING_SCORE = 60;

/**
 * Клас Course (Агрегує викладача та попередні курси)
 */
export class Course implements Identifiable {
  constructor(
    public readonly id: string,
    public title: string,
    public credits: number,
    private _instructor: Teacher,
    public readonly prerequisites: Course[] = []
  ) {}

  get instructor(): Teacher {
    return this._instructor;
  }

  public reassignInstructor(newInstructor: Teacher): void {
    console.log(`[Course Info] Зміна викладача курсу "${this.title}": ${newInstructor.fullName}`);
    this._instructor = newInstructor;
  }

  public canEnroll(student: Student): boolean {
    const passed = student
      .getGrades()
      .filter(g => g.score >= PASSING_SCORE)
      .map(g => g.courseId);
    return this.prerequisites.every(p => passed.includes(p.id));
  }
}

/**
 * Клас AcademicGroup (Агрегує студентів та призначеного куратора)
 */
export class AcademicGroup implements Identifiable {
  private _students: Map<string, Student> = new Map();

  constructor(
    public readonly id: string,
    public name: string,
    public curator?: Teacher
  ) {}

  public addStudent(student: Student): void {
    if (this._students.has(student.id)) {
      throw new Error(`Студент ${student.fullName} вже зарахований до групи ${this.name}`);
    }
    this._students.set(student.id, student);
  }

  public removeStudent(studentId: string): boolean {
    return this._students.delete(studentId);
  }

  public getStudents(): Student[] {
    return Array.from(this._students.values());
  }

  public getGroupAverageScore(): number {
    const list = this.getStudents();
    if (list.length === 0) return 0;
    const totalGpa = list.reduce((acc, s) => acc + s.calculateGPA(), 0);
    return Number((totalGpa / list.length).toFixed(2));
  }
}