import express from 'express';
import { getGenres } from '../tmdb-api';

const router = express.Router();

//2
router.get('/tmdb/genres', async (req, res) => {
    const genres = await getGenres();
    // res.status(200).json(genres);
    if (genres) {
        res.status(200).json(genres);
    } else {
        res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
});

export default router;