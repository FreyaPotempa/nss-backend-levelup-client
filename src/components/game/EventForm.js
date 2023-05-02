import { useNavigate, useParams } from "react-router-dom";
import {
  createNewEvent,
  getSingleEvent,
  updateEvent,
} from "../../managers/EventManager";
import { useEffect, useState } from "react";
import { getSingleGame } from "../../managers/GameManager";

export const EventForm = () => {
  const { event_id } = useParams();
  const navigate = useNavigate();
  const [currentEvent, setCurrentEvent] = useState({
    description: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (event_id) {
      getSingleEvent(event_id).then((eventObj) => setCurrentEvent(eventObj));
    }
  }, [event_id]);

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
      <h2 className="eventForm__title">
        {event_id ? "Edit " : "Create "}Event
      </h2>
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

          if (event_id) {
            updateEvent(currentEvent).then(() => navigate("/events"));
          } else {
            // Send POST request to your API
            createNewEvent(currentEvent).then(() => navigate("/events"));
          }
        }}
        className="btn btn-primary"
      >
        {event_id ? "Edit" : "Create"}
      </button>
    </form>
  );
};
