import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";

// Configure Cloudinary (assuming you're using it for image uploads)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const editProfileController = catchAsyncErrors(async (req, res, next) => {
  const { firstName, email } = req.body;
  const userId = req.user.id;

  // Fetch the current user from the database
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Ensure the submitted firstName and email match the logged-in user's data
  if (user.firstName !== firstName || user.email !== email) {
    return next(
      new ErrorHandler("First name or email does not match the logged-in user", 400)
    );
  }

  // Handle profile photo update if a new photo is uploaded
  if (req.files && req.files.profilePhoto) {
    const result = await cloudinary.v2.uploader.upload(req.files.profilePhoto.tempFilePath, {
      folder: "profile_photos",
    });

    // Update user's profile photo URL in the database
    user.profilePhoto = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  // Update other fields (e.g., name, email) in the user object
  user.firstName = firstName;
  user.email = email;

  // Save the updated user back to the database
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});
