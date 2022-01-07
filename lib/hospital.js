class Hospital {
  constructor (p, beds) {
    this.p = p
    this.beds = beds
    this.patients = []
  }
  add (human) {
    this.patients.push(human)
  }
  discharge (human) {
    this.patients.splice(human)
  }
  update () {
    this.p.fill(255)
    this.p.quad(this.p.width - 100, 50, this.p.width - 50, 50, this.p.width - 50, 51 + 21 * this.beds, this.p.width - 100, 51 + 21 * this.beds)
    this.patients.forEach ((patient, i) => {
      this.p.fill(255, 0, 0)
      this.p.ellipse(this.p.width - 75, 70 + 20 * i, patient.size, patient.size)
    })
  }
}

export { Hospital }
