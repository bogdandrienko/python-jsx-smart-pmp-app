import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <div>
                <nav className="nav nav-pills nav-fill nav-dark">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Активный</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Ссылка</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Ссылка</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Отключено</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Header
