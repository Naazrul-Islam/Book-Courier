import React from 'react';

import BannerSlider from '../components/BannerSlider';
import WhyChoose from '../components/WhyChoose';
import HowItWorks from '../components/HowItWorks';
import TopWriter from '../components/TopWriter';
import CoverageMap from '../components/CoverageMap';
import Navber from '../components/Navber';


const HomeLayout = () => {
    return (
        <div>

            <Navber></Navber>
            <BannerSlider></BannerSlider>
            <HowItWorks></HowItWorks>
            <TopWriter></TopWriter>
            <CoverageMap></CoverageMap>
            <WhyChoose></WhyChoose>
        </div>
    );
};

export default HomeLayout;