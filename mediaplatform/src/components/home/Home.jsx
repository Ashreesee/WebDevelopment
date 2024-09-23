import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import video from '../../assets/videos/hhh.mp4'; // Adjust path as needed

const Home = () => {
  const cardsData = [
    { id: 1, title: "Card 1", description: "This is the first card.", imageUrl: "path_to_image_4.jpg", },
    { id: 2, title: "Card 2", description: "This is the second card.", imageUrl: "path_to_image_4.jpg", },
    { id: 3, title: "Card 3", description: "This is the third card.", imageUrl: "path_to_image_4.jpg", },
    { id: 4, title: "Card 4", description: "This is the fourth card.", imageUrl: "path_to_image_4.jpg", },
  ];
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="Home-container">
      <video autoPlay loop muted className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="main-content">
        <h1 className="text-animation">Welcome to Our Platform!</h1>
        <p className="text-animation">Discover, stream, and share a constantly expanding mix of music from around the world.</p>
      </div>
      <section className="home-section">
      <div className="cards-container">
        {cardsData.map((card) => (
          <div key={card.id} className="card">
            <div className="card-image-container">
              <img src={card.imageUrl} alt={card.title} className="card-image" />
            </div>
            <div className="card-content">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default Home;
