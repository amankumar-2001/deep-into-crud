const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { ObjectId } = require("mongodb");
const {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} = require("firebase/storage");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../src/config/firebase.config");
const { DateTime } = require("luxon");
dotenv.config();

const addUser = async ({ name, email, password }) => {
  const user = await userModel.findOne({ query: { email } });
  if (user) {
    return { ok: false, err: "Email already in use!!" };
  }

  const encrypt = await bcrypt.hash(password, 10);

  const response = await userModel.insert({
    insertDict: { firstName: name, email, password: encrypt },
  });

  if (!response) {
    return {
      ok: false,
      err: "Something went wrong!! we are looking into it...",
    };
  }

  return {
    ok: true,
    data: {
      name: response.firstName,
      email: response.email,
      userId: response._id,
    },
  };
};

const getUserByEmailIdAndPassword = async ({ email, password }) => {
  const response = await userModel.findOne({
    query: { email },
  });

  if (!response) {
    return { ok: false, err: "User does not exist!!" };
  }

  const authenticate = bcrypt.compareSync(password, response.password);

  if (!authenticate) {
    return { ok: false, err: "Wrong Password!!" };
  }

  const token = jwt.sign(
    { email: response.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  if (!token) {
    return {
      ok: false,
      err: "Something went wrong!! we are looking into it...",
    };
  }

  return {
    ok: true,
    data: {
      token,
      firstName: response?.firstName,
      lastName: response?.lastName,
      email: response.email,
      userId: response._id,
      profileImage: response?.profileImage || "",
    },
  };
};

const editProfile = async ({
  userId,
  firstName,
  lastName,
  email,
  prevEmail,
  password,
  prevPassword,
  profileImage,
}) => {
  const user = await userModel.findOne({ query: { email: prevEmail } });

  const authenticate = bcrypt.compareSync(prevPassword, user.password);

  if (!authenticate) {
    return { ok: false, err: "Wrong Password!!" };
  }

  let encrypt = null;
  if (password) {
    encrypt = await bcrypt.hash(password, 10);
  }

  let imageUrl = "";
  if (profileImage) {
    const storageFB = getStorage();
    await signInWithEmailAndPassword(
      auth,
      process.env.FIREBASE_USER,
      process.env.FIREBASE_AUTH
    );

    const dateTime = DateTime.now();

    const storageRef = ref(
      storageFB,
      `${userId}/${dateTime + profileImage.originalname}`
    );
    const snapshot = await uploadBytesResumable(
      storageRef,
      profileImage.buffer,
      {
        contentType: profileImage.mimetype,
      }
    );

    if (!snapshot) {
      return {
        ok: false,
        err: "Something went wrong!! we are looking into it...",
      };
    }
    imageUrl = await getDownloadURL(snapshot.ref);
  }

  const response = await userModel.updateOne({
    filter: {
      _id: new ObjectId(userId),
    },
    update: {
      $set: {
        firstName,
        lastName,
        email,
        ...(password ? { password: encrypt } : {}),
        ...(profileImage ? { profileImage: imageUrl } : {}),
      },
    },
  });

  if (!response) {
    return {
      ok: false,
      err: "Something went wrong!! we are looking into it...",
    };
  }

  const updatedUser = await userModel.findOne({ query: { email } });

  return {
    ok: true,
    data: {
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      userId,
      profileImage: updatedUser.profileImage,
    },
  };
};

module.exports = {
  addUser,
  getUserByEmailIdAndPassword,
  editProfile,
};
