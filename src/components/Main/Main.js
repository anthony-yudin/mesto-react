import React from 'react';
import api from "../../utils/Api";
import Card from "../../components/Card/Card";

function Main(props) {
  const [user, setUser] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.initialPage()
      .then(data => {
        const [user, cards] = data;

        setUser(user);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="main">
      {user &&
        <>
        <section className="profile">
          <div className="profile__info">
            <div className="profile__img-box" onClick={props.onEditAvatar}>
              <div className="profile__img" style={{backgroundImage: `url(${user.avatar})`}}/>
            </div>
            <div className="profile__content">
              <div className="profile__fio-box">
                <h1 className="profile__fio">{user.name}</h1>
                <button type="button" className="profile__edit" onClick={props.onEditProfile}/>
              </div>
              <p className="profile__about">{user.about}</p>
            </div>
          </div>
          <button type="button" className="profile__add" onClick={props.onAddPlace}/>
        </section>
        <section className="cards">
          {cards.map((card, i) => {
            return (
              <Card card={card} onCardClick={props.onCardClick} key={i}/>
            )
          })}
        </section>
        </>
      }
    </main>
  )
}

export default Main