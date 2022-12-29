import express from 'express';
import Reviews from '../users/reviewsModel';
import asyncHandler from 'express-async-handler';
import { getUpcomingMovies, getMovieImages, getMovie, getMovies, getMovieCredits, getMovieReviews } from '../tmdb-api';

const router = express.Router();

//1
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    // res.status(200).json(upcomingMovies);
    if (upcomingMovies) {
        res.status(200).json(upcomingMovies);
    } else {
        res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
}));


//3
router.get('/tmdb/movieImgs/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieImgs = await getMovieImages(id);
    res.status(200).json(movieImgs);
}));

//7
router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
}));

//8
router.get('/tmdb/movies', asyncHandler(async (req, res) => {
    const movies = await getMovies();
    if (movies) {
        res.status(200).json(movies);
    } else {
        res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
}));

//9
router.get('/tmdb/movieCredits/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieCredits = await getMovieCredits(id);
    // res.status(200).json(movieCredits);
    if (movieCredits) {
        res.status(200).json(movieCredits);
    } else {
        res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
}));


//11
router.get('/tmdb/movieReviews/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieReviewsApiPart = await getMovieReviews(id);
    const movieReviewsUserPart = await Reviews.findByMovieId(id);
    const movieReviews = await [].concat(movieReviewsApiPart, movieReviewsUserPart);
    res.status(200).json(movieReviews);
}));

export default router;