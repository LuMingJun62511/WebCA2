import express from 'express';
import asyncHandler from 'express-async-handler';
import { getActorDetails, getExternalID, getActorCredits, getPopular } from '../tmdb-api';


const router = express.Router();

const regex = new RegExp(/([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])/);
const regex2 = new RegExp(/([1-9]|10)/);
//4
router.get('/tmdb/actorDetail/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (regex.test(id)) {
        const actorDetail = await getActorDetails(id);
        res.status(200).json(actorDetail);
    } else {
        res.status(404).json({ success: false, msg: 'invalid id' });
    }

}));

//5
router.get('/tmdb/externalID/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (regex.test(id)) {
        const externalID = await getExternalID(id);
        res.status(200).json(externalID);
    } else {
        res.status(404).json({ success: false, msg: 'invalid id' });
    }
}));

//6
router.get('/tmdb/actorCredits/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (regex.test(id)) {
        const actorCredits = await getActorCredits(id);
        res.status(200).json(actorCredits);
    } else {
        res.status(404).json({ success: false, msg: 'invalid id' });
    }
}));

//10
router.get('/tmdb/popular/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    if (regex2.test(page)) {
        const popular = await getPopular(page);
        res.status(200).json(popular);
    } else {
        res.status(404).json({ success: false, msg: 'invalid page' });
    }
}));


export default router;

