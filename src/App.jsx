import { useState } from 'react'
import { MotionConfig, motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import './App.css'

const MotionMain = motion.main

const littleNotes = [
  'If I could be anywhere right now, I’d choose the place right next to you.',
  'You have a way of showing up in my thoughts and making them softer.',
  'This is me sending you the hug I wish I could give you in person.',
  'No big occasion. I just wanted you to know you’re special to me.'
]

const screenMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: 'easeOut' }
}

function IntroScreen({ onContinue }) {
  return (
    <MotionMain className="note-card intro-card" {...screenMotion}>
      <div className="card-topline">
        <span className="postmark">A LITTLE NOTE</span>
        <span className="postmark-detail">NO OCCASION NEEDED</span>
      </div>

      <div className="heart-art" aria-hidden="true">
        <span className="heart-glow" />
        <span className="hero-heart">♥</span>
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
        <span className="orbit-star star-one">♡</span>
        <span className="orbit-star star-two">✦</span>
        <span className="orbit-star star-three">♥</span>
      </div>

      <p className="eyebrow">A LITTLE LOVE NOTE</p>
      <h1>Hey, my favorite person<span className="accent-dot">.</span></h1>
      <p className="intro-copy">
        You’ve been on my mind, and
        <br />
        I made this little something just for you.
      </p>

      <button className="primary-button" onClick={onContinue}>
        Come a little closer <span aria-hidden="true">♡</span>
      </button>

      <p className="handwritten">made with all my heart, and a little bit of missing you</p>
    </MotionMain>
  )
}

function QuestionScreen({ onAnswer, onBack }) {
  return (
    <MotionMain className="note-card question-card" {...screenMotion}>
      <button className="back-button" onClick={onBack}>
        <span aria-hidden="true">←</span> Back
      </button>

      <div className="question-art" aria-hidden="true">♥</div>
      <p className="eyebrow">BE HONEST, MY LOVE</p>
      <h1>Do you ever miss me the way I miss you<span className="accent-dot">?</span></h1>
      <p className="intro-copy">I’ve been missing your laugh, your stories, and just having you close.</p>

      <div className="answer-list">
        <button className="answer-button answer-yes" onClick={() => onAnswer(true)}>
          <span>More than you know</span><span aria-hidden="true">♥</span>
        </button>
        <button className="answer-button" onClick={() => onAnswer(false)}>
          <span>Not so much</span><span aria-hidden="true">♡</span>
        </button>
      </div>

      <p className="quiet-note">Whatever your answer, you’ll always have a soft spot in my heart.</p>
    </MotionMain>
  )
}

function ReplyScreen({ missesMe, onContinue }) {
  return (
    <MotionMain className="note-card reply-card" {...screenMotion}>
      {missesMe && <Confetti recycle={false} numberOfPieces={100} gravity={0.12} />}

      <div className="reply-icon" aria-hidden="true">{missesMe ? '♥' : '♡'}</div>
      <p className="eyebrow">A LITTLE REPLY FROM MY HEART</p>
      <h1>{missesMe ? 'My heart feels a little closer to yours.' : 'Thank you for telling me, sweetheart.'}</h1>
      <p className="intro-copy">
        {missesMe
          ? 'I miss you in all the quiet little moments. Knowing you feel it too means the world to me.'
          : 'No pressure, sweetheart. I care about you, and I still made you a little something.'}
      </p>

      <button className="primary-button" onClick={onContinue}>
        I made you something <span aria-hidden="true">♥</span>
      </button>
    </MotionMain>
  )
}

function GiftScreen({ onRestart }) {
  const [noteIndex, setNoteIndex] = useState(0)

  const showNextNote = () => {
    setNoteIndex((index) => (index + 1) % littleNotes.length)
  }

  return (
    <MotionMain className="note-card gift-card" {...screenMotion}>
      <div className="gift-stamp" aria-hidden="true">✦</div>
      <p className="eyebrow">A LITTLE SOMETHING FROM MY HEART</p>
      <h1>For you, just because<span className="accent-dot">.</span></h1>
      <p className="intro-copy">Because you make my world feel a little warmer.</p>

      <div className="tiny-note" aria-live="polite">
        <span className="tiny-note-label">A LITTLE LOVE NOTE</span>
        <p>{littleNotes[noteIndex]}</p>
      </div>

      <button className="secondary-button" onClick={showNextNote}>
        Send me another <span aria-hidden="true">♥</span>
      </button>

      <div className="gift-divider"><span>✦</span></div>
      <p className="closing-line">Until I can say it in person: I miss you, I adore you, and I’m so glad you’re in my life.</p>
      <button className="restart-button" onClick={onRestart}>
        Keep this little note <span aria-hidden="true">♡</span>
      </button>
    </MotionMain>
  )
}

function App() {
  const [screen, setScreen] = useState('intro')
  const [missesMe, setMissesMe] = useState(false)

  const answerQuestion = (answer) => {
    setMissesMe(answer)
    setScreen('reply')
  }

  const restart = () => {
    setMissesMe(false)
    setScreen('intro')
  }

  const progress = { intro: '01', question: '02', reply: '03', gift: '04' }[screen]

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <div className="floating-heart floating-heart-one" aria-hidden="true">♡</div>
        <div className="floating-heart floating-heart-two" aria-hidden="true">♥</div>
        <div className="floating-heart floating-heart-three" aria-hidden="true">♡</div>
        <div className="grain" aria-hidden="true" />

        <div className="page-frame">
          <header className="page-header">
            <span className="brand-mark"><span aria-hidden="true">✳</span> just because</span>
            <span className="page-count">{progress} <span>/ 04</span></span>
          </header>

          <AnimatePresence mode="wait">
            {screen === 'intro' && (
              <IntroScreen key="intro" onContinue={() => setScreen('question')} />
            )}
            {screen === 'question' && (
              <QuestionScreen
                key="question"
                onAnswer={answerQuestion}
                onBack={() => setScreen('intro')}
              />
            )}
            {screen === 'reply' && (
              <ReplyScreen
                key="reply"
                missesMe={missesMe}
                onContinue={() => setScreen('gift')}
              />
            )}
            {screen === 'gift' && (
              <GiftScreen key="gift" onRestart={restart} />
            )}
          </AnimatePresence>

          <footer className="page-footer">
            <span>MADE WITH A LITTLE HEART</span>
            <span aria-hidden="true">♡</span>
          </footer>
        </div>
      </div>
    </MotionConfig>
  )
}

export default App
