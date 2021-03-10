function ImagePopup({card, onClose, handleClickClose}) {
  return (
    <div onClick={handleClickClose} className={`popup ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_image">
        <img className="popup__image" src={card.link} alt={card.name}/>
        <p className="popup__title-image">{card.name}</p>
        <button type="button" className="popup__close" onClick={onClose}/>
      </div>
    </div>
  )
}

export default ImagePopup