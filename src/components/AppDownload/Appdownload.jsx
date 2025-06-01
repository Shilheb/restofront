import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <h2>Get Our Mobile App</h2>
            <p>Download our app for the best food ordering experience. <br />Available on iOS and Android platforms.</p>
            <div className="app-download-platforms">
                <a href="#" aria-label="Download on Google Play Store">
                    <img src={assets.play_store} alt="Download on Google Play Store" />
                </a>
                <a href="#" aria-label="Download on Apple App Store">
                    <img src={assets.app_store} alt="Download on Apple App Store" />
                </a>
            </div>
        </div>
    )
}

export default AppDownload