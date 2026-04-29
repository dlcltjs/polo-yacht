export default function Footer() {
  return (
    <footer className="bg-rivanavy-950 text-slate-400 border-t border-white/5 font-sans pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 mb-20">
          <div>
            <h3 className="text-4xl md:text-5xl font-serif font-bold tracking-[0.2em] text-white mb-8">GUMGA</h3>
            <p className="text-sm font-light text-slate-300 leading-loose max-w-sm mb-10">
              Your compass in the vast ocean of luxury experiences. Uncharted territories of high-end lifestyle waiting for you.
            </p>
            <div className="flex border-b border-slate-600 pb-2 max-w-xs focus-within:border-rivacyan transition-colors">
              <input type="email" placeholder="SUBSCRIBE TO NEWSLETTER" className="bg-transparent w-full text-xs font-wide tracking-widest focus:outline-none text-white placeholder-slate-600" />
              <button className="text-white hover:text-rivacyan transition-colors transform -rotate-45">→</button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-[10px] sm:text-xs font-wide tracking-[0.2em] leading-[3]">
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors block">Boutique</a></li>
              <li><a href="#" className="hover:text-white transition-colors block">Yachts Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors block">Reservation</a></li>
              <li><a href="#" className="hover:text-white transition-colors block">Membership</a></li>
            </ul>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors block">Media Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors block">Press Room</a></li>
              <li><a href="#" className="hover:text-white transition-colors block">Contacts</a></li>
              <li><a href="#" className="hover:text-white transition-colors block">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-white/10 text-[9px] sm:text-[10px] tracking-[0.2em] font-wide uppercase">
          <p className="mb-4 lg:mb-0">&copy; {new Date().getFullYear()} GUMGA. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Credits</a>
            <a href="#" className="hover:text-white transition-colors">Legal Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
