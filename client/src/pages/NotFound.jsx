import React from 'react'
import error from '../assets/404.png'

const NotFound = () => {
  return (
    <section className="py-20 mt-20">
    <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
            <div className="text-center w-1/2">
                <img className="w-full mx-auto" src={error} />
            </div>
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
                <p className="text-lg text-gray-500">
                    Page not found. Looks like it pulled a disappearing act. We're on
                    it, but in the meantime, consider it our website's way of playing
                    hide and seek!
                </p>
            </div>
        </div>
    </div>
</section>
  );
}

export default NotFound