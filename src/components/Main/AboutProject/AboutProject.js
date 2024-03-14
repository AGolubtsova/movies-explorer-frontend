import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="project" id="project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__box">
        <div className="project__box-item">
          <h3>Дипломный проект включал 5 этапов</h3>
          <p>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="project__box-item">
          <h3>На выполнение диплома ушло 5 недель</h3>
          <p>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div>
        <div className="project__time">
          <div className="project__time-item">1 неделя</div>
          <div className="project__time-item">4 недели</div>
          <div className="project__time-item">Back-end</div>
          <div className="project__time-item">Front-end</div>
        </div>
      </div>
    </section>
  )
};

export default AboutProject;