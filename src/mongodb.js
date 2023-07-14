const mongoose = require('mongoose');

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

try {
  mongoose.connect('mongodb://mongodb0.example.com:27017', connectionParams);
  console.log('Connected to databse successfully');
} catch (error) {
  console.log(error);
  console.log('Could not connect to database');
}

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const collection = mongoose.model('collection1', LoginSchema);

module.exports = collection;

// const mongoose = require('mongoose');

// module.exports = () => {
//   const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

//   try {
//     mongoose.connect(process.env.DB, connectionParams);
//     console.log('Connected to databse successfully');
//   } catch (error) {
//     console.log(error);
//     console.log('Could not connect to database');
//   }
// }
