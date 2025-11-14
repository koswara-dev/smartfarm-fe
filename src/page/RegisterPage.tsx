import React from 'react'
import Header from '../components/landingpage/Header' // Assuming Header component exists
import Footer from '../components/landingpage/Footer' // Assuming Footer component exists
import RegisterForm from '../components/forms/RegisterForm'

const RegisterPage: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-10 px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
          <RegisterForm />
          {/* Right Side – Info Panel / Branding */}
          <div className="md:w-1/2 bg-green-600 p-8 md:p-12 flex flex-col justify-center items-center text-white text-center">
            <img
              src="https://img.icons8.com/?size=200&id=d5JdSpnMGlcN&format=png&color=000000"
              alt="Dashboard Sensor"
              className="rounded-lg shadow-md mb-8 max-w-full h-auto"
            />
            <h3 className="text-2xl font-bold mb-4">
              Monitor kondisi lahan secara real-time dengan teknologi IoT.
            </h3>
            <p className="text-lg">
              Optimalkan irigasi dan nutrisi untuk hasil panen maksimal.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default RegisterPage
