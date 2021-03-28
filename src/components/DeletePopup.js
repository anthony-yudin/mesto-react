import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup({handleClickClose, isOpen, onClose, onDelete, idCard}) {

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onDelete(idCard);
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} handleClickClose={handleClickClose} isOpen={isOpen} onClose={onClose} name="delete-confirm" title="Вы уверены?">
      <button type="submit" className="popup__btn">Да</button>
    </PopupWithForm>
  )
}

export default DeletePopup;