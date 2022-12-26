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

//这个就教会了我怎么从芒果里面取数据，那么初始的数据是怎么存进去的来着