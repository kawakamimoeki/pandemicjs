import { Source } from './source.js'

class Human {
  constructor (p, x, y) {
    this.p = p
    this.x = x
    this.y = y
    this.status = 'ordinary'
    this.infected = null
    this.age = 0
    this.move = 3
    this.size = 10
    this.col = this.p.color(255)
  }

  update (humans, source, hospital, frameCount) {
    humans.forEach((human) => {
      if (human.status === 'infected') {
        const distance = this.p.dist(human.x, human.y, this.x, this.y)
        if (distance < source.splashDistance && this.status === 'ordinary') {
          this.status = 'infected'
          this.infected = frameCount
        }
      }
    })
    if (source !== null) {
      const distance = this.p.dist(source.x, source.y, this.x, this.y)
      if (distance < source.splashDistance && this.status === 'ordinary') {
        this.status = 'infected'
        this.infected = frameCount
      }
    }
    if (this.status === 'infected') {
      this.col = this.p.color(255, 0, 0)
      if (this.p.random(1) < source.infectionRate && hospital && hospital.patients.length < hospital.beds) {
        this.status = 'isolated'
        hospital.add(this)
      } else if (this.p.random(1) < source.infectionRate) {
        this.status = 'isolated'
      }
    }

    if (this.status === 'infected' || this.status === 'isolated') {
      if (frameCount - this.infected > source.onsetPeriod) {
        this.status = 'antibody'
        if (hospital && hospital.patients.includes(this)) {
          hospital.discharge(this)
        }
        this.col = this.p.color(66, 135, 245)
      }
    }

    if (this.status === 'antibody') {
      if (frameCount - this.infected - source.onsetPeriod > source.antibodyPeriod) {
        this.status = 'ordinary'
        this.col = this.p.color(255)
      }
    }

    this.x += this.p.random(-this.move, this.move)
    this.y += this.p.random(-this.move, this.move)

    if (this.x > this.p.width) this.x %= this.p.width
    if (this.y > this.p.height) this.y %= this.p.height
    if (this.x < 0) this.x += this.p.width
    if (this.y < 0) this.y += this.p.height

    if (hospital && this.status === 'isolated') return

    this.p.fill(this.col)
    this.p.ellipse(this.x, this.y, this.size, this.size)
  }
}

export { Human }
