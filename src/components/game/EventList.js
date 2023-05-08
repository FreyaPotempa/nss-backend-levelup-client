import React, { useEffect, useState } from "react";
import {
  deleteEvent,
  getEvents,
  joinEvent,
  leaveEvent,
} from "../../managers/EventManager";
import { useNavigate } from "react-router-dom";

export const EventList = (props) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    getEvents().then((data) => setEvents(data));
  };

  useEffect(() => {
    fetchEvents();
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
          console.log(event);
          return (
            <section key={`event--${event.id}`} className="event">
              <div className="event__description">{event.description}</div>
              <div>Playing {event.game_id}</div>
              <div className="event__date">
                On {event.date} at {event.time}
              </div>
              <div className="event__organizer">
                Organized by {event.organizer_id}
              </div>
              {event.joined ? (
                <button
                  type="button"
                  onClick={() =>
                    leaveEvent(event.id).then(() => {
                      fetchEvents();
                    })
                  }
                >
                  Leave
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    joinEvent(event.id).then(() => {
                      fetchEvents();
                    })
                  }
                >
                  Join
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate(`/events/edit/${event.id}`)}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() =>
                  deleteEvent(event.id).then(() => {
                    fetchEvents();
                  })
                }
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
