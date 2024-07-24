import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Assurez-vous que data et data.focus existent avant de continuer
  const byDateDesc = data?.focus ? data.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  ) : [];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((current) => (current < byDateDesc.length - 1 ? current + 1 : 0));
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, byDateDesc.length]);

  const handleOptionChange = (e) => {
    setIndex(parseInt(e.target.value, 10));
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (        
        <div
          key={event.id} // Utilisez l'ID unique pour la clé
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (
            <input              
              key={event.id}
              type="radio"
              name="radio-button"
              value={radioIdx}
              checked={index === radioIdx}
              onChange={handleOptionChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
