import {useState} from 'react'

const Signup = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    })

  const handleChange = (e)=> {
    const {name, value} = e.target
    setUserData({...userData, [name]: value})
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    const {name, email, password} = userData
    console.log(userData)
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form action="#!">
          <FormInput
            label="Name"
            type="text"
            name="name"
            id="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="name"
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="email"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="password"
          />
          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
            <a
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormInput = ({ label, type, name, id, placeholder, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default Signup;
