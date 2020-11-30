import React from 'react'
import { Link } from 'react-router-dom'
import { useShopState } from '../../pages/shop/context'

export const SubMenuCart = () => {
    const { cart } = useShopState()

    if (cart.length > 0) {
        return (
            <>
                <div className='R-Sidebar-Gamelist' style={{ height: 'auto' }}>
                    <h3 className='globalHeader Primary-Header Tertiary-Background'>Cart:</h3>
                    {cart.map((item, i) => (
                        <Link key={i} to={`/shop/page/${item._id}`}>
                            <div className='gamelist-Games' style={{ height: 'auto' }}>
                                <ul style={{ margin: '0', padding: '0' }}>
                                    <li className='banner' style={{ backgroundImage: `url(${item.banner})`, margin: '0', padding: '0' }}>
                                        <div className='banner-Film'>
                                            <p style={{ fontSize: '20px', height: 'auto', textAlign: 'center' }}>{item.name}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    ))}
                </div>
                <li>
                    <Link to='/shop/cart' className='Secondary-Header'>
                        Go To Cart
                    </Link>
                </li>
            </>
        )
    } else {
        return null
    }
}
