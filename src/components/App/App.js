import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from "../ImagePopup/ImagePopup";

function App() {
  // Установка стейтов попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  // Установка стейта попапа для картинки в карточке
  const [selectedCard, setSelectedCard] = React.useState(false);

  // Функции попапов
  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setHandleEscClose();
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setHandleEscClose();
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setHandleEscClose();
    setSelectedCard(card);
  }
  
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(false);
    removeHandleEscClose();
  }

  function handleClickClose(evt) {
    const evtTarget = evt.target;

    if (evtTarget.classList.contains('popup') || evtTarget.classList.contains('popup__close')) {
      closeAllPopups();
    }
  }

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function setHandleEscClose() {
    document.addEventListener('keydown', handleEscClose);
  }

  function removeHandleEscClose() {
    document.removeEventListener('keydown', handleEscClose);
  }

  return (
    <div className="page__content">
      <div className="container">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}/>
        <Footer />
      </div>

      {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} handleClickClose={handleClickClose}/>}

      {isEditProfilePopupOpen &&
        <PopupWithForm handleClickClose={handleClickClose} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} name="edit-profile" title="Редактировать профиль">
          <input className="popup__input popup__input_value_fio" type="text" name="name" required minLength="2"
                 maxLength="40"/>
          <span className="popup__text-error"/>
          <input className="popup__input popup__input_value_profess" type="text" name="about" required minLength="2"
                 maxLength="200"/>
          <span className="popup__text-error"/>
          <button type="submit" className="popup__btn">Сохранить</button>
        </PopupWithForm>
      }

      {isAddPlacePopupOpen &&
        <PopupWithForm handleClickClose={handleClickClose} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} name="add-cards" title="Новое место">
          <input className="popup__input popup__input_value_name-cards" type="text" name="name"
                 placeholder="Название" required minLength="2" maxLength="30"/>
          <span className="popup__text-error"/>
          <input className="popup__input popup__input_value_link-cards" type="url" name="link"
                 placeholder="Ссылка на картинку" required/>
          <span className="popup__text-error"/>
          <button type="submit" className="popup__btn popup__btn_disabled">Создать</button>
        </PopupWithForm>
      }

      {isEditAvatarPopupOpen &&
        <PopupWithForm handleClickClose={handleClickClose} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} name="update-avatar" title="Обновить аватар">
          <input className="popup__input popup__input_value_link-avatar" type="url" name="avatar"
                 placeholder="Ссылка на картинку" required/>
          <span className="popup__text-error"/>
          <button type="submit" className="popup__btn popup__btn_disabled">Сохранить</button>
        </PopupWithForm>
      }
    </div>
  );
}

export default App;
