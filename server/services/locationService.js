const mongoose = require("mongoose");
const Location = mongoose.model("locations");
const User = mongoose.model("users");

const checkAndCreate = async data => {
  try { 
    const { name, userId } = data 
    const user = await User.findById(userId)
    const location = await new Location({ name, userId })
    const locationId = await location._id
    const existingLocations = await Location.find({name: name})
    existingLocations.forEach(location => {
      if (user.locations.includes(location._id)) throw new Error("This user already has this location!")
    })
    
    user.locations.push(locationId)
    user.save()
    location.save()
    return { ...location._doc}

  } catch(err){
    throw err
  }
  

}

module.exports = {
  checkAndCreate
};
