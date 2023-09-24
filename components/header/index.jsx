import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container container-fluid">
          <Link className="navbar-brand" href="/">
            NEWS PORTAL
          </Link>
          <div className="">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href="/admin-panel"
                >
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          <div style={{ width: "350px" }}>
            {router.pathname === "/" && (
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  SEARCH
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
