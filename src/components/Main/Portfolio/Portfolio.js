import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__projects">
        <li>
          <a className="portfolio__link" href="https://github.com/AGolubtsova/how-to-learn" target="_blank" rel="noreferrer">
            Статичный сайт
            <span>↗</span>
          </a>
        </li>
        <li>
          <a className="portfolio__link" href="https://agolubtsova.github.io/russian-travel/" target="_blank" rel="noreferrer">
            Адаптивный сайт
            <span>↗</span>
          </a>
        </li>
        <li>
          <a className="portfolio__link" href="https://github.com/AGolubtsova/mesto-react" target="_blank" rel="noreferrer">
            Одностраничное приложение
            <span>↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;