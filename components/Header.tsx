
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center bg-background-dark/40 backdrop-blur-xl px-6 py-5 justify-between sticky top-0 z-50 border-b border-border-dark">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
        <span className="material-symbols-outlined text-white/80 text-[22px]">menu</span>
      </div>
      <h2 className="text-white text-base font-semibold tracking-tight">Task Generator</h2>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer overflow-hidden border border-white/10">
        <img 
          alt="avatar" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm0pNVtm87AaDHjbq3VyTdTzqjJ9zvfityJwBYP15A2rjhtQXh8lSDfLdbsFGQ3UQuD463p_2Sw0Gdw62cxp6AjwXxcjg_-2cyqff0yKunTo5JZzkftg0PSem5ZFe2BeWcgICF_wHu23HsWG-wrWD4IpB6QUZV8vm0Xpb0jUYvZlKH7bRIw4iB3aAA2YNLksxqNp947j6purZAZP7ERS1LFcdoMWyZ1mXMVz3c6uwT72YsnKGWIgYwv73kfW_n9miyo2esZojoCrM"
        />
      </div>
    </header>
  );
};

export default Header;
