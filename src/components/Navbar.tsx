import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "./Navlink";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-100 hover:bg-emerald-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 sm:items-stretch px-6 sm:justify-between">
                <NavLink href="/">Home</NavLink>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <NavLink href="/anime">Vote Anime</NavLink>
                    <NavLink href="/character">Vote Character</NavLink>
                    <NavLink href="/anime-results">Anime Results</NavLink>
                    <NavLink href="/character-results">
                      Character Results
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col space-y-1 px-2 pt-2 pb-3">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/anime">Vote Anime</NavLink>
              <NavLink href="/character">Vote Character</NavLink>
              <NavLink href="/anime-results">Anime Results</NavLink>
              <NavLink href="/character-results">Character Results</NavLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
