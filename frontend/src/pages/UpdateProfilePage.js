import React, {useContext} from "react";
import UserProfileForm from "../components/UserProfileForm/UserProfileForm";
import { userContext } from "../context/context";


export default function UpdateProfilePage() {
  const auth = useContext(userContext)

  // Mock existing profile data
  const mockProfileData = {
    username: auth.user.username? auth.user.username:"john_doe",
    email: auth.user.email? auth.user.email:"john@example.com",
    profilePictureUrl: "https://via.placeholder.com/150",
    personalInfo: "Software engineer with a passion for web development.",
    contactInfo: "123-456-7890",
  };

  const handleUpdateProfile = (updatedData) => {
    console.log("Profile Updated:", updatedData);
    // API call to update the profile
  };

  return (
    <div>
      <UserProfileForm
        initialData={mockProfileData}
        onSubmit={handleUpdateProfile}
        buttonText="Update Profile"
      />
    </div>
  );
}
