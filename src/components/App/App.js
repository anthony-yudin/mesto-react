import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ImagePopup from "../ImagePopup/ImagePopup";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CardsContext } from '../../contexts/CardsContext';
import api from '../../utils/api';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import DeletePopup from '../DeletePopup/DeletePopup';

function App() {
  // Установка стейтов попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = React.useState(false);
  const [idCard, setIdCard] = React.useState();

  // Установка стейта попапа для картинки в карточке
  const [selectedCard, setSelectedCard] = React.useState(false);

  // Установка стейтов карточек и пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState({});

  React.useEffect(() => {
    api.initialPage()
      .then(([getUserInfo, getCardList]) => {
        setCurrentUser(getUserInfo);
        setCards(getCardList);
      })
      .catch(err => console.log(err));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then(newCard => {
      setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    });
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data).then(data => setCurrentUser(data))
      .then(() => closeAllPopups());
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data).then(data => setCurrentUser(data))
      .then(() => closeAllPopups());
  }

  function handleAddPlaceSubmit(data) {
    api.sendCard(data).then(data => setCards([data, ...cards]))
      .then(() => closeAllPopups());
  }

  function handleCardDelete(id) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== id));
      })
      .then(() => closeAllPopups());
  }

  function onCardId(id) {
    setIdCard(id);
  }

  // Функции попапов
  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function onCardDeletePopup() {
    setDeletePlacePopupOpen(!isDeletePlacePopupOpen);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setDeletePlacePopupOpen(false);
  }

  function handleClickClose(evt) {
    const evtTarget = evt.target;

    if (evtTarget.classList.contains('popup') || evtTarget.classList.contains('popup__close')) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page__content">
          <div className="container">
            <Header />
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDeletePopup={onCardDeletePopup}
              onCardId={onCardId} />
            <Footer />
          </div>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} handleClickClose={handleClickClose}/>

          <EditProfilePopup handleClickClose={handleClickClose} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup handleClickClose={handleClickClose} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <AddPlacePopup handleClickClose={handleClickClose} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <DeletePopup handleClickClose={handleClickClose} isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} onDelete={handleCardDelete} idCard={idCard} />

        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
