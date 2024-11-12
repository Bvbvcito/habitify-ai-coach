const uiTests = () =>{
    return(

        <>
        <div className="bg-orange-500 text-white py-4 md:hidden shadow-md px-2">Mobile Nav</div>
        <div className="w-full h-screen p-3 flex flex-row gap-2">

        <nav className="bg-slate-300 w-[200px] rounded-xl h-full shadow-md p-2 md:block hidden ">
            <ul>
                <li>Home</li>
                <li>habits</li>
                <li>Settings</li>
                <li>Logout</li>
            </ul>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
        <div className="h-full w-full bg-slate-200 flex rounded-xl items-center justify-center">
            <span>Content</span>
        </div>
        <div className="h-full w-full flex items-center justify-center bg-slate-200 rounded-xl">Content</div>
        </div>
        </div>
        </>
    )
}

export default uiTests