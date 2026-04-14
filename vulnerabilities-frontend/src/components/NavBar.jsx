export default function NavBar({onLogout, user}) {
    return <div className="navbar bg-base-100 sticky top-0 z-50 shadow-sm">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">Безпечна соцмережа</a>
        </div>

        <div className="flex-none">

            <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-accent">
                    <span className="text-sm font-medium">{user?.username}</span>
                </button>
                <ul
                    tabIndex={-1}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a onClick={() => onLogout()}>Log out</a></li>
                </ul>
            </div>
        </div>
    </div>
}