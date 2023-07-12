const srf_collection = require('../../../models/srf');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const deleteAssetsInSubfolder = async (subfolderPath) => {
  const { resources } = await cloudinary.search
    .expression(`${subfolderPath}/*`)
    .execute();

  const publicIds = resources.map((resource) => resource.public_id);

  if (publicIds.length === 0) {
    return;
  }

  await cloudinary.api.delete_resources(publicIds, { invalidate: true });
};

const deleteFolder = async (pathName) => {
  try {
    await deleteAssetsInSubfolder(`${pathName}`);
    cloudinary.api.delete_folder(`${pathName}`);
    return 'Success';
  } catch (e) {
    console.log(e);
  }
};

module.exports = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const { id } = req.params;
  srf_collection
    .findByIdAndDelete({ _id: id })
    .then(async (result) => {
      const arr = result.sign[0].split('/');
      const newArr = [];
      arr.map((val, index) => {
        if (index > 2) {
        } else {
          newArr.push(val);
        }
      });
      const deletePath = newArr.join('/');
      console.log(deletePath);
      const folderdel = await deleteFolder(deletePath);
      if (folderdel === 'Success') {
        res.send({ Status: 'Success' });
      } else {
        res.send({ Status: 'Failed' });
      }
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
