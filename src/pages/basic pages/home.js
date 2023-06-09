import React, { useContext } from 'react';
import './../../style.css';
import developer from "../.././images/developer.jpeg";
import dreamer from "../.././images/dreamer.png";
import consumer from "../.././images/consumer.jpeg";

function Home() {

  return (
    <div className="content-wrapper">
      <section className="txtArea">
      <div class="left-column">
      <h1>who do you want to be?</h1>
      <p>To be apart of this project you can either create, DEVELOP, or be a consumer. all of those "jobs" are essential to making this project succeed. be a part of a revolution that can help you live your life the way you want.</p>
      </div>
      <div class="right-column">
      <img src={developer} alt="developer img" className="img"/>
      <img src={dreamer} alt="dreamer img" className="img"/>
      <img src={consumer} alt="consumer img" className="img"/>
      </div> 
      </section>
    </div>
  )
}

export default Home
