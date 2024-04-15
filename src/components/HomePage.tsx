import NavigationBar from './NavigationBar';
import '../static/HomePage.css' 

function HomePgae(){
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
    </div>
  )
}

export default HomePgae