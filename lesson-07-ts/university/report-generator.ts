import { Student } from "./person-hierarchy";

export abstract class ReportGenerator {
  // Шаблонний метод: порядок кроків фіксований
  public generate(students: readonly Student[]): string {
    return [this.generateHeader(), this.generateBody(students), this.generateFooter()].join("\n");
  }

  protected abstract generateHeader(): string;
  protected abstract generateBody(students: readonly Student[]): string;
  protected abstract generateFooter(): string;
}

export class XmlReportGenerator extends ReportGenerator {
  protected generateHeader(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<report>`;
  }
  protected generateBody(students: readonly Student[]): string {
    return students
      .map(s => `  <student gpa="${s.calculateGPA()}">${s.fullName}</student>`)
      .join("\n");
  }
  protected generateFooter(): string {
    return `</report>`;
  }
}

export class JsonReportGenerator extends ReportGenerator {
  protected generateHeader(): string {
    return `{"report": "students", "students": [`;
  }
  protected generateBody(students: readonly Student[]): string {
    return students
      .map(s => "  " + JSON.stringify({ name: s.fullName, gpa: s.calculateGPA() }))
      .join(",\n");
  }
  protected generateFooter(): string {
    return `]}`;
  }
}