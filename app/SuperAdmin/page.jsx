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
import { Cog6ToothIcon, SignalIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const navigation = [
  {
    name: "Dashboard",
    href: "/AdminDash",
    icon: SignalIcon,
    current: false,
  },
  
];

const userNavigation = [

  { name: "Sign out", onClick: signOut },
];
const statuses = {
  Completed: "text-green-400 bg-green-400/10",
  Error: "text-rose-400 bg-rose-400/10",
};

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
      <div className="block w-screen ">
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

          {showModal && <AddUser onClose={toggleModal} />}
          <div className="">
            <div className="border-t border-grey/10 ">
              <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8 mt-10">
                <div>
                  <div className="flex items-center gap-x-3">
                    <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>

                    {userInfo && (
                      <h1 className="flex gap-x-3 text-base leading-7 ">
                        <span className="font-semibold text-grey">
                          Super Admin Dashboard
                        </span>
                      </h1>
                    )}
                  </div>

                  {userInfo && (
                    <p className="mt-2 text-xs leading-6 text-gray-400">
                      Hey{" "}
                      <span className="text-gray-900">{userInfo.fullName}</span>{" "}
                      u can add managers here
                    </p>
                  )}
                </div>
                <div className="flex items-end justify-end">
                  <button
                    className=" mx-10 mt-4 bg-gray-700 text-white rounded-full pt-2 pb-2 px-4 font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900 hover:text-white "
                    onClick={toggleModal}
                  >
                    Add Team Manager
                  </button>
                </div>
              </div>
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
                      className=" py-2 pl-4 pr-8 font-semibold sm:table-cell lg:pl-8"
                    >
                      Job
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grey/5 ">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="py-4 pl-4 sm:pl-6 ">
                        <div className="flex items-center gap-x-4">
                          <img
                            src={user.profilePic}
                            alt={user.fullName}
                            className="h-8 w-8 rounded-full bg-gray-800"
                          />
                          <div className="truncate text-sm font-medium leading-6 text-gray-800">
                            {user.fullName}
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                        <div className="flex gap-x-3">
                          <div className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                          {user.isAdmin ? `${user.category} manager` : user.job}
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-800 md:table-cell lg:pr-8">
                        <div className="flex items-center justify-center gap-x-2">
                          <DelUser id={user._id} />
                          <EditUser userData={user} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
