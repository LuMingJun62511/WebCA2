import express from 'express';
import asyncHandler from 'express-async-handler';
import { getActorDetails, getExternalID, getActorCredits, getPopular } from '../tmdb-api';

const router = express.Router();

//4
router.get('/tmdb/actorDetail/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actorDetail = await getActorDetails(id);
    res.status(200).json(actorDetail);
}));

//5
router.get('/tmdb/externalID/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const externalID = await getExternalID(id);
    res.status(200).json(externalID);
}));

//6
router.get('/tmdb/actorCredits/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actorCredits = await getActorCredits(id);
    res.status(200).json(actorCredits);
}));

//10
router.get('/tmdb/popular/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const popular = await getPopular(page);
    res.status(200).json(popular);
}));


export default router;

