import "../globals.css";
import { Toaster } from "react-hot-toast";
import { Poppins, Montserrat } from "next/font/google";
export default function LayoutAdmin({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex w-screen min-h-screen">
          <div className="bg-url relative hidden w-1/2 lg:block bg-[url('/assets/images/bg-auth.avif')] h-screen bg-cover bg-center lg:block hidden"></div>

          <div className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2">
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </div>
      </body>
    </html>
  );
}
