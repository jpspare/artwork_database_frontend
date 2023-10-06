import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginButton from '../auth/LoginButton'
import LogoutButton from '../auth/LogoutButton'

function Navbar() {

    const [isVisible, setIsVisible] = useState(false)
    const dropDown = () => {setIsVisible(!isVisible)}
    const clicked = () => {setIsVisible(false)}
    const { isAuthenticated } = useAuth0();


    return (
        <nav className='bg-slate-50 border-b border-slate-200 absolute top-0 
            left-0 right-0 z-10'
        >
            <div className='max-w-screen-xl flex flex-wrap justify-between 
                mx-auto h-16'
            >
                <Link to='/' className='flex items-center ps-4'>
                    <span className='self-center text-2xl'>
                        gallery + database
                    </span>
                </Link>
                <button 
                    onClick={ dropDown } 
                    className="fixed top-3 right-3 inline-flex items-center w-10 
                        h-10 justify-center md:hidden"
                >
                    <i className='fas fa-bars'></i>
                </button>
                <div className={`${isVisible ? "" : "hidden"} md:flex md:w-auto 
                    md:h-full md:items-end md:pe-4`}
                >
                    <ul className={`font-extralight flex space-x-2 sm:space-x-8 
                        pt-4 mt-4 md:p-0 md:flex-row md:mt-0 md:border-0 whitespace-nowrap
                        ${ isVisible ? 
                        ("absolute -translate-x-80 sm:-translate-x-[22rem] translate-y-8"): 
                        ("")}`}
                    >
                        <li>
                            <Link to='/' onClick={ clicked } 
                                className='hover:underline'
                            >
                                home
                            </Link>
                        </li>
                        <li>
                            <Link to='/about' onClick={ clicked } 
                                className='hover:underline'
                            >
                                about
                            </Link>
                        </li>
                        <li>
                            <Link to='/search' onClick={ clicked } 
                                className='hover:underline'
                            >
                                search
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard' onClick={ clicked } 
                                className='hover:underline'
                            >
                                database
                            </Link>
                        </li>
                        <li>
                            {isAuthenticated? (<LogoutButton />):(<LoginButton /> )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )  
}

export default Navbar