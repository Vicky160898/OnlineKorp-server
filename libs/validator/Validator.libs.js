const {
  Types: { ObjectId },
} = require("mongoose");

const objectIdValidator = (value, helpers) => {
  // Check if value contains commas, indicating it might be multiple ids
  if (value.includes(",")) {
    const ids = value.split(",");
    const objectIds = [];
    for (let id of ids) {
      id = id.trim(); // Remove any potential whitespace
      if (!ObjectId.isValid(id)) {
        return helpers.error("any.invalid");
      }
      objectIds.push(new ObjectId(id));
    }
    return objectIds;
  } else {
    // Handle single ObjectId
    if (ObjectId.isValid(value)) {
      return new ObjectId(value);
    }
    return helpers.error("any.invalid");
  }
};

module.exports = {
  objectIdValidator,
};
