import SQLite from 'sqlite-async';

async function getAllEvents() {
    const db = await SQLite.open('./db/database');
  
    const allEvents = await db.all(
      'SELECT * from events;'
    );
    
    for(let event of allEvents) {
        const eventDates = await db.all('SELECT event_date, dates_id FROM dates WHERE event_id=?', [event.event_id])

        for (const date of eventDates) {
            const attendees = await db.all('SELECT attendee, available, dates_id FROM attendees WHERE dates_id=?', [date.dates_id])

            let attendObj = {
                attendees: attendees
            }

            Object.assign(date, attendObj);
            console.log(date)
        }

        let dateObj = {
            dates: eventDates,
        }

        Object.assign(event, dateObj);
        console.log(event);
    }
  
    // console.log(allEvents);
  
    db.close();
  
    return allEvents;
}

// async function getAllEvents() {
//   const db = await SQLite.open('./db/database');

//   const allEvents = await db.all(
//     'SELECT events.event_id, event_name, event_author, event_description, GROUP_CONCAT(event_date) FROM events LEFT JOIN dates ON events.event_id = dates.event_id;'
//   );
//   console.log(allEvents);

//   db.close();

//   return allEvents;
// }


async function getEventById(id) {
    const db = await SQLite.open('./db/database');

    const EventById = await db.all(
        'SELECT * FROM events WHERE event_id=?', [id]
    );
    console.log(EventById);

    db.close();

    return EventById;
}


getAllEvents();
// getEventById(2);