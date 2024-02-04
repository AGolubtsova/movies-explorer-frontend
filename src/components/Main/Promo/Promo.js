import './Promo.css';
import promoLogo from '../../../images/promo-logo.svg';

const Promo = () => {
  return (
    <section className="promo">
      <img className="promo__logo" alt="Логотип в форме Земли из строчек WEB" src={promoLogo}/>
      <div className="promo__container">
        <h1 className="promo__title"> Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className="promo__link" href="#project">Узнать больше</a>
      </div>
    </section>
  );
};

export default Promo;