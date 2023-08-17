
class Applicant {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;


  constructor(id: number, name: string, email?: string | null, phone?: string | null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

export default Applicant;