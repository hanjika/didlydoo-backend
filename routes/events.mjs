import { Router } from 'express';
import { getAllEvents, 
    getEventById, 
    addNewEvent, 
    editEvent, 
    deleteEventById,
    addDatesToEvent,
    addAttendeeToDate,
} from '../index.mjs';

const router = Router();

router
    .route('/')
    .get(async (req, res, next) => {
        res.json(await getAllEvents())
    })
    .post(async (req, res, next) => {
        const newEvent = await addNewEvent(req.body.name, req.body.author, req.body.description);
        res.send(newEvent);
    })

router
    .route('/:id')
    .get(async (req, res, next) => {
        res.json(await getEventById(req.params.id))
    })
    .patch(async (req, res, next) => {
        const edit = await editEvent(req.params.id, req.body.name, req.body.author, req.body.description);
        res.send(edit);
    })
    .delete(async (req, res, next) => {
        const deleteEvent = await deleteEventById(req.params.id);
        res.send(deleteEvent);
    })

router
    .route('/:id/add_dates')
    .post(async (req, res, next) => {
        const newDate = await addDatesToEvent(req.params.id, req.body.dates);
        res.send(newDate);
    })

router
    .route('/:date_id/attend')
    .post(async (req, res, next) => {
        const newAttendee = await addAttendeeToDate(req.params.date_id, req.body.attendee, req.body.available);
        res.send(newAttendee);
    })

export default router;