import './Footer.css';

// Import version from package.json
const VERSION = '0.0.2';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>
          Guitar Theory Lab v{VERSION}
        </p>
        <p className="footer-links">
          <a
            href="https://github.com/topkoa/guitar-theory-lab"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {' • '}
          <a
            href="https://github.com/topkoa/guitar-theory-lab/blob/master/CHANGELOG.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Changelog
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
