
const Socials =()=> {
  return (
    <section className="py-12 md:py-16 lg:py-10 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
      <div className="container px-4 md:px-3 text-center text-white">
        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-3xl lg:text-4xl tracking-tight">Get to know more about us!</h1>
          <div className="flex justify-center space-x-4">
            <a className="text-white hover:text-gray-200 transition-colors" href="#">
              <TwitterIcon className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a className="text-white hover:text-gray-200 transition-colors" href="#">
              <FacebookIcon className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a className="text-white hover:text-gray-200 transition-colors" href="#">
              <InstagramIcon className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a className="text-white hover:text-gray-200 transition-colors" href="#">
              <aedinIcon className="h-6 w-6" />
              <span className="sr-only">aedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}
export default Socials;

function aedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}