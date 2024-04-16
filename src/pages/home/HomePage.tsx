import NavigationBar from './../../components/NavigationBar';
import './HomePage.css'

function HomePage(){
  return (
    <div className='HomePage'>
      <NavigationBar />
      <div className="Page">
        <div className="Introduction">
          <h1>Gerencie seu orçamento<br /> de maneira<br /> eficaz.</h1>
          <h6>O aplicativo fornece um plano de orçamento<br /> pessoal e informa quanto você pode gastar hoje.</h6>
          <div className="Login">
          <form action="" method="">
            <input id='Login' type="text" placeholder='Seu endereço de email'/>
            <input id='Submit' type="submit" value="Entrar"/>
          </form>
        </div>
        </div>
        <div className="Figure">
          <img src="src/assets/001.svg" alt="" />
        </div>
      </div>
      <div className="Github">
        <a href="https://github.com/GabrieldbSouza/Personal-Finance-Management.git" target="_blank" rel="noopener noreferrer">
          <img src="src/assets/github-mark.svg" alt="" />
        </a>
      </div>
    </div>
  )
}

export default HomePage