import { useState, useCallback, useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useMatch } from 'react-router-dom';

const useValidationForm = () => {
  const currentUser = useContext(CurrentUserContext);
  const routeProfile = useMatch("/profile");
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isChange, setChange] = useState(false);
  const regexName = new RegExp(/^[a-zA-Zа-яА-Я\s\-]*$/)
  const regexEmail = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.([a-zA-Z-.]{2,})+$/)

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    });

    setIsFormValid(errors.name === '' ? true : false);

    if (name === "name") {
      if (value !== currentUser.name) {
        if (!value) {
          setErrors({...errors, [name]: 'Введите имя'});
        } else {
          setChange(true);
          if (value.length < 2) {
            setErrors({...errors, [name]: 'Надо ввести мин 2 символа'});
          } else {
            const validName = (regexName.test(value))
            setErrors({...errors, [name]: validName ? '' : 'Только русские и латинские буквы, пробел или дефис'})
          }   
        } 
      } else {
        if (routeProfile) {
        setErrors({...errors, [name]: 'Введите новое имя'})
        }
      }
    } else {
      if (name === "email") {
        if (value !== currentUser.email) {
          if (!value) {
            setErrors({...errors, [name]: 'Введите email'});
          } else {
              setChange(true);
              const validEmail = (regexEmail.test(value))
              setErrors({...errors, [name]: validEmail ? '' : 'Неправильный email'})
          }
        } else {
          if (routeProfile) {
          setErrors({...errors, [name]: 'Введите новый email'})
          }
        }
      } else {
        if (name === "password") {
          if (!value) {
            setErrors({...errors, [name]: 'Введите пароль'});
          } else {
            if (value.length < 2) {
              setErrors({...errors, [name]: 'Введинте мин 2 символа'});
            } else {
              setErrors({...errors, [name]: ''});
            }
          }
        } 
      } 
    }
    
    if(errors.name || errors.email || errors.password) {
      setIsFormValid(false);
    } else {
      setIsFormValid(event.target.closest("form").checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false, newIsChange = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
      setChange(newIsChange);
    },
    [setValues, setErrors, setIsFormValid, setChange]
  );

  return {
    values,
    errors,
    handleChange,
    isFormValid,
    resetForm,
    isChange,
  };
};

export default useValidationForm;