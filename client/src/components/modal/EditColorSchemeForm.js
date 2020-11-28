import React, { useState } from 'react'
import { useProfileDispatch, editScheme } from '../../pages/profile/context'
import { useAuthDispatch, useAuthState, reloadUser } from '../../pages/authentication/context'

export const EditColorSchemeForm = () => {
    const profileDispatch = useProfileDispatch()
    const authDispatch = useAuthDispatch()
    const { user } = useAuthState()

    const [scheme, setScheme] = useState({
        background: '',
        primaryHeader: '',
        secondaryHeader: '',
        tertiaryHeader: '',
        outLine: '',
        secondaryOutline: '',
        activeOutline: '',
        primaryBackground: '',
        secondaryBackground: '',
        tertiaryBackground: '',
    })

    const {
        background,
        primaryHeader,
        secondaryHeader,
        tertiaryHeader,
        outLine,
        secondaryOutline,
        activeOutline,
        primaryBackground,
        secondaryBackground,
        tertiaryBackground,
    } = scheme

    const onChange = (e) => setScheme({ ...scheme, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        editScheme(profileDispatch, scheme)
        setTimeout(function task() {
            reloadUser(authDispatch, user._id)
        }, 1000)

        setScheme({
            background: '',
            primaryHeader: '',
            secondaryHeader: '',
            tertiaryHeader: '',
            outLine: '',
            secondaryOutline: '',
            activeOutline: '',
            primaryBackground: '',
            secondaryBackground: '',
            tertiaryBackground: '',
        })
        //window.location.reload(false)
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='Primary-Header'>Edit Theme</h2>
            <input type='url' placeholder='Set Background Picture' name='background' value={background} onChange={onChange} />
            <input type='text' placeholder='Set Primary Header Color (Use Hex Code)' name='primaryHeader' value={primaryHeader} onChange={onChange} />
            <input type='text' placeholder='Set Secondary Header Color (Use Hex Code)' name='secondaryHeader' value={secondaryHeader} onChange={onChange} />
            <input type='text' placeholder='Set Tertiary Header Color (Use Hex Code)' name='tertiaryHeader' value={tertiaryHeader} onChange={onChange} />
            <input type='text' placeholder='Set Outline Color (Use Hex Code)' name='outLine' value={outLine} onChange={onChange} />
            <input type='text' placeholder='Set Secondary Outline (Use Hex Code)' name='secondaryOutline' value={secondaryOutline} onChange={onChange} />
            <input type='text' placeholder='Set Active Outline (Use Hex Code)' name='activeOutline' value={activeOutline} onChange={onChange} />
            <input
                type='text'
                placeholder='Set Primary Background Color (Use Hex Code)'
                name='primaryBackground'
                value={primaryBackground}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Set Secondary Background Color (Use Hex Code)'
                name='secondaryBackground'
                value={secondaryBackground}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Set Tertiary Background Color (Use Hex Code)'
                name='tertiaryBackground'
                value={tertiaryBackground}
                onChange={onChange}
            />

            <div>
                <input className='GeneralHeaders globalbutton' type='submit' value='Save Changes' style={{ width: '99%' }} />
            </div>
        </form>
    )
}
