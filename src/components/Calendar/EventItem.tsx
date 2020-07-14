import React, { useState, useEffect, useRef } from 'react';
import {
  deleteUserEvent,
  UserEvent,
  updateUserEvent,
} from '../../redux/user-events';
import { useDispatch } from 'react-redux';

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(event.title);

  const handleClick = () => {
    dispatch(deleteUserEvent(event.id));
  };

  const handleTitleClick = () => {
    setEditable(true);
  };

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    if (title !== event.title) {
      dispatch(updateUserEvent({ ...event, title }));
    }
    setEditable(false);
  };

  return (
    <div className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">10:00 - 12:00</div>
        <div className="calendar-event-title">
          {!editable ? (
            <span onClick={handleTitleClick}>{event.title}</span>
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </div>
      </div>
      <div className="calendar-event-delete-button" onClick={handleClick}>
        &times;
      </div>
    </div>
  );
};

export default EventItem;
