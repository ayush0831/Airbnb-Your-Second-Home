const Listing = require("../models/listing");
const fetch = require("node-fetch");

module.exports.index = async(req,res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewform = (req,res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async(req,res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id)
  .populate({            // using populate shows the actual docs() it refers to , eg: without populate it show only owner objectId not it's actual id and name 
    path:"reviews",
    populate: {
    path:"author"
  },
}).populate("owner");
  if(!listing){
    req.flash("error","The Listing you requested does not exist");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs",{listing});
};

// async function geocodeLocation(location) {        // no need to understand this 
//   const response = await fetch(                   // mapbox is not working so we have used nominatim
//     `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
//   );
//   const data = await response.json();
//   console.log(data);
//   if (data.length > 0) {
//     return {
//       lat: parseFloat(data[0].lat),
//       lon: parseFloat(data[0].lon)
//     };
//   }
//   return null;
// }
module.exports.createListing = async(req,res,next) => {
  //let {id,title,description,price,country,location} = req.body;
  //let listing = req.body.listing;
  // try{
  // let result = listingSchema.validate(req.body);
  // console.log(result);
  // if(result.error){
  //   throw new ExpressError(400,result.error);
  // }
  // if(!req.body.listing){
  //   throw new ExpressError(400,"Send valid data for listing");    // 400 is the client side error
  // }
    let url = req.file.path;
    let filename = req.file.filename;

    // const {location} = req.body.listing;
    // const coords = await geocodeLocation(location);
 
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};

  //   if (coords) {
  //   newListing.geometry = {
  //     type: "Point",
  //     coordinates: [coords.lon, coords.lat] // GeoJSON [lon, lat]
  //   };
  // }
  //   console.log(newListing.geometry.listing);

    // if(!newListing.title){
    //   throw new ExpressError(400,"title is missing");              // Validation for Schema
    // }
    // if(!newListing.description){
    //   throw new ExpressError(400,"Description is missing");
    // }
    // if(!newListing.location){
    //   throw new ExpressError(400,"location is missing");
    // }
    await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
  // }catch(err) {
  //   next(err);
  // }
};

module.exports.renderEditform = async(req,res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","The Listing you requested does not exist");
    return res.redirect("/listings");
  }
  let originalImageurl = listing.image.url;
  originalImageurl = originalImageurl.replace("/upload","/upload/w_250");      // Cloudinary allows tweaking the url
  res.render("listings/edit.ejs",{listing,originalImageurl});
};

module.exports.updateListing = async(req,res) => {
  let {id} = req.params;
  // if(!req.body.listing){                                     // By using validateListing no need of this
  //   throw new ExpressError(400,"Send valid data for listing");
  // }
  let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});     //req.body.listing is js object that have all parameters 
  if(req.body !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    //await listing.save();
  }
  // re-geocode if location changed
  if (req.body.listing.location) {
    const coords = await geocodeLocation(req.body.listing.location);
    if (coords) {
      listing.geometry = {
        type: "Point",
        coordinates: [coords.lon, coords.lat]
      };
    }
  }
  
  await listing.save();
  req.flash("success","New Listing updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req,res) => {
  let {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted");
  res.redirect("/listings");
};