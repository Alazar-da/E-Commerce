import React from 'react'

function Navbar() {
  return (
    <section>
        <nav className="w-full container bg-slate-200 py-2">
            <div className="flex justify-center items-center">
                <ul className="flex justify-between w-1/3">
                    <li className="nav-item">
                        <a className="hover:font-semibold hover:text-slate-950" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="hover:font-semibold hover:text-slate-950" href="/cart">Cart</a>
                    </li>
                    <li className="nav-item">
                        <a className="hover:font-semibold hover:text-slate-950" href="/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>

    </section>
  )
}

export default Navbar