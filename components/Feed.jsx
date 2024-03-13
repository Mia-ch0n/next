'use client';
const posts = [
  {
    id: 1,
    title: 'Next js routing ',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
    date: 'Mar 4, 2024',
    datetime: '2020-03-16',
    category: { title: 'WEB DEV', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Web developer',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 1,
    title: 'Next js routing ',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
    date: 'Mar 4, 2024',
    datetime: '2020-03-16',
    category: { title: 'WEB DEV', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Web developer',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 1,
    title: 'Next js routing ',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
    date: 'Mar 4, 2024',
    datetime: '2020-03-16',
    category: { title: 'WEB DEV', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Web developer',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },

]
import { Fragment, useState } from 'react'
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'

const activity = [
  { id: 1, type: 'created', person: { name: 'Chelsea Hagon' }, date: '7d ago', dateTime: '2023-01-23T10:32' },
  { id: 2, type: 'edited', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:03' },
  { id: 3, type: 'sent', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:24' },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  { id: 5, type: 'viewed', person: { name: 'Alex Curren' }, date: '2d ago', dateTime: '2023-01-24T09:12' },
  { id: 6, type: 'paid', person: { name: 'Alex Curren' }, date: '1d ago', dateTime: '2023-01-24T09:20' },
]
const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Feed = () => {
  const [selected, setSelected] = useState(moods[5])

  return (
    <>
    
 
      <div className=" py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
                <ul role="list" className="space-y-6">
        {activity.map((activityItem, activityItemIdx) => (
          <li key={activityItem.id} className="relative flex gap-x-4">
            <div
              className={classNames(
                activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
                'absolute left-0 top-0 flex w-6 justify-center'
              )}
            >
              <div className="w-px bg-gray-200" />
            </div>
            {activityItem.type === 'commented' ? (
              <>
                <img
                  src={activityItem.person.imageUrl}
                  alt=""
                  className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                />
                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                  <div className="flex justify-between gap-x-4">
                    <div className="py-0.5 text-xs leading-5 text-gray-500">
                      <span className="font-medium text-gray-900">{activityItem.person.name}</span> commented
                    </div>
                    <time dateTime={activityItem.dateTime} className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                      {activityItem.date}
                    </time>
                  </div>
                  <p className="text-sm leading-6 text-gray-500">{activityItem.comment}</p>
                </div>
                     {/* New comment form */}
      <div className="mt-6 flex gap-x-3">
      <img
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
        className="h-6 w-6 flex-none rounded-full bg-gray-50"
      />
      <form action="#" className="relative flex-auto">
        <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <textarea
            rows={2}
            name="comment"
            id="comment"
            className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Add your comment..."
            defaultValue={''}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex items-center space-x-5">
            <div className="flex items-center">
              <button
                type="button"
                className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
              >
                <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Attach a file</span>
              </button>
            </div>
            <div className="flex items-center">
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="sr-only">Your mood</Listbox.Label>
                    <div className="relative">
                      <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                        <span className="flex items-center justify-center">
                          {selected.value === null ? (
                            <span>
                              <FaceSmileIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                              <span className="sr-only">Add your mood</span>
                            </span>
                          ) : (
                            <span>
                              <span
                                className={classNames(
                                  selected.bgColor,
                                  'flex h-8 w-8 items-center justify-center rounded-full'
                                )}
                              >
                                <selected.icon className="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                              </span>
                              <span className="sr-only">{selected.name}</span>
                            </span>
                          )}
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute bottom-10 z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                          {moods.map((mood) => (
                            <Listbox.Option
                              key={mood.value}
                              className={({ active }) =>
                                classNames(
                                  active ? 'bg-gray-100' : 'bg-white',
                                  'relative cursor-default select-none px-3 py-2'
                                )
                              }
                              value={mood}
                            >
                              <div className="flex items-center">
                                <div
                                  className={classNames(
                                    mood.bgColor,
                                    'flex h-8 w-8 items-center justify-center rounded-full'
                                  )}
                                >
                                  <mood.icon
                                    className={classNames(mood.iconColor, 'h-5 w-5 flex-shrink-0')}
                                    aria-hidden="true"
                                  />
                                </div>
                                <span className="ml-3 block truncate font-medium">{mood.name}</span>
                              </div>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          </div>
          <button
            type="submit"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Comment
          </button>
        </div>
      </form>
    </div>
              </>
            ) : (
              <>
                
              </>
            )}
          </li>
        ))}
      </ul>
              </article>
              
            ))}
            
          </div>
        </div>
      </div>
 
    </>
  )
}
export default Feed;
