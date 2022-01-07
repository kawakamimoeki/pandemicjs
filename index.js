import p5 from 'p5'
import { Hospital } from './lib/hospital'
import { Human } from './lib/human'
import { Source } from './lib/source'

class Pandemic {
  constructor (selector, opts = {}) {
    this.element = document.querySelector(selector)
    this.opts = Object.assign(this.defaultOpts(), opts)
    new p5(this.sketch.bind(this), this.element)
  }

  defaultOpts () {
    return {
      n: 800,
      beds: 10,
      fps: 60,
      splashDistance: 30,
      infectionRate: 0.1,
      onsetPeriod: 100,
      antibodyPeriod: 200,
      play: false,
      hospital: false
    }
  }

  sketch (p) {
    p.setup = () => {
      p.createCanvas(this.element.offsetWidth, this.element.offsetHeight)
      p.frameRate(this.opts.fps)
      p.source = false
      p.humans = []
      if (this.opts.hospital) {
        p.hospital = new Hospital(p, this.opts.beds)
      }

      for (let i = 0; i < this.opts.n; i++) {
        p.humans.push(new Human(p, p.random(p.width), p.random(p.height)))
      }
    }
    
    p.draw = () => {
      p.background(255)

      if (p.source && p.source.active) {
        p.source.update(p.frameCount)
      } else {
        if (this.opts.play) {
          if (p.mouseIsPressed) {
            p.source = new Source(p, p.mouseX, p.mouseY, this.opts.splashDistance, this.opts.infectionRate, this.opts.onsetPeriod, this.opts.antibodyPeriod, p.frameCount)
          }
        } else {
          p.source = new Source(p, p.random(p.width), p.random(p.height), this.opts.splashDistance, this.opts.infectionRate, this.opts.onsetPeriod, this.opts.antibodyPeriod, p.frameCount)
        }
      }

      p.humans.forEach(human => human.update(p.humans, p.source, p.hospital, p.frameCount))
      if (this.opts.hospital) p.hospital.update()
    }
  }
}

export { Pandemic }
