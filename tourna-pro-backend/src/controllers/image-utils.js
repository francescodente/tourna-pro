const fs = require('fs').promises
const { Image } = require('../models')
const { ok, badRequest } = require('../utils/action-results')

const supportedMimeTypes = [
  'image/jpeg',
  'image/bmp',
  'image/png',
  'image/tiff',
  'image/gif'
]

async function storeImage(file) {
  if (!supportedMimeTypes.includes(file.mimetype)) {
    return { error: 'Unsupported mime type' }
  }
  let imageModel = new Image({
    data: await fs.readFile(file.path),
    mime: file.mimetype
  })
  let image = await imageModel.save()
  return { image }
}

exports.imageUrl = function (id, req) {
  return id ? `${req.protocol}://${req.headers.host}/images/${id}` : null
}

exports.setImage = async function(file, entity, req) {
  if (entity.imageId) {
    await Image.findByIdAndDelete(entity.imageId)
  }
  let { image, error } = await storeImage(file)
  if (error) {
    return badRequest(error)
  }
  await entity.updateOne({ imageId: image._id })
  return ok({
    imageUrl: exports.imageUrl(image._id, req)
  })
}
