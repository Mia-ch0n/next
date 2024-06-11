'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [fullName, setFullName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const { data: session } = useSession();

 useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email }),
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data.user);
        setFullName(data.user.fullName);
        setProfilePic(data.user.profilePic);
      } else {
        console.error("Failed to fetch user information");
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  if (session) {
    fetchUserInfo();
  }
}, [session]);

const handleProfileSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log("Updating profile with data:", { email: session.user.email, fullName });
    const response = await fetch(`/api/create/${userInfo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        fullName,
      }),
    });

    if (response.ok) {
      console.log("Profile updated successfully");
      alert('Profile updated successfully');
    } else {
      console.error("Failed to update profile");
      alert('Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};


  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    try {
      const response = await fetch(`/api/create/${userInfo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        alert('Password updated successfully');
      } else {
        const errorData = await response.json();
        alert(`Failed to update password: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`/api/create/${userInfo._id}`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setProfilePic(`/uploads/${data.filename}`);
         
        } else {
          const errorData = await response.json();
          alert(`Failed to update profile picture: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error updating profile picture:', error);
      }
    }
  };



  return (
    <>
      <div>
        <div className="xl:pl-72">
          <main>
            <div className="divide-y divide-gray/5">
              <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    You can change your info here.
                  </p>
                </div>

                <form className="md:col-span-2" onSubmit={handleProfileSubmit}>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    {userInfo && (
                      <div className="col-span-full flex items-center gap-x-8">
                        <img
                          src={profilePic}
                          alt=""
                          className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                        />
                        <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="profilePicInput"
                        />
                        <label
                          htmlFor="profilePicInput"
                          className="rounded-md bg-gray/10 px-3 py-2 text-sm font-semibold text-gray border border-gray shadow-sm hover:bg-gray-300 cursor-pointer"
                        >
                          Change avatar
                        </label>
                        <p className="mt-2 text-xs leading-5 text-gray-400">
                          JPG, GIF or PNG.
                        </p>
                      </div>
                      </div>
                    )}
                    <div className="col-span-full">
                      <label
                        htmlFor="full-name"
                        className="block text-sm font-medium leading-6 text-gray"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="full-name"
                          id="full-name"
                          autoComplete="given-name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray">
                    Change password
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Update your password associated with your account.
                  </p>
                </div>

                <form className="md:col-span-2" onSubmit={handlePasswordSubmit}>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="current-password"
                        className="block text-sm font-medium leading-6 text-gray "
                      >
                        Current password
                      </label>
                      <div className="mt-2 bg-white">
                        <input
                          id="current-password"
                          name="current_password"
                          type="password"
                          autoComplete="current-password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium leading-6 text-gray "
                      >
                        New password
                      </label>
                      <div className="mt-2">
                        <input
                          id="new-password"
                          name="new_password"
                          type="password"
                          autoComplete="new-password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium leading-6 text-gray "
                      >
                        Confirm password
                      </label>
                      <div className="mt-2">
                        <input
                          id="confirm-password"
                          name="confirm_password"
                          type="password"
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Update password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
