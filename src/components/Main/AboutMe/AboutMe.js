import './AboutMe.css';
import photo from '../../../images/myphoto.jpg';

const AboutMe = () =>{
    return (
      <section className="about-me" id="about-me">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__content">
          <div className="about-me__info"> 
            <h3 className="about-me__name">Анна</h3>
            <p className="about-me__prof">Фронтенд-разработчик</p>
            <p className="about-me__description">
              Я живу в Москве, закончила физический факультет МГУ им. М.В. Ломоносова. Мне нравится digital art, теннис и плаванье. 
              8 лет занимаюсь графическим и веб-дизайном. Кодить начала в 2023 году, сначала чтобы лучше разобраться в верстке, а потом 
              понравилось. Надеюсь, перерастет в профессию.
            </p>
            <a className="about-me__link" href="https://github.com/AGolubtsova" target="_blank" rel="noopener noreferrer">Github</a>
          </div>
          <img
            className="about-me__photo"
            alt="Мое фото"
            src={photo}
            />
        </div>
      </section>
    );
  };
  
  export default AboutMe;