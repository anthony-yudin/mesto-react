function PopupWithForm(props) {
  return (
    <div onClick={props.handleClickClose} className={`popup ${props.isOpen ? 'popup_opened' : ''} popup_type_${props.name}`}>
      <div className="popup__container">
        <form className={`popup__form popup__form_type_${props.name}`} method="post">
          <button type="button" className="popup__close" onClick={props.onClose}/>
          <h3 className="popup__title">{props.title}</h3>
          {props.children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm