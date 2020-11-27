import React from 'react'
import { SearchComponent } from '../../components/browser/Search'

export const Search = () => {
    return (
        <div className='search'>
            <SearchComponent type={'profile'} />
            <SearchComponent type={'servers'} />
        </div>
    )
}
