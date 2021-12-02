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

    const insertDate = await db.run(
        'INSERT INTO dates (event_id, event_date) VALUES (?, ?)', [id, date]
    );

    db.close();
    return insertDate;
}

async function addAttendeeToDate(dates_id, attendee_name, available) {
    const db = await SQLite.open('./db/database');

    const addAttendee = await db.run(
        'INSERT INTO attendees (dates_id, attendee, available) VALUES (?, ?, ?)', [dates_id, attendee_name, available]
    );

    db.close();
    return addAttendee;
}

async function editEvent(id, name, author, description) {
    const db = await SQLite.open('./db/database');

    const edit = await db.run(
        'UPDATE events SET event_name = ?, event_author = ?, event_description = ? WHERE event_id = ?', [name, author, description, id]
    );

    db.close();
    return edit;
}

async function addNewEvent(name, author, description) {
    const db = await SQLite.open('./db/database');

    const addEvent = await db.run(
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

// deleteEventById(7);
// getEventById(1);
// addDateToEvent(8, '2022-01-12');
// addAttendeeToDate(14, 'Shanon', false);
// editEvent(8, 'Updated event', 'Bunnys friend', 'Updated party info');
// addNewEvent('New Event 3', 'Bunny', 'Added another new event AGAIN');
getAllEvents(); 