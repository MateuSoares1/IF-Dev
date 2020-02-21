const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArrray = require('../Utils/parseStringAsArray');

module.exports = {
    async store(request, response) {
        const { gitHub_username, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({ gitHub_username });
        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${gitHub_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArrray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                gitHub_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        return response.json(dev);
    },


    async index (request, response){
        const devs = await Dev.find();

        return response.json(devs);
    }
}