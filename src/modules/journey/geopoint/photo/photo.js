
const getGeopointPhoto = function(req, res)
{
    res.send({
      message: "GET Photo",
      params: { ...req.params },
      journey: req.journey,
      geopoint: req.geopoint
    });
}

const addGeopointPhoto = function(req, res)
{
    res.send({
      message: "ADD Photo",
      params: { ...req.params },
      journey: req.journey,
      geopoint: req.geopoint
    });
}

const updateGeopointPhoto = function(req, res)
{
    res.send({
      message: "UPDATE Photo",
      params: { ...req.params },
      journey: req.journey,
      geopoint: req.geopoint
    });
}

const deleteGeopointPhoto = function(req, res)
{
    res.send({
      message: "DELETE Photo",
      params: { ...req.params },
      journey: req.journey,
      geopoint: req.geopoint
    });
}

const getGeopointAllPhotos = function(req, res)
{
    res.send({
      message: "GET ALL Photos",
      params: { ...req.params },
      journey: req.journey,
      geopoint: req.geopoint
    });
}



module.exports = { getGeopointPhoto,
addGeopointPhoto,
updateGeopointPhoto,
deleteGeopointPhoto,
getGeopointAllPhotos }
