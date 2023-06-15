const Navigation = ({ active, setActive }) => {
  const handleNavClick = (section) => {
    setActive(section);
  };

  return (
    <nav>
      <button onClick={() => handleNavClick('categorie')} className={active === 'categorie' ? 'active' : ''}>
        Categorie
      </button>
      <button onClick={() => handleNavClick('menu')} className={active === 'menu' ? 'active' : ''}>
        Menu
      </button>
    </nav>
  );
};

export default Navigation;

