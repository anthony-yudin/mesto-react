import React from "react";

function PopupWithForm({handleClickClose, onClose, isOpen, name, title, children}) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, onClose]);

  return (
    <div onClick={handleClickClose} className={`popup${isOpen ? ' popup_opened' : ''} popup_type_${name}`}>
      <div className="popup__container">
        <form className={`popup__form popup__form_type_${name}`} method="post">
          <button type="button" className="popup__close" onClick={onClose}/>
          <h3 className="popup__title">{title}</h3>
          {children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm