"use client";

const Navbar: React.FC = () => {
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className= "flex max-w-fit  fixed top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-6 pl-6 py-2  items-center justify-center space-x-4">
      <div className="container mx-auto flex justify-center  items-center">
        <div className="space-x-8">
          <button
            onClick={() => scrollToSection("lamp-demo")}
            className="hover:text-gray-300"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("text-generate-demo")}
            className="hover:text-gray-300"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("apple-cards-carousel")}
            className="hover:text-gray-300"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("signup-form")}
            className="hover:text-gray-300"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
