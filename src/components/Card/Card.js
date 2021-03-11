import React from "react";

function Card({card, onCardClick, onCardDelete}) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="card" id={card._id}>
      <div className="card__img" onClick={handleClick} style={{backgroundImage: `url(${card.link})`}}/>
      <div className="card__content">
        <h3 className="card__title">{card.name}</h3>
        <div className="card__like-info">
          <button type="button" className="card__like"/>
          <div className="card__like-count">{card.likes.length}</div>
        </div>
      </div>
      <div className="card__delete" onClick={onCardDelete}/>
    </article>
  )
}

export default Card