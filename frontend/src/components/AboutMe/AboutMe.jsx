
const AboutMe = ({ user }) => {

  return (
    <div className='container'>
      <h3>ABOUT ME</h3>
      <br />
      <p>{user.aboutMe}</p>
    </div>
  );
};

export default AboutMe;
