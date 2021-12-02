import SQLite from 'sqlite-async';

async function getAllEvents() {
    const db = await SQLite.open('./db/database');
  
    const allEvents = await db.all(
      'SELECT * from events;'
    );
    
    for(let event of allEvents) {
        const eventDates = await db.all(
            'SELECT event_date, dates_id FROM dates WHERE event_id=?', [event.event_id]
        );

        for (const date of eventDates) {
            const attendees = await db.all(
                'SELECT attendee, available, dates_id FROM attendees WHERE dates_id=?', [date.dates_id]
            );

            let attendObj = {
                attendees: attendees
            };

            Object.assign(date, attendObj);
        }

        let dateObj = {
            dates: eventDates
        };

        Object.assign(event, dateObj);
    }
  
    console.log(JSON.stringify(allEvents, null, 2));
  
    db.close();
  
    return allEvents;
}

async function getEventById(id) {
    const db = await SQLite.open('./db/database');

    const EventById = await db.get(
        'SELECT * FROM events WHERE event_id=?', [id]
    );

    const eventDates = await db.all('SELECT event_date, dates_id FROM dates WHERE event_id=?', [id])

    for (const date of eventDates) {
        const attendees = await db.all('SELECT attendee, available, dates_id FROM attendees WHERE dates_id=?', [date.dates_id])

        let attendObj = {
            attendees: attendees
        }

        Object.assign(date, attendObj);
    }

    let dateObj = {
        dates: eventDates,
    }

    Object.assign(EventById, dateObj);
    console.log(EventById);

    db.close();

    return EventById;
}

async function addDateToEvent(id, date) {
    const db = await SQLite.open('./db/database');

    const insertDate = await db.get(
        'INSERT INTO dates (event_id, event_date) VALUES (?, ?)', [id, date]
    );

    db.close();
    return insertDate;
}

async function addAttendeeToEvent(dates_id, attendee_name, available) {
    const db = await SQLite.open('./db/database');

    const addAttendee = await db.get(
        'INSERT INTO attendees (dates_id, attendee, available) VALUES (?, ?, ?)', [dates_id, attendee_name, available]
    );

    db.close();
    return addAttendee;
}

async function editEvent(id, name, author, description) {
    const db = await SQLite.open('./db/database');

    const edit = await db.get(
        'UPDATE events SET event_name = ?, event_author = ?, event_description = ? WHERE event_id = ?', [name, author, description, id]
    );

    db.close();
    return edit;
}

async function addNewEvent(name, author, description) {
    const db = await SQLite.open('./db/database');

    const addEvent = await db.get(
        'INSERT INTO events (event_name, event_author, event_description) VALUES (?, ?, ?)', [name, author, description]
    );

    db.close();
    return addEvent;
}

async function deleteEventById(id) {
    const db = await SQLite.open('./db/database');

    const event = await db.run(
        'DELETE FROM events WHERE event_id=?', [id]
    );

    db.close();
    return event;
}

// deleteEventById(5);
// getEventById(1);
// addDateToEvent(4, '2022-01-10');
// addAttendeeToEvent(13, 'Sloth', true);
// editEvent(1, 'New party', 'Bob', 'Updated party info');
// addNewEvent('New Event 2', 'Elfy', 'Added another new event');
getAllEvents(); 