const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.set('strictQuery', true);
const Campground = require('../models/campground');

mongoose.connect("mongodb+srv://darshkejriwal:O1Y9V1pimol2fyNL@cluster0.z7bv7ab.mongodb.net/", {
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.off("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64d7e7fd14c3a2b8cb683a83',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                url: 'https://res.cloudinary.com/dlhavnr1u/image/upload/v1693318419/YelpCamp/z1jj5y0hqgtnkkclhgkn.jpg',
                filename: 'YelpCamp/z1jj5y0hqgtnkkclhgkn'
            }],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis sed molestiae vero, neque, ducimus ut possimus, excepturi illum voluptatem optio soluta voluptatum? Rerum quaerat ipsum at quo facilis expedita numquam!',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            }
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})