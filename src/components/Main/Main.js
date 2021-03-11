import React from 'react';
import api from "../../utils/api";
import Card from "../../components/Card/Card";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete}) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.initialPage()
      .then(([userInfo, initialCards]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(initialCards);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="main">
      {userName && userDescription && userAvatar &&
        <>
        <section className="profile">
          <div className="profile__info">
            <div className="profile__img-box" onClick={onEditAvatar}>
              <div className="profile__img" style={{backgroundImage: `url(${userAvatar})`}}/>
            </div>
            <div className="profile__content">
              <div className="profile__fio-box">
                <h1 className="profile__fio">{userName}</h1>
                <button type="button" className="profile__edit" onClick={onEditProfile}/>
              </div>
              <p className="profile__about">{userDescription}</p>
            </div>
          </div>
          <button type="button" className="profile__add" onClick={onAddPlace}/>
        </section>
        <section className="cards">
          {cards.map((card) => {
            return (
              <Card card={card} onCardClick={onCardClick} onCardDelete={onCardDelete} key={card._id}/>
            )
          })}
        </section>
        </>
      }
    </main>
  )
}

export default Main