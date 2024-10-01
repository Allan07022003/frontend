import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, RefreshCw } from "lucide-react";

interface HeaderProps {
  title: string;
  leftButtonText: string;
  leftButtonHref: string;
  rightButtonText?: string;
  rightButtonHref?: string;
  primaryColor?: string;
  secondaryColor?: string;
  showArrow?: boolean;
  showResetButton?: boolean; 
  onReset?: () => void; 
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftButtonText,
  leftButtonHref,
  rightButtonText,
  rightButtonHref,
  primaryColor = "from-blue-400 to-purple-500",
  secondaryColor = "bg-yellow-400 hover:bg-yellow-300",
  showArrow = true,
  showResetButton = false, 
  onReset, 
}) => {
  return (
    <header
      className={`bg-gradient-to-r ${primaryColor} p-2 sm:p-3 md:p-5 lg:p-6 fixed top-0 left-0 w-full z-10`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Botón izquierdo */}
        <Link
          to={leftButtonHref}
          className={`group flex items-center space-x-2 ${secondaryColor} text-primary-800 px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-md`}
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 group-hover:animate-bounce" />
          <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold group-hover:underline">
            {leftButtonText}
          </span>
        </Link>

        {/* Título central */}
        <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-white text-center bg-opacity-70 bg-primary-500 px-3 py-1 rounded-lg">
          {title}
        </h1>

        <div className="flex items-center space-x-2">
        {showResetButton && (
  <button
    onClick={onReset}
    className="flex items-center gap-1 bg-green-500 text-white py-1 px-2 sm:px-2 sm:py-1 md:px-3 md:py-1 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 text-xs md:text-sm"
    style={{ marginLeft: 'auto' }}  
  >
    <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
  </button>
)}
          {rightButtonText && (
            <Link
              to={rightButtonHref || "/"}
              className={`group flex items-center space-x-2 ${secondaryColor} text-primary-800 px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-md`}
            >
              {showArrow && (
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 group-hover:animate-bounce" />
              )}
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold group-hover:underline">
                {rightButtonText}
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
