
import { useEffect, useState } from 'react';

const slides = [
  {
    title: 'Good Morning',
    subtitle: 'Cybers and Spaces.'
  },
  {
    title: 'Good Afternoon',
    subtitle: 'Spaces and Cybers.'
  },
  {
    title: 'Welcome to My App',
    subtitle: 'Manage your data easily.'
  }
];

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const changeSlide = (step) => {
    setCurrentSlide(
      (currentSlide + step + slides.length) % slides.length
    );
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="navbar navbar-expand-md bg-light app-header">
        <div className="container-fluid px-3 px-md-5">
          <a className="navbar-brand" href="#home">
            MY APP
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`navbar-collapse ${
              menuOpen ? 'show' : 'collapse'
            }`}
          >
            <ul className="navbar-nav ms-3">
              <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#content">Link</a>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn"
                  data-bs-toggle="dropdown"
                  onClick={(e) => {
                    e.currentTarget.nextElementSibling
                      .classList.toggle('show');
                  }}
                >
                  Options
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#content">
                      Users
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#footer">
                      About
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* BANNER */}
      <section className="banner" id="home">
        <button
          className="slide-arrow arrow-left"
          onClick={() => changeSlide(-1)}
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        <div className="banner-content">
          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].subtitle}</p>

          <div className="slide-indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                className={
                  index === currentSlide ? 'indicator active' : 'indicator'
                }
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          className="slide-arrow arrow-right"
          onClick={() => changeSlide(1)}
          aria-label="Next slide"
        >
          &#10095;
        </button>
      </section>

      {/* CONTENT: DATA FROM API */}
      <main id="content" className="content">
        {loading && (
          <p className="text-center p-4">Đang tải dữ liệu...</p>
        )}

        {error && (
          <p className="text-danger text-center p-4">{error}</p>
        )}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.id}</td>
                    <td>
                      <span className="status-active">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer id="footer" className="app-footer">
        <i className="bi bi-award"></i>
        <span>Hanoi, August 2026</span>
      </footer>
    </div>
  );
}

export default App;
