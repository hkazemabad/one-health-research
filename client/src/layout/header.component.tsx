import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { useNavigate, useLocation } from 'react-router-dom';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import oneHealthLogo from '../assets/logo-n1h.png';

import './header.component.scss';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [loginVisible, setLoginVisible] = useState(false);

    const baseItems: MenuItem[] = [
        {
            label: 'Visualization',
            icon: 'pi pi-chart-bar',
            items: [
                {
                    // icon: 'pi pi-compass',
                    label: 'Neighborhood Explorer',
                    command: () => {
                        navigate('/neighborhood-explorer');
                    },
                },
                {
                    // icon: 'fa fa-circle-nodes',
                    label: 'Co-occurrences Search',
                    command: () => {
                        navigate('/visualization/co-occurrence-search/');
                    },
                },
            ],
        },
        {
            label: 'Contribute',
            icon: 'pi pi-sitemap',
            items: [
                // {
                //     label: 'Overview',
                //     command: () => {
                //         navigate('/ontology/overview/');
                //     }
                //     // icon: 'pi pi-chart-bar'
                // },
                {
                    label: 'New Entity Type',
                    command: () => {
                        navigate('/entity-type-form');
                    },
                    // icon: 'pi pi-box'
                },
                {
                    label: 'New Link Type',
                    command: () => {
                        navigate('/link-type-form');
                    },
                    // icon: 'pi pi-arrows-h'
                },
                {
                    label: 'Data Load',
                    command: () => {
                        navigate('/ontology/data-load/0');
                    },
                },
            ],
        },
        // {
        //     label: 'Documentation',
        //     icon: 'pi pi-book',
        //     command: () => {
        //         navigate('/documentation');
        //     },
        // },
        // {
        //     label: 'Legal Information',
        //     icon: 'pi pi-exclamation-triangle',
        //     command: () => {
        //         navigate('/legal');
        //     },
        // },

        // {
        //     label: 'Contact',
        //     icon: 'pi pi-envelope',
        //     command: () => {
        //         navigate('/test');
        //     }
        // }
        {
            label: 'Login',
            icon: 'pi pi-sign-in',
            command: () => {
                setLoginVisible(true);
            },
        },
    ];

    const items: MenuItem[] = [...baseItems];

    if (location.pathname !== '/') {
        items.unshift({
            label: 'General Search',
            icon: 'pi pi-search',
            command: () => navigate('/'),
        });
    }

    const handleLogin = () => {
        console.log('Login clicked');

        // later:
        // call backend login API here

        setLoginVisible(false);
    };

    const start = (
        <div
            className="col"
            style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <a href="/">
                <img
                    alt="logo"
                    src={oneHealthLogo}
                    height="40"
                    style={{ marginLeft: 20 }}
                    className="mr-2"
                />
            </a>
            <p style={{ fontSize: '16px', color: '#a40', margin: 0 }}>
                This service is <strong>work in progress</strong>, layout and
                function are subject to change.
            </p>
        </div>
    );

    return (
        <div className="fluid fixed-top">
            <Menubar
                model={items}
                start={start}
                pt={{
                    start: {
                        style: { marginRight: 'auto' }
                    },
                }}
            />
            <Dialog
                header="Login"
                visible={loginVisible}
                style={{ width: '25rem' }}
                modal
                onHide={() => setLoginVisible(false)}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <span className="p-float-label">
                        <InputText
                            id="username"
                            className="w-full"
                        />
                        <label htmlFor="username">
                            Username
                        </label>
                    </span>

                    <span className="p-float-label">
                        <Password
                            id="password"
                            feedback={false}
                            toggleMask
                            className="w-full"
                            inputClassName="w-full"
                        />
                        <label htmlFor="password">
                            Password
                        </label>
                    </span>

                    <Button
                        label="Login"
                        icon="pi pi-sign-in"
                        onClick={handleLogin}
                    />
                </div>
            </Dialog>

        </div>
    );
};

export default Header;
