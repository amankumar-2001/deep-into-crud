const { DateTime } = require("luxon");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../src/config/firebase.config");
const dataModel = require("../models/dataModel");
const { ObjectId } = require("mongodb");

const storeDriveData = async ({
  userId,
  typeOfData,
  data,
  file,
  metaData = {},
}) => {
  const dateTime = DateTime.now();
  try {
    const insertDict = {
      userId,
      typeOfData,
      data,
      metaData,
      isDeleted: false,
    };

    if (
      typeOfData === "File" ||
      typeOfData === "Image" ||
      typeOfData === "Blog"
    ) {
      const storageFB = getStorage();
      await signInWithEmailAndPassword(
        auth,
        process.env.FIREBASE_USER,
        process.env.FIREBASE_AUTH
      );

      const storageRef = ref(
        storageFB,
        `${userId}/${dateTime + file.originalname}`
      );
      const snapshot = await uploadBytesResumable(storageRef, file.buffer, {
        contentType: file.mimetype,
      });

      if (!snapshot) {
        return {
          ok: false,
          data: {},
          err: "Something went wrong!! we are looking into it...",
        };
      }
      const downloadURL = await getDownloadURL(snapshot.ref);
      insertDict.metaData["publicURL"] = downloadURL;
      insertDict.metaData["fileName"] = file.originalname;
      insertDict.metaData["fileType"] = file.mimetype;
    }

    const response = await dataModel.insert({
      insertDict,
    });

    if (!response) {
      return {
        ok: false,
        data: {},
        err: "Something went wrong!! we are looking into it...",
      };
    }
    return { ok: true, data: response, err: "" };
  } catch (error) {
    return { ok: false, data: {}, err: error };
  }
};

const editDriveData = async ({ contentId, data, toDelete }) => {
  try {
    const response = await dataModel.updateOne({
      filter: {
        _id: new ObjectId(contentId),
      },
      update: {
        $set: {
          data,
          isDeleted: toDelete || false,
        },
      },
    });

    if (!response) {
      return {
        ok: false,
        data: {},
        err: "Something went wrong!! we are looking into it...",
      };
    }
    return { ok: true, data: response, err: "" };
  } catch (error) {
    return { ok: false, data: {}, err: error };
  }
};

const getDriveDataByUser = async ({ userId, typeOfData }) => {
  try {
    const response = await dataModel.findByUserId({
      query: { userId, typeOfData },
    });
    if (!response) {
      return {
        ok: false,
        data: {},
        err: "Something went wrong!! we are looking into it...",
      };
    }
    return { ok: true, data: response, err: "" };
  } catch (error) {
    return { ok: false, data: {}, err: error };
  }
};

module.exports = {
  storeDriveData,
  getDriveDataByUser,
  editDriveData,
};
