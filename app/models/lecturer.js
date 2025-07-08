export default class Lecturer {
  constructor({ Id, firstName, lastName, email, department, faculty, stats, password }) {
    this.Id = Id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.department = department;
    this.faculty = faculty;
    this.stats = stats;
    this.password = password;
  }
}