import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='container mt-4'>
        <div>
          <h3>Login Now</h3>
          <Link to="/login" className='btn btn-primary'>Login</Link>
        </div>
    </div>
  )
}

export default Home
