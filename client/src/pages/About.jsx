import React from 'react'
import '../styles/about.scss'
import { Container } from 'react-bootstrap'

const devs = [
  {
    id: 0,
    name: 'Jarrett Zapata',
    role: 'Team Leader',
    pic: 'profile-pic.png',
    desc: 'I am in my first year of the computer science graduate program here at SFSU. I am aspiring to become a full-stack software developer. I have interned for a fintech startup known as Pay Your Tuition Inc. and I am a founding member of a childcare services startup called Millenicare.',
  },
  {
    id: 1,
    name: 'Rohan Rawat',
    role: 'Back-end lead',
    pic: 'profile-pic.png',
    desc: "I'm a senior at SFSU and this is my last semester. In my free time, I like to play basketball and play video games.",
  },
  {
    id: 2,
    name: 'Anthony Borges',
    role: 'Front-end lead',
    pic: 'profile-pic.png',
    desc: 'Computer Science Senior at SFSU | Aspiring Front End Engineer | Video Games are cool | I really really really want to work for Discord eventually',
  },
  {
    id: 3,
    name: 'Tongda Yin',
    role: 'Front-end lead',
    pic: 'Tongda_Yin.jpg',
    desc: "I'm a senior student at SFSU major in Computer Science. I'm interesting in Front-end development, because I like seeing progress on my screen.",
  },
  {
    id: 4,
    name: 'Gabriel Gonzalez',
    role: 'Git master',
    pic: 'Gabriel_Gonzalez.jpg',
    desc: 'I am a computer science undergrad, currently in my senior year and aspiring to be a web developer.',
  },
  {
    id: 5,
    name: 'Abraham Laurente',
    role: 'Scrum master',
    pic: 'profile-pic.png',
    desc: 'I am a junior at SFSU and I am majoring in computer science. I enjoy fitness, fashion, playing video games and seeing crazy architecture.',
  },
]

function About() {
  return (
    <Container className='about-page'>
      {devs.map((dev) => (
        <div id={dev.id} className='about-each' key={dev.id}>
          <div className='about-title'>
            <h1>{dev.name}</h1>
            <h2>{dev.role}</h2>
          </div>
          <div className='about-detail'>
            <div className='about-pic'>
              <img src={require(`../assets/images/${dev.pic}`)} alt='pic' />
            </div>
            <div>
              <div className='about-desc'>
                <h3>About me</h3>
                <p>{dev.desc}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Container>
  )
}

export default About
