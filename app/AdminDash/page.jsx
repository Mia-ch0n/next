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
import DelUser from"../../components/DelUser"
import EditUser from"../../components/EditUser"
import {
  ChartBarSquareIcon,
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
    name: "Create Challenge",
    href: "/CreateChallenge",
    icon: PuzzlePieceIcon,
    current: false,
  },
  { name: "Profile", href: "UserProfile", icon: Cog6ToothIcon, current: false },
];
const secondaryNavigation = [
  { name: "Overview", href: "#", current: true },
  { name: "Settings", href: "#", current: false },
  { name: "Create Challenge", href: "#", current: false },
  { name: "Notifications", href: "#", current: false },
];
const stats = [
  { name: "Number of active users", value: "20" },
  { name: "Total number of question posted", value: "20" },
  { name: "Total number of question answered", value: "10" },
  { name: "most active team", value: "web" },
];
const userNavigation = [
  { name: "Your profile", href: "/UserProfile" },
  { name: "Sign out", onClick: signOut },
];

// const activityItems = [
//   {
//     // user: {
//     //   name: "Michael Foster",
//     //   imageUrl:
//     //     "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     // },
//     commit: "10",
//     branch: "answers",
//     status: "4",
//     ups: "20",
//     downs: "20",
//   },
// ];


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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
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
              <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8 mt-10">
                <div>
                  <div className="flex items-center gap-x-3">
                    <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                    
                    {userInfo && (
                    <h1 className="flex gap-x-3 text-base leading-7 ">
                      <span className="font-semibold text-grey">
                      {userInfo.cetegory}Manager Dashboard
                      </span>
                    </h1>
                  )}
                  </div>
                  
                  {userInfo && (
                  <p className="mt-2 text-xs leading-6 text-gray-400">
                    Hey <span className="text-gray-900">{userInfo.fullName}</span> u can track user s activity here
                  </p>
                  )}
                </div>
                <div className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none ">
                  <button onClick={toggleModal}>Add User</button>
                </div>
              </div>
              {showModal && <AddUser onClose={toggleModal} />}
              {/* Stats */}
              <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
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
                    <p className="text-sm font-medium leading-6 text-gray-400">
                      {stat.name}
                    </p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                      <span className="text-4xl font-semibold tracking-tight text-grey">
                        {stat.value}
                      </span>
                      {stat.unit ? (
                        <span className="text-sm text-gray-400">
                          {stat.unit}
                        </span>
                      ) : null}
                    </p>
                  </div>
                ))}
              </div>
            </header>

            {/* Activity list */}
            <div className="border-t border-grey/10 pt-11">
              <h2 className="px-4 text-base font-semibold leading-7 text-grey sm:px-6 lg:px-8">
                Latest activity
              </h2>
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
                      UPs
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                    >
                      Downs
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grey/5">
                {users.map((user, index) => {
                  // const activityItem = activityItems.find(item => item.userId === user._id);
                  return (
                    <tr key={user._id}>
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
                          <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                            <div className="flex gap-x-3">
                              <div className="font-mono text-sm leading-6 text-gray-400">
                      {/*activityItem.commit*/}
                              </div>
                        
                                {/*activityItem.branch*/}
                           
                            </div>
                          </td>
                          <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                              <div
                                // className={classNames(
                                //   statuses[activityItem.status],
                                //   "flex-none rounded-full p-1"
                                // )}
                              >
                                <div className="h-1.5 w-1.5 " />
                              </div>
                              <div className="hidden text-grey sm:block">
                                {/*activityItem.status*/}
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                            {/*activityItem.ups*/}
                          </td>
                          <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                            {/*activityItem.downs*/}
                          </td>
                        </>
                      
                        <>
                          <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8"></td>
                          <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20"></td>
                          <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20"></td>
                          <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20"></td>
                        </>
                      
                      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-8">
                        <DelUser id={user._id} />
                      </td>
                      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                        <EditUser userData={user} />
                      </td>
                    </tr>
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
