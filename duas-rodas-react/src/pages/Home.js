import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from '../assets/banner1.jpeg';
import banner2 from '../assets/banner2.jpeg';
import banner3 from '../assets/banner3.jpeg';
import banner4 from '../assets/banner4.jpeg';
import TopBar from '../components/TopBar.js';

function Home() {
    const imagens = [banner1, banner2, banner3, banner4];

    const settings = {
        dots: true,           // mostra os pontinhos de navegação
        infinite: true,       // carrossel infinito
        speed: 500,           // velocidade da transição (ms)
        slidesToShow: 1,      // mostra 1 imagem por vez
        slidesToScroll: 1,    // rola 1 slide por vez
        autoplay: true,       // rolar automaticamente
        autoplaySpeed: 3000,  // tempo entre slides

    };

    return (
        <div>
            <TopBar />

            <div style={{ marginTop: '70px' }}> {/* para não ficar embaixo da topbar */}
                <Slider {...settings}>
                    {imagens.map((img, i) => (
                        <div key={i}>
                            <img
                                src={img}
                                alt={`Banner ${i + 1}`}
                                style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Home;
