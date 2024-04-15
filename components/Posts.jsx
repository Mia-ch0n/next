import Comment from './Comment'
const posts = [
  {
    id: 1,
    title: 'Next js routing',
    href: '',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      role: 'Web developer ',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]
export default function Example() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className=" border-t border-gray-200 pt-10 sm:mt-10 sm:pt-16">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col items-start justify-between rounded-lg  mb-6  ">
                <div className="group relative">
                  <h3 className="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600 ">
                    <a href={post.href}>
                      <span className="absolute inset-0 " />
                      {post.title}
                    </a>
                  </h3>
                  <div className="flex items-center gap-x-4 text-sm mt-2">
                    <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time>
                    <a
                      href={post.href}
                      className="relative z-10 rounded-full  px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 "
                    >
                      {post.title}
                    </a>
                  </div>
                  <p className="mt-5 line-clamp-3 text-xl leading-6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 mb-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600 ">{post.author.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <Comment />
        </div>
      </div>

    </div>
  )
}
