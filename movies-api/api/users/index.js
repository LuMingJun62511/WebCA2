import express from 'express';
import User from './userModel';
import Reviews from './reviewsModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { getMovie } from '../tmdb-api';

const router = express.Router(); // eslint-disable-line
const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/);
const regex2 = new RegExp(/(shit|fuck|faggot)/);

router.post('/', asyncHandler(async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ success: false, msg: 'Please pass username and password.' });
    return next();
  }
  if (!regex.test(req.body.password)) {
    res.status(401).json({ success: false, msg: 'BadPassword' });
    return next();
  }
  if (req.query.action === 'register') {
    await User.create(req.body);
    res.status(201).json({ code: 201, msg: 'Successful created new user.' });
  } else {
    const user = await User.findByUserName(req.body.username);
    if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        // if user is found and password matches, create a token
        const token = jwt.sign(user.username, process.env.SECRET);
        // return the information including token as JSON
        res.status(200).json({ success: true, token: 'BEARER ' + token });
      } else {
        res.status(401).json({ code: 401, msg: 'Authentication failed. Wrong password.' });
      }
    });
  }
}));

//13 把用户的评论存起来
router.post('/movieReviews/:id', asyncHandler(async (req, res, next) => {
  if (regex2.test(req.body.content)) {//如果评论有问题
    res.status(401).json({ success: false, msg: 'Bad Content' });
    console.log(req.body.content)
    console.log("评论有问题，下面不执行")
    return next();
  } else {
    console.log("评论没问题，这里才执行")
    console.log(req.body)
    Reviews.create({
      id: req.body.id,
      movieId: req.body.movieId,
      author: req.body.author,
      rating: req.body.rating,
      content: req.body.content
    });
    res.status(201).json(req.body);
  }
}));

//15
router.get('/:userName/favourites', asyncHandler(async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName).populate('favourites');
  res.status(200).json(user.favourites);
}));

//15
router.post('/:userName/favourites', asyncHandler(async (req, res) => {
  const newFavourite = req.body.id;
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);
  if (!user.favourites) {//一开始为空
    await user.favourites.push(newFavourite);
    await user.save();
    res.status(201).json(user);
  } else if (!user.favourites.includes(newFavourite)) {//不空且不包含
    await user.favourites.push(newFavourite);
    await user.save();
    res.status(201).json(user);
  } else {
    res.status(401).json({ code: 401, msg: 'Duplicate favo' });
  }
}));

//15
router.post('/:userName/favourites/delete', asyncHandler(async (req, res) => {
  const toBeDeleted = req.body.id;
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);
  if (!user.favourites.includes(toBeDeleted)) {
    res.status(401).json({ code: 401, msg: 'do not have' });
  } else {
    await user.favourites.pop(toBeDeleted);
    await user.save();
    res.status(201).json(user);
  }
}));

//16
router.get('/:userName/interestedGenres', asyncHandler(async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName).populate('favourites');
  let result = [];
  const userFavo = user.favourites;
  for (let i = 0; i < userFavo.length; i++) {
    await getMovie(userFavo[i]).then((res) => {
      result = [].concat(result, res.genres)
    })
  }
  res.status(200).json(result);
}));


// Update a user
router.put('/:id', async (req, res) => {
  if (req.body._id) delete req.body._id;
  const result = await User.updateOne({
    _id: req.params.id,
  }, req.body);
  if (result.matchedCount) {
    res.status(200).json({ code: 200, msg: 'User Updated Sucessfully' });
  } else {
    res.status(404).json({ code: 404, msg: 'Unable to Update User' });
  }
});
export default router;