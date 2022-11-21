import express from 'express';
// import {genres} from './genresData';
import Genres from './genresModel';

const router = express.Router(); 

// router.get('/', (req, res) => {
//     res.json(genres);
// });
router.get('/', async (req, res) => {
    const genres = await Genres.find();
    res.status(200).json(genres);
});

export default router;