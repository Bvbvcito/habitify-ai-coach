const NavBar = () => {
    return(
        <nav className="max-w-6xl rounded-[35px] mt-10 bg-orange-600 px-10 shadow-sm justify-between flex mx-auto py-3  items-center">
        <div>Logo</div>
        <ul className="bg-orange-700 p-[2px] rounded-full flex gap-7 shadow-inner text-white items-center">
          <li className="bg-white rounded-full text-orange-600 font-bold px-4 py-2">Dashboard</li>
          <li className="px-4 py-2">Habits</li>
          <li className="px-4 py-2">About Us</li>
          <li className="px-4 py-2">Contact</li>
        </ul>
        <div>Profile</div>
      </nav>
    )
}

export default NavBar