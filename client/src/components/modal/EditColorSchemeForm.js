import React, { useState } from 'react'
import { useProfileDispatch, editScheme } from '../../pages/profile/context'
import { useAuthDispatch, useAuthState, reloadUser, logout } from '../../pages/authentication/context'
import { SketchPicker } from 'react-color'
export const EditColorSchemeForm = () => {
    const authDispatch = useAuthDispatch()
    const profileDispatch = useProfileDispatch()
    const { user } = useAuthState()

    const [hex, setHex] = useState()
    const [type, setType] = useState()

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
        // primaryHeader,
        // secondaryHeader,
        // tertiaryHeader,
        // outLine,
        // secondaryOutline,
        // activeOutline,
        // primaryBackground,
        // secondaryBackground,
        // tertiaryBackground,
    } = scheme

    const onChange = (e) => setScheme({ ...scheme, [e.target.name]: e.target.value })

    function resetColors() {
        setScheme({
            background: '',
            primaryHeader: '#66FCF1',
            secondaryHeader: '#C5C6C7',
            tertiaryHeader: '#FFFFFF',
            outLine: '#384d48',
            secondaryOutline: '#45A29E',
            activeOutline: '#66FCF1',
            primaryBackground: '#000411',
            secondaryBackground: '#384d48',
            tertiaryBackground: '#000000',
        })
    }

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

    const handleChange = (e) => {
        setHex(e)

        if (type === 'primaryHeader') {
            setScheme({ ...scheme, primaryHeader: `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})` })
        } else if (type === 'secondaryHeader') {
            setScheme({ ...scheme, secondaryHeader: `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})` })
        } else if (type === 'tertiaryHeader') {
            setScheme({ ...scheme, tertiaryHeader: `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})` })
        } else if (type === 'outLine') {
            setScheme({ ...scheme, outLine: `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})` })
        } else if (type === 'secondaryOutline') {
            setScheme({ ...scheme, secondaryOutline: `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})` })
        } else if (type === 'activeOutline') {
            setScheme({ ...scheme, activeOutline: `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})` })
        } else if (type === 'primaryBackground') {
            setScheme({ ...scheme, primaryBackground: `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})` })
        } else if (type === 'secondaryBackground') {
            setScheme({ ...scheme, secondaryBackground: `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})` })
        } else if (type === 'tertiaryBackground') {
            setScheme({ ...scheme, tertiaryBackground: `rgb(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})` })
        }
    }

    return (
        <form style={{ overflow: 'hidden' }} onSubmit={onSubmit}>
            <h2 className='Primary-Header'>Edit Theme</h2>
            <div className='color-PickerGrid'>
                <div>
                    <SketchPicker color={hex} onChange={handleChange} disableAlpha={false} style={{ height: 'auto' }} />
                </div>

                <ul>
                    <li onClick={() => setType('primaryHeader')} className={type === 'primaryHeader' ? 'color-Options2' : 'color-Options'}>
                        <h4 className='Primary-Header Tertiary-Background' style={{ height: 'auto' }}>
                            <span className='Tertiary-Background'>Primary Header</span>
                        </h4>
                    </li>
                    <li onClick={() => setType('secondaryHeader')} className={type === 'secondaryHeader' ? 'color-Options2' : 'color-Options'}>
                        <h4 className='Primary-Header Tertiary-Background' style={{ height: 'auto' }}>
                            <span className='Tertiary-Background'> Secondary Header</span>
                        </h4>
                    </li>
                    <li onClick={() => setType('tertiaryHeader')} className={type === 'tertiaryHeader' ? 'color-Options2' : 'color-Options'}>
                        <h4 className='Primary-Header Tertiary-Background' style={{ height: 'auto' }}>
                            <span className='Tertiary-Background'>Tertiary Header</span>
                        </h4>
                    </li>
                    <li onClick={() => setType('outLine')} className={type === 'outLine' ? 'color-Options2' : 'color-Options'}>
                        <h4 className='Primary-Header Tertiary-Background' style={{ height: 'auto' }}>
                            <span className='Tertiary-Background'>Outline</span>
                        </h4>
                    </li>
                    <li onClick={() => setType('secondaryOutline')} className={type === 'secondaryOutline' ? 'color-Options2' : 'color-Options'}>
                        <h4 className='Primary-Header Tertiary-Background' style={{ height: 'auto' }}>
                            <span className='Tertiary-Background'> Secondary Outline</span>
                        </h4>
                    </li>
                    <li onClick={() => setType('activeOutline')} className={type === 'activeOutline' ? 'color-Options2' : 'color-Options'}>
                        <h4 className='Primary-Header Tertiary-Background' style={{ height: 'auto' }}>
                            <span className='Tertiary-Background'> Active Outline</span>
                        </h4>
                    </li>
                    <li onClick={() => setType('primaryBackground')} className={type === 'primaryBackground' ? 'color-Options2' : 'color-Options'}>
                        <h4 className='Primary-Header Tertiary-Background' style={{ height: 'auto' }}>
                            <span className='Tertiary-Background'> Primary Background</span>
                        </h4>
                    </li>
                    <li onClick={() => setType('secondaryBackground')} className={type === 'secondaryBackground' ? 'color-Options2' : 'color-Options'}>
                        <h4 className='Primary-Header Tertiary-Background' style={{ height: 'auto' }}>
                            <span className='Tertiary-Background'>Secondary Background</span>
                        </h4>
                    </li>
                    <li onClick={() => setType('tertiaryBackground')} className={type === 'tertiaryBackground' ? 'color-Options2' : 'color-Options'}>
                        <h4 className='Primary-Header Tertiary-Background' style={{ height: 'auto' }}>
                            <span className='Tertiary-Background'> Tertiary Background</span>
                        </h4>
                    </li>
                </ul>
            </div>
            <input type='url' placeholder='Set Background Picture' name='background' value={background} onChange={onChange} style={{ width: '99%' }} />
            <div>
                <input className='GeneralHeaders globalbutton' type='submit' value='Save Changes' style={{ width: '99%' }} />
                <input className='GeneralHeaders globalbutton' onClick={() => resetColors()} type='submit' value='Reset Colors' style={{ width: '99%' }} />
                <input
                    className='GeneralHeaders globalbutton'
                    onClick={() => logout(authDispatch)}
                    type='submit'
                    value='Logout'
                    style={{ width: '99%', color: 'red' }}
                />
            </div>
        </form>
    )
}
