CREATE TABLE events (
  event_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  event_name VARCHAR(255) NOT NULL,
  event_author VARCHAR(255) NOT NULL,
  event_description VARCHAR(255) NOT NULL
);

CREATE TABLE dates (
  dates_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER NOT NULL,
  event_date DATE NOT NULL,
--   FOREIGN KEY(event_id) REFERENCES events(events_id)
);

CREATE TABLE attendees (
  attendees_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  dates_id INTEGER NOT NULL,
  attendee VARCHAR(255) NOT NULL,
  available TINYINT(1) NOT NULL,
--   FOREIGN KEY(dates_id) REFERENCES dates(dates_id)
);

INSERT INTO events (event_name, event_author, event_description)
VALUES ('Party', 'Hanna', 'Having a party'),
    ('Christmas', 'Santa', 'Celebrate'),
    ('NYE', 'Bob', 'End of year');

INSERT INTO dates (event_id, event_date)
VALUES (1, '2021-12-10'),
        (1, '2021-12-13'),
        (1, '2021-12-15'),
        (1, '2021-12-16'),
        (2, '2021-12-25'),
        (3, '2021-12-30'),
        (3, '2021-12-31');

INSERT INTO attendees (dates_id, attendee, available)
VALUES (1, 'Shanon', true),
        (1, 'Dan', true),
        (3, 'Shanon', false),
        (4, 'Shanon', true);