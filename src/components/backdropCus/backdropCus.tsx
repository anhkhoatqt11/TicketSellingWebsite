/** @format */
import './styles.css';
function BackDropCus({ isOpen }) {
  return isOpen ? (
    <div className="backdrop-in bg-background/80 fixed inset-0 z-50 h-screen "></div>
  ) : null;
}

export default BackDropCus;
