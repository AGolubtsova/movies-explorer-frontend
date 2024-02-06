import "./Footer.css";

function Footer () {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__box">
        <span className="footer__copyright">© 2024</span>
        <ul className="footer__nav">
          <li>
            <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/TsiNik2508" target="_blank" rel="noreferrer">
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;