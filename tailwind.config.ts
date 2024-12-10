import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
			sans: ["Inter", "sans-serif"], 
		  },
		colors: {
			primary: "#1E40AF",  
			secondary: "#1872FA", 
			accent: "#2563EB",    
			danger: "#EF4444",   
			success: "#10B981", 
			warning: "#F59E0B",   
			dark: "#1F2937",     
			light: "#F1F1F1",   
		  },
		  
	
  		
  	
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
