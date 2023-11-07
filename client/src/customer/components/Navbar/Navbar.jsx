import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "@mantine/core/styles.css";
import Profile from "./Avatar";
import AuthModal from "../../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Action";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1598554793905-075f7b355cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1512310604669-443f26c35f52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1934&q=80",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Top", label: "womenTop" },
            { name: "T-shirt", label: "womenT-shirt" },
            { name: "Pants", label: "womenPant" },
            { name: "Sweaters", label: "womenSweaters" },
            { name: "Hoodies", label: "womenHoodies" },
            { name: "Jackets", label: "womenJackets" },
            { name: "Active wear", label: "womenActiveWear" },
            { name: "Casual wear", label: "womenCasualWear" },
            { name: "Formal wear", label: "womenFormalWear" },
            { name: "Business casual", label: "womenBusinessCasual" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Shoes", label: "shoes" },
            { name: "Scarves", label: "scarves" },
            { name: "Hats", label: "hat" },
            { name: "Belts", label: "womenBelts" },
            { name: "Socks", label: "womenSocks" },
            { name: "Gloves", label: "gloves" },
            { name: "Ties", label: "ties" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Zara", label: "zara" },
            { name: "H&M", label: "hnm" },
            { name: "Calvin Klein", label: "calvinKlein" },
            { name: "Gap", label: "gap" },
            { name: "Tommy Hilfiger", label: "tommyHilfiger" },
            { name: "Express", label: "express" },
            { name: "Levi's", label: "levis" },
            { name: "PUMA", label: "puma" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1598106755735-3ebfced1d38b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://images.unsplash.com/photo-1636573563446-5cd9479b75ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Shirt", label: "manShirt" },
            { name: "T-shirt", label: "manT-shirt" },
            { name: "Pants", label: "manPant" },
            { name: "Sweaters", label: "manSweaters" },
            { name: "Hoodies", label: "manHoodies" },
            { name: "Jackets", label: "manJackets" },
            { name: "Active wear", label: "manActiveWear" },
            { name: "Casual wear", label: "manCasualWear" },
            { name: "Formal wear", label: "manFormalWear" },
            { name: "Business casual", label: "manBusinessCasual" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Shoes", label: "shoes" },
            { name: "Scarves", label: "scarves" },
            { name: "Hats", label: "hat" },
            { name: "Belts", label: "manBelts" },
            { name: "Socks", label: "manSocks" },
            { name: "Gloves", label: "gloves" },
            { name: "Ties", label: "ties" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Zara", label: "zara" },
            { name: "H&M", label: "hnm" },
            { name: "Calvin Klein", label: "calvinKlein" },
            { name: "Gap", label: "gap" },
            { name: "Tommy Hilfiger", label: "tommyHilfiger" },
            { name: "Express", label: "express" },
            { name: "Levi's", label: "levis" },
            { name: "PUMA", label: "puma" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Active wear", label: "manActiveWear" },
    { name: "Casual wear", label: "manCasualWear" },
  ],
};

const messages = [
  "Buy One, Get One Free on All Orders Over $300",
  "New Arrivals - Shop Now!",
  "Limited Time Offer - Don't Miss Out!",
  // Add more messages here
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((store) => store?.auth);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleMenuClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCategoryClick = (category, section, item) => {
    handleMenuClose();
    navigate(`/${category.id}/${section.id}/${item.label}`);
  };

  const handleCategory = (category, section, item) => {
    handleMenuClose();
    navigate(`/${category}/${section}/${item}`);
  };

  const handleCartClick = () => {
    navigate("/cart");
    handleMenuClose();
  };

  const handleMyOrder = () => {
    navigate("/account/order");
    handleMenuClose();
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  return (
    <div className="bg-[#031020]">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-[#031020] pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-white"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-[#2b65b6] text-[#2b65b6]"
                                : "border-transparent text-white",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-[#031020]group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-500"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1 text-white">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-500"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    onClick={() =>
                                      handleCategoryClick(
                                        category,
                                        section,
                                        item
                                      )
                                    }
                                    href={item.href}
                                    className="-m-2 block p-2 text-white"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-white"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="border-t text-white border-gray-200 px-4 py-6">
                  {auth.jwt?.firstName ? (
                    <div className="space-y-6 ">
                      <p>{`${auth.jwt?.firstName} ${auth.jwt?.lastName}`}</p>
                      <p onClick={handleCartClick}>My Cart</p>
                      <p onClick={handleMyOrder}>My Order</p>
                      <p onClick={()=>navigate("/product/recentlyViewed")}>Recent</p>
                      <p onClick={()=>navigate("/product/wishlist")}>Wishlist</p>
                      <p onClick={handleLogout}>Logout</p>
                      {auth?.jwt?.role === "ADMIN" ? (
                        <p onClick={() => navigate("/admin")}>Admin Panel</p>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div>
                      <p onClick={handleOpen}>Login</p>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-[#031020]">
        <p className="flex h-10 items-center justify-center bg-[#2b65b6] duration-300 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          {messages[currentMessageIndex]}
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-[#031020] p-2 text-white lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Benalave</span>
                  <img className="h-8 w-auto" src={logo} alt="" />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-40">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-[#2b65b6] text-white"
                                  : "border-transparent text-white hover:text-[#2b65b6]",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-white">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-[#031020] shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-[#031020]">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-[#031020] group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-500"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-500"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <a
                                                  onClick={() =>
                                                    handleCategoryClick(
                                                      category,
                                                      section,
                                                      item
                                                    )
                                                  }
                                                  href={item.href}
                                                  className="hover:text-[#2b65b6]"
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-white hover:text-[#2b65b6]"
                      onClick={() =>
                        handleCategory(
                          page.name,
                          page.name,
                          page.label
                        )
                      }
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.jwt?.firstName ? (
                    <div className=" cursor-pointer">
                      <Profile
                        userInitials={auth.jwt?.firstName[0].toUpperCase()}
                        close={handleMenuClose}
                        fullName={auth.jwt?.firstName}
                      />
                    </div>
                  ) : (
                    <div className=" text-white hover:text-[#2b65b6] cursor-pointer">
                      <p onClick={handleOpen}>Login</p>
                    </div>
                  )}
                </div>

                {/* Search */}
                <div className="flex ml-3 lg:ml-6 relative">
                  <a
                    className=" text-white hover:text-[#2b65b6]"
                    onClick={toggleSearch}
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                  {isSearchOpen && (
                    <div className="absolute top-0 right-0 mt-12 w-60 bg-white border shadow-lg">
                      {/* Search form */}
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full p-2 focus:outline-none"
                        />
                    </div>
                  )}
                </div>

                {/* Cart */}
                <div className="ml-4 lg:ml-6 cursor-pointer hidden md:block">
                  <p className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      onClick={handleCartClick}
                      className="h-6 w-6 flex-shrink-0 text-white group-hover:text-[#2b65b6]"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-white group-hover:text-[#2b65b6]">
                      
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal
        close={handleClose}
        menuClose={handleMenuClose}
        opened={openAuthModal}
      />
    </div>
  );
};

export default Navbar;
