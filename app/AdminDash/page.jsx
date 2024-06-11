"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import AddUser from "../../components/AddUser";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import DelUser from "../../components/DelUser";
import EditUser from "../../components/EditUser";
import MagicButton from "../../components/MagicButtton";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@components/Text-Generate";
import { CiCircleQuestion } from "react-icons/ci";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { MdPerson } from "react-icons/md";
import {
  Cog6ToothIcon,
  PuzzlePieceIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const navigation = [
  {
    name: "User s Activity",
    href: "/AdminDash",
    icon: SignalIcon,
    current: false,
  },

  {
    name: "Profile",
    href: "/AdminProfile",
    icon: Cog6ToothIcon,
    current: false,
  },
];
const secondaryNavigation = [
  { name: "Overview", href: "AdminDash", current: true },
  { name: "Profile", href: "/AdminProfile", current: false },
];

const userNavigation = [
  { name: "Your profile", href: "/AdminProfile" },
  { name: "Sign out", onClick: signOut },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSignOut = async () => {
    const data = await signOut({ redirect: false });

    if (!data.error) {
      window.location.href = "/signIn";
    } else {
      console.error("Error signing out:", data.error);
    }
  };
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  const [userInfo, setUserInfo] = useState(null);
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
  console.log("yousri = ",session)
  const [users, setUsers] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [mostActiveTeam, setMostActiveTeam] = useState(null);
  const [mostActiveUser, setMostActiveUser] = useState(null);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts", {
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);

          let totalComments = 0;
          data.posts.forEach((post) => {
            totalComments += post.comments.length;
          });
          setCommentCount(totalComments);

          setPostCount(data.posts.length);
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          const filteredUsers = data.users.filter(
            (user) => user.email !== session.user.email
          );
          setUsers(filteredUsers);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (session) fetchUsers();
  }, [session]);


  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts", {
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
          setPostCount(data.posts.length);
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts", {
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);

          // Count total number of comments
          let totalComments = 0;
          data.posts.forEach((post) => {
            totalComments += post.comments.length;
          });
          setCommentCount(totalComments);

          setPostCount(data.posts.length);
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  const filteredUsers = users.filter((user) => {
    const userJob = user.job?.toLowerCase();
    const userCategory = userInfo?.category?.toLowerCase();
    return userJob && userCategory ? userJob.includes(userCategory) : false;
  });

  const questionCountByUser = posts.reduce((acc, post) => {
    if (!acc[post.author._id]) {
      acc[post.author._id] = 1;
    } else {
      acc[post.author._id]++;
    }
    return acc;
  }, {});

  const commentCountByUser = posts.reduce((acc, post) => {
    post.comments.forEach((comment) => {
      if (!acc[comment.author._id]) {
        acc[comment.author._id] = 1;
      } else {
        acc[comment.author._id]++;
      }
    });
    return acc;
  }, {});
  const calculatePoints = (posts) => {
    let pointsByUser = {};

    posts.forEach((post) => {
      // Add points for posts
      if (!pointsByUser[post.author._id]) {
        pointsByUser[post.author._id] = 1;
      } else {
        pointsByUser[post.author._id]++;
      }

      // Add points for comments
      post.comments.forEach((comment) => {
        if (!pointsByUser[comment.author._id]) {
          pointsByUser[comment.author._id] = 2;
        } else {
          pointsByUser[comment.author._id] += 2;
        }

        // Add points for likes on comments
        if (Array.isArray(comment.likes)) {
          comment.likes.forEach((like) => {
            if (!pointsByUser[comment.author._id]) {
              pointsByUser[comment.author._id] = 3;
            } else {
              pointsByUser[comment.author._id] += 3;
            }
          });
        }
      });
    });

    return pointsByUser;
  };

  // Find the user with the maximum points
  useEffect(() => {
    // Calculate points earned by each user
    const userPoints = calculatePoints(posts);

    // Find the user with the maximum points if userPoints is not empty
    if (Object.keys(userPoints).length > 0) {
      const maxPointsUserId = Object.keys(userPoints).reduce((a, b) =>
        userPoints[a] > userPoints[b] ? a : b
      );
      const mostActiveUser = users.find((user) => user._id === maxPointsUserId);
      setMostActiveUser(mostActiveUser);
    } else {
      // If no posts are available, set mostActiveUser to null
      setMostActiveUser(null);
    }
  }, [posts, users]);

  const stats = [
    {
      name: "Total number of question posted",
      value: postCount,
      icon: <CiCircleQuestion color="gray" size={20} />,
    },
    {
      name: "Total number of answers",
      value: commentCount,
      icon: <MdOutlineQuestionAnswer color="gray" size={20} />,
    },
    {
      name: "Most active team",
      value: mostActiveUser ? mostActiveUser.job : "none",
      icon: <RiTeamFill color="gray" size={20} />,
    },
    {
      name: "Most active user",
      value: mostActiveUser ? mostActiveUser.fullName : "none",
      icon: <MdPerson color="gray" size={20} />,
    },
  ];
  const userPoints = calculatePoints(posts);
  const handleUserDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };
  const handleUserAdd = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setShowModal(false);
  };
  const handleEditUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
  };

  return (
    <>
      <div className="block w-screen">
        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-grey/5">
            <div className="flex h-16 shrink-0 items-center">
              <Link href="/" className="flex gap-2 flex-center">
                <img
                  className="h-8 w-auto"
                  src="/assets/images/mobelitee.png?color=indigo&shade=500"
                  alt=""
                />
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-grey"
                              : "text-gray-400 hover:text-gray hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          {/* Sticky search header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-grey/5 bg-gray-800 px-4 shadow-sm sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-grey xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 ">
              <form className="flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-grey focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            {userInfo && (
              <Menu as="div" className="relative">
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src={userInfo.profilePic}
                    alt=""
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="ml-4 text-sm font-semibold leading-6 text-gray-400"
                      aria-hidden="true"
                    >
                      {userInfo.fullName}
                    </span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            {item.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>

          <div className="">
            <header>
              {/* Secondary navigation */}
              <nav className="flex overflow-x-auto border-b border-grey/10 py-4">
                <ul
                  role="list"
                  className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                >
                  {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={item.current ? "text-indigo-400" : ""}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Heading */}
              <div className="flex flex-col rounded-2xl mx-5 items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8 mt-10">
                <div>
                  <div className="flex items-center gap-x-3">
                    <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>

                    {userInfo && (
                      <h1 className="flex gap-x-3 text-base leading-7">
                        <TextGenerateEffect
                          words={`${userInfo.category} Manager Dashboard`}
                        />
                      </h1>
                    )}
                  </div>

                  {userInfo && (
                    <p className="mt-2 text-xs leading-6 text-gray-400 ">
                      Hey{" "}
                      <span className="text-gray-900 ">
                        {userInfo.fullName}
                      </span>{" "}
                      u can manage collaborators here and track their activity
                    </p>
                  )}
                </div>
                <div className="">
                  <MagicButton
                    text={"Add Collaborator"}
                    onClick={toggleModal}
                  />
                </div>
              </div>
              {showModal && (
                <AddUser onClose={toggleModal} onAdd={handleUserAdd} />
              )}
              {/* Stats */}
              <div className="grid grid-cols-1 rounded-2xl mx-5 mt-4 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, statIdx) => (
                  <div
                    key={stat.name}
                    className={classNames(
                      statIdx % 2 === 1
                        ? "sm:border-l"
                        : statIdx === 2
                        ? "lg:border-l"
                        : "",
                      "border-t border-grey/5 py-6 px-4 sm:px-6 lg:px-8"
                    )}
                  >
                    <p className="text-sm font-medium leading-6 text-gray-400 flex justify-start items-center gap-3">
                      {stat.icon}
                      {stat.name}
                    </p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                      {stat.name === "Total number of question posted" ? (
                        <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4}} className="text-3xl font-semibold tracking-tight text-grey">
                          {postCount}
                        </motion.span>
                      ) : (
                        <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }} className="text-3xl font-semibold tracking-tight text-grey">
                          {stat.value}
                        </motion.span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </header>

            {/* Activity list */}
            <div className="border-t border-grey/10 pt-11">
              {userInfo && (
                <h2 className="px-4 text-base font-semibold leading-7 text-grey sm:px-6 lg:px-8">
                  List of {userInfo.category} collaborators
                </h2>
              )}
              <table className="mt-6 w-full greyspace-nowrap text-left">
                <colgroup>
                  <col className="w-full sm:w-4/12" />
                  <col className="lg:w-4/12" />
                  <col className="lg:w-2/12" />
                  <col className="lg:w-1/12" />
                  <col className="lg:w-1/12" />
                </colgroup>
                <thead className="border-b border-grey/10 text-sm leading-6 text-gray">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                    >
                      Questions answered
                    </th>
                    <th
                      scope="col"
                      className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                    >
                      Posts
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                    >
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grey/5">
                  {filteredUsers.map((user, i) => {
                    // const activityItem = activityItems.find(item => item.userId === user._id);
                    return (
                      <motion.tr
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 * i }}
                        key={user._id}
                      >
                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                          <div className="flex items-center gap-x-4">
                            <img
                              src={user.profilePic}
                              alt={user.fullName}
                              className="h-8 w-8 rounded-full bg-gray-800"
                            />
                            <div className="truncate text-sm font-medium leading-6 text-grey">
                              {user.fullName}
                            </div>
                          </div>
                        </td>

                        <>
                          <td className="py-4 pl-0 pr-4 text-sm font-medium leading-6 sm:pr-8 lg:pr-20">
                            <div className="flex gap-x-3">
                              {commentCountByUser[user._id] || 0}
                            </div>
                          </td>
                          <td className="py-4 pl-0 pr-4 text-sm font-medium leading-6 sm:pr-8 lg:pr-20">
                            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                              <div>
                                {questionCountByUser[user._id] || 0}
                                <div className="h-1.5 w-1.5 " />
                              </div>
                            </div>
                          </td>

                          <td className="hidden py-4 pl-0 pr-8 text-sm font-medium leading-6 text-gray-900 md:table-cell lg:pr-20">
                            {userPoints[user._id] || 0}
                          </td>
                        </>

                        <>
                          <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8"></td>
                          <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20"></td>
                          <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20"></td>
                          <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20"></td>
                        </>

                        <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-8">
                          <DelUser id={user._id} onDelete={handleUserDelete} />
                        </td>
                        <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                          <EditUser userData={user} onEdit={handleEditUser} />
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
