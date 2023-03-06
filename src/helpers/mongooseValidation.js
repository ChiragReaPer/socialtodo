import mongoose from "mongoose";

export const mongooseIdChecker = async (ObjectId, typeName) => {
  var validId = mongoose.Types.ObjectId.isValid(ObjectId);

  if (!validId) {
    return Promise.reject(
      new Error(`${ObjectId} Is Not A Valid ${typeName} Id`)
    );
  }
};

export const getObjectId = async (Id) => {
  return mongoose.Types.ObjectId(Id);
};
export const getObjectId2 = (Id) => {
  return new mongoose.Types.ObjectId(Id);
};
