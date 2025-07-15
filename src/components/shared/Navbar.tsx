import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

  // const NavItems = [
  //   {
  //     name: "Home",
  //     path: '/'
  //   },
  //   {
  //     name: "Books",
  //     path: '/books'
  //   },
  //   {
  //     name: "BooksSummary",
  //     path: '/booksSummary'
  //   },
  // ]

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm lg:px-28">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {" "}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{" "}
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  `text-2xl ml-4 font-bold ${isActive
                    ? "bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-700 bg-clip-text text-transparent"
                    : ""
                  }`
                }
              >
                Books
              </NavLink>

              <NavLink
                to={'/addBooks'}
                className={({ isActive }) =>
                  `text-2xl ml-4 font-bold ${isActive
                    ? "bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-700 bg-clip-text text-transparent"
                    : ""
                  }`
                }
              >
                AddBooks
              </NavLink>

              <NavLink
                to={'/booksSummery'}
                className={({ isActive }) =>
                  `text-2xl ml-4 font-bold ${isActive
                    ? "bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-700 bg-clip-text text-transparent"
                    : ""
                  }`
                }
              >
                BooksSummary
              </NavLink>

            </ul>
          </div>
          <Link
            to={'/'}
            className="bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-700 bg-clip-text text-transparent font-bold lg:text-2xl"
          >
            Library Management System
          </Link>


        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                `text-2xl ml-4 font-bold ${isActive
                  ? "bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-700 bg-clip-text text-transparent"
                  : ""
                }`
              }
            >
              Books
            </NavLink>

            <NavLink
              to={'/addBooks'}
              className={({ isActive }) =>
                `text-2xl ml-4 font-bold ${isActive
                  ? "bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-700 bg-clip-text text-transparent"
                  : ""
                }`
              }
            >
              AddBooks
            </NavLink>

            <NavLink
              to={'/booksSummery'}
              className={({ isActive }) =>
                `text-2xl ml-4 font-bold ${isActive
                  ? "bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-700 bg-clip-text text-transparent"
                  : ""
                }`
              }
            >
              Borrow Summary
            </NavLink>


          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
