import React, { useEffect, useState } from "react";
import { deleteEvent, getEvents } from "../../managers/EventManager";
import { useNavigate } from "react-router-dom";

export const EventList = (props) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <>
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          navigate({ pathname: "/events/new" });
        }}
      >
        Register New Event
      </button>
      <article className="events">
        {events.map((event) => {
          return (
            <section key={`event--${event.id}`} className="event">
              <div className="event__description">{event.description}</div>
              <div className="event__date">
                On {event.date} at {event.time}
              </div>
              <div className="event__organizer">
                Organized by {event.organizer_id}
              </div>
              <button
                type="button"
                onClick={() => navigate(`/events/edit/${event.id}`)}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => deleteEvent(event.id).then(navigate("/events"))}
              >
                Delete
              </button>
            </section>
          );
        })}
      </article>
    </>
  );
};
