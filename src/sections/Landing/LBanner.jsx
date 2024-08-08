import LogoBanner from "../../assets/Landing/LogoBanner.svg";
import Ellipse from "../../assets/Landing/Ellipse.svg";
import MacBook from "../../assets/Landing/MacBook.svg";
import Samsung from "../../assets/Landing/Samsung.svg";
import MockupHeader from "../../assets/Landing/MockupHeader.svg";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

export default function LBanner() {
  const containerVariants = {
    hover: {
      rotate: 0, // Establece la rotación inicial del contenedor
    },
  };

  const macbookVariants = {
    initial: { rotate: 0, x: 0, y: 0, scale: 1 },
    hover: {
      x: -10,
      y: -20,
      scale: 1.05,
      rotate: -3,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    exit: {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.0, // Mayor duración para la animación de salida
        ease: "easeInOut",
      },
    },
  };

  const samsungVariants = {
    initial: { rotate: 0, x: 0, y: 0, scale: 1 },
    hover: {
      x: 20,
      y: -20,
      scale: 1.05,
      rotate: 3,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    exit: {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.0, // Mayor duración para la animación de salida
        ease: "easeInOut",
      },
    },
  };

  return (
    <header className="flex sm:flex-row flex-col w-full justify-center items-center sm:gap-0 gap-8 sm:pt-0 py-8">
      <div className="flex flex-col items-center max-w-[538px] px-[34px] w-full">
        <div className="flex flex-col gap-6 items-center">
          <div className="sm:max-w-[220px] max-w-[148px] w-full">
            <img className="w-full" src={LogoBanner} alt="Logo" />
          </div>
          <div className="text-center">
            <h2 className="font-nunito sm:text-7xl text-[40px] font-semibold text-[#143D72]">
              DentPlanner
            </h2>
          </div>
          <div>
            <p className="sm:text-2xl text-lg text-[#1B2B41] text-opacity-70 font-light text-center">
              La solución integral para una <br />
              administración eficiente y sin
              <br className="sm:block hidden" /> complicaciones.
            </p>
          </div>
        </div>
        <div className="pt-8 flex w-full flex-col gap-2">
          <ScrollLink
            to="contacto"
            smooth={true}
            duration={500}
            className="bg-[#006AF5] cursor-pointer font-medium w-full h-full text-white sm:text-2xl text-lg px-3.5 sm:py-5 py-3 rounded text-center"
          >
            Programá una demo
          </ScrollLink>
          <button className="block sm:hidden bg-white font-medium w-full h-full sm:text-2xl text-lg px-3.5 sm:py-5 py-3  rounded text-[#006AF5] border border-[#006AF5]">
            Conocé más
          </button>
        </div>
      </div>
      <div className="mockups max-w-[593px] w-full lg:overflow-visible overflow-hidden lg:flex hidden h-full max-h-[509.9px]">
        <div
          className="relative w-full h-full grid items-center justify-center"
          style={{
            backgroundImage: `url(${Ellipse})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <motion.div
            className="relative w-full h-full grid items-center justify-center"
            style={{
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              gridTemplateRows: "1fr",
            }}
            initial="initial"
            whileHover="hover"
            variants={containerVariants} // Aplica la variante de animación al contenedor
          >
            <motion.img
              className="object-contain row-start-1 col-start-1 col-span-4"
              src={MacBook}
              alt="MacBook"
              variants={macbookVariants}
            />
            <motion.img
              className="object-contain row-start-1 col-start-3 max-w-[149px] absolute right-0 w-full"
              src={Samsung}
              alt="Samsung"
              variants={samsungVariants}
            />
          </motion.div>
        </div>
      </div>
      <div className="max-w-[593px] w-full block lg:hidden">
        <img className="w-full" src={MockupHeader} alt="Mockup" />
      </div>
    </header>
  );
}
