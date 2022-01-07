class Source {
  constructor (p, x, y, splashDistance, infectionRate, onsetPeriod, antibodyPeriod, frameCount) {
    this.p = p
    this.x = x
    this.y = y
    this.size = 10
    this.born = frameCount
    this.active = true
    this.splashDistance = splashDistance
    this.infectionRate = infectionRate
    this.onsetPeriod = onsetPeriod
    this.antibodyPeriod = antibodyPeriod
  }

  update (frameCount) {
    if (frameCount - this.born > 100) {
      this.active = false
    }
    this.p.fill(255, 200, 200)
    this.p.ellipse(this.x, this.y, this.splashDistance, this.splashDistance)
    this.p.fill(255, 0, 0)
    this.p.ellipse(this.x, this.y, this.size, this.size)
  }
}

export { Source }
