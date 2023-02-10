const CustomButton = ({ label, onClick, color }) => (
    <button
      type="button"
      className={`btn btn-${color} border border-dark`}
      onClick={onClick}
    >
      {label}
    </button>
  );
  
export default CustomButton;  