import './Footer.css';
import { version } from '../../../package.json';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>
          Guitar Theory Lab v{version}
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
