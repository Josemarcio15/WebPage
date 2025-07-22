import React, { useEffect, useRef } from 'react';
import banner1 from '../assets/banner1.jpeg';
import banner2 from '../assets/banner2.jpeg';
import banner3 from '../assets/banner3.jpeg';
import banner4 from '../assets/banner4.jpeg';
import banner5 from '../assets/banner5.jpeg';
import banner6 from '../assets/banner6.jpeg';
import banner7 from '../assets/banner7.jpeg';
import TopBar from '../components/TopBar';

const Home: React.FC = () => {
  const imagens = [banner1, banner2, banner3, banner4, banner5, banner6, banner7];
  const carrosselRef = useRef<HTMLDivElement | null>(null);
  let index = 0;

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (carrosselRef.current && carrosselRef.current.firstElementChild) {
        index = (index + 1) % imagens.length;
        const larguraImagem =
          (carrosselRef.current.firstElementChild as HTMLElement).offsetWidth + 10; // largura + margin

        carrosselRef.current.scrollTo({
          left: index * larguraImagem,
          behavior: 'smooth',
        });
      }
    }, 3000);

    return () => clearInterval(intervalo);
  }, [imagens.length]);

  return (
    <div>
      <TopBar />

      <div className="carrossel" ref={carrosselRef}>
        {imagens.map((img, i) => (
          <img key={i} src={img} alt={`Banner ${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Home;
