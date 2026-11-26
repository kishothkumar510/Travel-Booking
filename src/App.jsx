import { useState } from 'react';

const locations = {
  India: {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Karnataka: ['Bengaluru', 'Mysuru', 'Hubballi'],
  },
  USA: {
    California: ['Los Angeles', 'San Francisco', 'San Diego'],
    'New York': ['Manhattan', 'Brooklyn', 'Queens'],
  },
};

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="World Trip home">
        <span className="brand-mark" aria-hidden="true">W</span>
        World Trip
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
      </button>
      <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/#about">About</a>
        <a href="/booking">Booking</a>
        <a href="/#contact">Contact</a>
        <a href="/login">Login</a>
        <a className="nav-cta" href="/signup">Sign up</a>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <a className="brand footer-brand" href="/">World Trip</a>
          <p>Exploring the world, one journey at a time.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <a href="/booking">Plan a trip</a>
          <a href="/login">Login</a>
          <a href="/signup">Create an account</a>
        </div>
        <div>
          <h2>Get in touch</h2>
          <a href="/#contact">Send feedback</a>
          <p className="footer-note">Your next story is out there.</p>
        </div>
      </div>
      <p className="copyright">© 2026 World Trip. All rights reserved.</p>
    </footer>
  );
}

function HomePage() {
  function sendFeedback(event) {
    event.preventDefault();
    window.location.assign('/feedback-success');
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">The world is waiting</p>
            <h1>Make your next trip <span>unforgettable.</span></h1>
            <p>Find your route, choose how you travel, and get ready to explore.</p>
            <a className="button button-primary" href="/booking">Plan your trip <span aria-hidden="true">→</span></a>
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <span>GO</span>
            <strong>somewhere<br />wonderful</strong>
          </div>
        </section>

        <section className="intro-section content-section" id="about">
          <div className="section-copy">
            <p className="eyebrow eyebrow-dark">A little about us</p>
            <h2>More than a destination. It’s the whole journey.</h2>
            <p>World Trip helps you plan travel by bus, rail, air, car, or bike. Pick your destination and start imagining the moments along the way.</p>
            <a className="text-link" href="/booking">Start planning <span aria-hidden="true">→</span></a>
          </div>
          <div className="intro-photo" role="img" aria-label="Mountain lake surrounded by green hills" />
        </section>

        <section className="ways-section content-section">
          <div className="section-heading">
            <p className="eyebrow eyebrow-dark">Take the scenic route</p>
            <h2>Travel your way</h2>
          </div>
          <div className="travel-options">
            <article><span aria-hidden="true">🚌</span><h3>By road</h3><p>Make the miles part of the memory.</p></article>
            <article><span aria-hidden="true">🚆</span><h3>By rail</h3><p>Take it slow and watch the world roll by.</p></article>
            <article><span aria-hidden="true">✈️</span><h3>By air</h3><p>Get a little closer to somewhere new.</p></article>
          </div>
        </section>

        <section className="contact-section content-section" id="contact">
          <div>
            <p className="eyebrow">We’re listening</p>
            <h2>Have a thought to share?</h2>
            <p>Send us feedback and help make World Trip better.</p>
          </div>
          <form className="feedback-form" onSubmit={sendFeedback}>
            <label>
              Your name
              <input type="text" autoComplete="name" placeholder="Name" required />
            </label>
            <label>
              Your feedback
              <textarea rows="4" placeholder="Tell us what you think…" required />
            </label>
            <button className="button button-light" type="submit">Send feedback <span aria-hidden="true">→</span></button>
          </form>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function AuthPage({ mode }) {
  const isSignup = mode === 'signup';

  function submitForm(event) {
    event.preventDefault();
    window.location.assign(isSignup ? '/signup-success' : '/login-success');
  }

  return (
    <main className="auth-page">
      <section className="auth-story">
        <a className="brand" href="/"><span className="brand-mark" aria-hidden="true">W</span>World Trip</a>
        <div>
          <p className="eyebrow">The world is waiting</p>
          <h1>{isSignup ? 'Make room for new adventures.' : 'Your next journey starts here.'}</h1>
          <p>{isSignup ? 'Create an account and start planning memorable journeys.' : 'Log in to pick up where you left off and keep your travel plans in one place.'}</p>
        </div>
        <a className="story-back" href="/">← Back to home</a>
      </section>
      <section className="auth-panel">
        <form className="auth-form" onSubmit={submitForm}>
          <p className="eyebrow eyebrow-dark">{isSignup ? 'Welcome aboard' : 'Welcome back'}</p>
          <h2>{isSignup ? 'Create your account' : 'Log in to World Trip'}</h2>
          <p className="form-description">{isSignup ? 'A new adventure is just around the corner.' : 'Your next adventure is only a sign-in away.'}</p>
          {isSignup && (
            <label>
              Full name
              <input type="text" autoComplete="name" placeholder="Your full name" required />
            </label>
          )}
          <label>
            Email address
            <input type="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label>
            Password
            <input type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} placeholder="Enter your password" required />
          </label>
          <button className="button button-primary button-wide" type="submit">{isSignup ? 'Create account' : 'Login'}</button>
          <p className="auth-switch">
            {isSignup ? 'Already have an account?' : 'New to World Trip?'}{' '}
            <a href={isSignup ? '/login' : '/signup'}>{isSignup ? 'Log in' : 'Create an account'}</a>
          </p>
          <p className="demo-note">Demo only — account details are not saved.</p>
        </form>
      </section>
    </main>
  );
}

function BookingPage() {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const availableStates = country ? Object.keys(locations[country]) : [];
  const districts = country && state ? locations[country][state] : [];

  function submitBooking(event) {
    event.preventDefault();
    window.location.assign('/booking-success');
  }

  return (
    <>
      <SiteHeader />
      <main className="booking-page">
        <section className="booking-heading">
          <p className="eyebrow eyebrow-dark">Your next adventure</p>
          <h1>Plan your journey</h1>
          <p>Choose your destination and how you’d like to get there.</p>
        </section>
        <form className="booking-card" onSubmit={submitBooking}>
          <div className="form-grid">
            <label>
              Country
              <select value={country} onChange={(event) => { setCountry(event.target.value); setState(''); }} required>
                <option value="">Select country</option>
                {Object.keys(locations).map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>
            <label>
              State
              <select value={state} onChange={(event) => setState(event.target.value)} disabled={!country} required>
                <option value="">Select state</option>
                {availableStates.map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>
            <label>
              District
              <select disabled={!state} required>
                <option value="">Select district</option>
                {districts.map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>
            <label>
              From
              <input type="text" placeholder="Departure city" required />
            </label>
            <label>
              To
              <input type="text" placeholder="Destination city" required />
            </label>
            <label>
              Departure date
              <input type="date" min={new Date().toISOString().slice(0, 10)} required />
            </label>
            <label>
              Travelers
              <input type="number" min="1" defaultValue="1" required />
            </label>
            <label>
              Transport mode
              <select required defaultValue="">
                <option value="" disabled>Select mode</option>
                <option>Bus</option>
                <option>Railway</option>
                <option>Flight</option>
                <option>Car</option>
                <option>Bike</option>
              </select>
            </label>
          </div>
          <div className="booking-actions">
            <button className="button button-primary" type="submit">Confirm booking</button>
            <button className="button button-outline" type="button" onClick={() => window.location.assign('/cancel-success')}>Cancel</button>
          </div>
          <p className="demo-note">Demo only — booking details are not stored.</p>
        </form>
      </main>
      <SiteFooter />
    </>
  );
}

const confirmationPages = {
  '/login-success': {
    icon: '✓',
    title: 'Login successful',
    message: 'Welcome back! You have successfully logged into your World Trip account.',
    action: 'Explore World Trip',
    tone: 'success',
  },
  '/signup-success': {
    icon: '✦',
    title: 'Account created!',
    message: 'Your journey with World Trip starts today. Your demo account details were not saved.',
    action: 'Start exploring',
    tone: 'success',
  },
  '/booking-success': {
    icon: '✓',
    title: 'Booking successful!',
    message: 'Your trip plan is ready. This demo does not save or send booking details.',
    action: 'Return to home',
    tone: 'success',
  },
  '/cancel-success': {
    icon: '×',
    title: 'Booking cancelled',
    message: 'Your request has been cancelled. No booking was saved.',
    action: 'Back to home',
    tone: 'cancel',
  },
  '/feedback-success': {
    icon: '✉',
    title: 'Thank you for your feedback!',
    message: 'Your message was received in this demo, but was not sent or stored.',
    action: 'Return home',
    tone: 'feedback',
  },
};

function ConfirmationPage({ page }) {
  return (
    <main className={`confirmation-page ${page.tone}`}>
      <section className="confirmation-card">
        <span className="confirmation-icon" aria-hidden="true">{page.icon}</span>
        <p className="eyebrow eyebrow-dark">World Trip</p>
        <h1>{page.title}</h1>
        <p>{page.message}</p>
        <a className="button button-primary" href="/">{page.action}</a>
      </section>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="confirmation-page">
      <section className="confirmation-card">
        <p className="eyebrow eyebrow-dark">404</p>
        <h1>We can’t find that page.</h1>
        <p>That route isn’t part of this trip. Head back home to find your way.</p>
        <a className="button button-primary" href="/">Back to home</a>
      </section>
    </main>
  );
}

function App() {
  let route = decodeURIComponent(window.location.pathname).replace(/\/+$/, '') || '/';
  const legacyRoutes = {
    '/login.html': '/login',
    '/signup.html': '/signup',
    '/booking.html': '/booking',
    '/login success.html': '/login-success',
    '/signup success.html': '/signup-success',
    '/booking_success.html': '/booking-success',
    '/cancel_success.html': '/cancel-success',
    '/feedback sucess.html': '/feedback-success',
  };
  route = legacyRoutes[route] || route;

  if (route === '/') return <HomePage />;
  if (route === '/login' || route === '/signup') return <AuthPage mode={route.slice(1)} />;
  if (route === '/booking') return <BookingPage />;
  if (confirmationPages[route]) return <ConfirmationPage page={confirmationPages[route]} />;
  return <NotFoundPage />;
}

export default App;