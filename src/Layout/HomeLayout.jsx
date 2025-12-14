import React from 'react';

import BannerSlider from '../components/BannerSlider';
import WhyChoose from '../components/WhyChoose';
import HowItWorks from '../components/HowItWorks';
import TopWriter from '../components/TopWriter';
import CoverageMap from '../components/CoverageMap';
import Navber from '../components/Navber';
import LatestBooks from '../components/LatestBooks';
import Footer from '../components/Footer';


const HomeLayout = () => {
    return (
        <div>

            <Navber></Navber>
            <BannerSlider></BannerSlider>
            <LatestBooks></LatestBooks>
            <HowItWorks></HowItWorks>
            <TopWriter></TopWriter>
            <CoverageMap></CoverageMap>
            <WhyChoose></WhyChoose>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;