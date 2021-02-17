import React from 'react'
import { SearchComponent } from '../../components/browser/Search'

import './Search.css'

export const Search = () => {
    return (
        <div className='search'>
            <SearchComponent type={'profile'} />
            <SearchComponent type={'servers'} />
        </div>
    )
}
