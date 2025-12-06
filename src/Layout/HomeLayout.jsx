import React from 'react';
import Navber from '../components/Navber';
import BannerSlider from '../components/BannerSlider';
import WhyChoose from '../components/WhyChoose';

const HomeLayout = () => {
    return (
        <div>

            <Navber></Navber>
            <BannerSlider></BannerSlider>
            <WhyChoose></WhyChoose>
        </div>
    );
};

export default HomeLayout;