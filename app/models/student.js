export default class Student {
  constructor({ Id, firstName, lastName, email, department, faculty, level, password }) {
    this.Id = Id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.department = department;
    this.faculty = faculty;
    this.level = level;
    this.password = password;
  }
}