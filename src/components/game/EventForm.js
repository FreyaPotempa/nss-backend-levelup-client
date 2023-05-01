import { useNavigate } from "react-router-dom";
import { createNewEvent } from "../../managers/EventManager";
import { useState } from "react";

export const EventForm = () => {
  const navigate = useNavigate();
  const [currentEvent, setCurrentEvent] = useState({
    description: "",
    date: "",
    time: "",
  });

  //   useEffect(() => {
  //     getGameTypes().then((data) => setGameTypes(data));
  //   }, []);

  const changeEventState = (domEvent) => {
    const { name, value } = domEvent.target;
    setCurrentEvent((currentEvent) => ({
      ...currentEvent,
      [name]: value,
    }));
  };

  return (
    <form className="eventForm">
      <h2 className="eventForm__title">Register New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control"
            value={currentEvent.description}
            onChange={changeEventState}
          />
        </div>
        <div>
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            name="date"
            required
            autoFocus
            className="form-control"
            value={currentEvent.date}
            onChange={changeEventState}
          />
        </div>
        <div>
          <label htmlFor="time">Time: </label>
          <input
            type="time"
            name="time"
            required
            autoFocus
            className="form-control"
            value={currentEvent.time}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          // Send POST request to your API
          createNewEvent(currentEvent).then(() => navigate("/events"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
