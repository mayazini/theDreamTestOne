import React from 'react'
import './../style.css';
import developer from ".././images/developer.jpeg";
import dreamer from ".././images/dreamer.jpeg";
import user from ".././images/user.jpeg";
function home() {
  return (
    <div>
      
      <section className="txtArea">
      <div class="left-column">
      <h2>who do you want to be?</h2>
      <p>to be apart of this project you can either create, DEVELOP, or be a consumer. all of those "jobs" are essential to making this project succeed. be a part of a revolution that can help you live your life the way you want.</p>
      </div>
      <div class="right-column">
      <img src={developer} alt="developer img" className="img"/>
      <img src={dreamer} alt="dreamer img" className="img"/>
      <img src={user} alt="user img" className="img"/>
      </div> 
      </section>
    </div>
  )
}

export default home
