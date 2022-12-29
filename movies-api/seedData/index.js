import userModel from '../api/users/userModel';
// import movieModel from '../api/users/movieModel';
import users from './users';
import dotenv from 'dotenv';

dotenv.config();

// deletes all user documents in collection and inserts test data
async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}


// 这是我取动态数据的努力，虽然没啥用，暂时留着吧
// export async function loadMovies() {
//   console.log('load dynamic movies data');
//   try {
//     let Movies;
//     await getMovies().then((res) => {
//       Movies = res.results;
//     })
//     await movieModel.deleteMany();
//     await movieModel.collection.insertMany(Movies);
//     await console.info(`${Movies.length} Movies were successfully stored.`);
//   } catch (err) {
//     console.error(`failed to Load movie Data: ${err}`);
//   }
// }

if (process.env.SEED_DB) {
  loadUsers();
}
