interface ActiveIndicatorProps {
  isActive: boolean;
}

const ActiveIndicator: React.FC<ActiveIndicatorProps> = ({ isActive }) => {
  return (
    <span className={`px-3 py-1 text-white rounded-xl ${isActive ? 'bg-green-400' : 'bg-red-500'}`}>
      {isActive ? 'Yes' : 'No'}
    </span>
  );
};

export default ActiveIndicator;
