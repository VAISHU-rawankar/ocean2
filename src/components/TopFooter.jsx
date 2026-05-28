import {
  Phone,
  Mail,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
} from "lucide-react";

const TopFooter = () => {
  return (
    <div className="w-full bg-linear-to-r from-[#AFCA21] via-[#7ec31f] to-[#434343] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Contact Information - Left Side */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a
              href="tel:+918885111263"
              className="flex items-center gap-2 hover:text-gray-100 transition-all duration-300 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#434343] transition-all duration-300 shadow-md">
                <Phone size={16} />
              </div>
              <span className="text-sm font-medium">+91 8885 111 263</span>
            </a>

            <a
              href="mailto:sales@covenantpeniel.com"
              className="flex items-center gap-2 hover:text-gray-100 transition-all duration-300 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#434343] transition-all duration-300 shadow-md">
                <Mail size={16} />
              </div>
              <span className="text-sm font-medium hidden sm:inline">
                sales@covenantpeniel.com
              </span>
              <span className="text-sm font-medium sm:hidden">Email Us</span>
            </a>
          </div>

          {/* CTA Message - Center */}
          <div className="text-center">
            <p className="text-base sm:text-lg font-bold tracking-wide">
              {" "}
              Premium Indian Spices & Grains Exported Worldwide!
            </p>
            <p className="text-xs sm:text-sm text-white/90 mt-1">
              Your Trusted Partner in Quality Food Exports
            </p>
          </div>

          {/* Social Media - Right Side */}
          <div className="flex items-center gap-3">
            {/* <span className="text-sm font-medium hidden lg:inline">
              Follow Us:
            </span> */}

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#AFCA21] hover:scale-110 transition-all duration-300 shadow-md"
            >
              <Facebook size={16} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our YouTube channel"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#AFCA21] hover:scale-110 transition-all duration-300 shadow-md"
            >
              <Youtube size={16} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram page"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#AFCA21] hover:scale-110 transition-all duration-300 shadow-md"
            >
              <Instagram size={16} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our LinkedIn page"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#AFCA21] hover:scale-110 transition-all duration-300 shadow-md"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFooter;
