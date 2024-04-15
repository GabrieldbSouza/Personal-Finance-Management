import '../static/NavigationBar.css' 

function NavigationBar() {
  return (
    <div className='NavigationBar'>
      <div className="Logo">
        <button id='Logo'>Personal Finance Management</button>
      </div>
      <div className='BtnAccount'>
        <button id='Connect'>Connect</button>
        <button id='Account'>My Account</button> 
      </div>
    </div>
  )
}

export default NavigationBar