import React from 'react';
import { useForm } from 'react-hook-form';
import loginillu from '../../assets/Images/loginillus.png';

type FormValues = {
    email: string;
    password: string;
};


const LogInRHF: React.FC = () => {
    const {  register,
        handleSubmit,
        formState: { errors },
        watch,
        setError, } = useForm<FormValues>();

    const onSubmit = (data: any) => {
        // Handle form submission here
        console.log(data); // This will log the form data on submission
    };

    console.log("Errors:", errors);

    return (
        <div className="py-16">
           
            <form onSubmit={handleSubmit(onSubmit)}>
               
                <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
        id="email"
        {...register("email", {
          required: "Email addres must be required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        })}
        type="email" placeholder="Info@example.com" className="mt-2 outline  outline-1 border-l-4 border-pink-600 outline-blue-500 focus:ring-2 h-12 w-full rounded-md bg-gray-100 px-3" 
      />
       {errors.email && <div className="bg-red-200 px-4 py-2 mx-2 mt-2 rounded-md text-sm flex items-center mx-auto max-w-lg">
        <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path fill="currentColor"
                d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
            </path>
        </svg>
        <span className="text-red-800">{errors.email.message}</span>
    </div> }
                </div>
                {/* Password */}
                <div className="mt-4">
                    <div className="flex justify-between">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <a href="#" className="text-xs text-gray-500">Forgot Password?</a>
                    </div>
                    <input
        id="password"
        {...register("password", {
          required: "required",
          minLength: {
            value: 5,
            message: "min length is 5",
          },
          pattern: {
            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
            message:
                'Password should include at least one capital letter, one special character, and one number',
        },
        })}
        type="password" placeholder="enter your oassword" className="mt-2 outline  outline-1 border-l-4 border-pink-600 outline-blue-500 focus:ring-2 h-12 w-full rounded-md bg-gray-100 px-3"
      />
      {errors.password &&<div className="bg-red-200 px-4 py-2 mx-2 mt-2 rounded-md text-sm flex items-center mx-auto max-w-lg">
        <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path fill="currentColor"
                d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
            </path>
        </svg>
        <span className="text-red-800">{errors.password.message}</span>
    </div> }
                </div>
                {/* Login Button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                    >
                        Login
                    </button>
                </div>
            </form>
            {/* Your existing code */}
        </div>
    );
};

export default LogInRHF;