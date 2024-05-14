import { Button } from '@/components/Elements';
import { useNavigate } from 'react-router-dom';
import error from '@/assets/png/404.png';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen text-center"
      role="alert"
    >
      <img src={error} className="w-[400px] p-5" alt="" />
      <h2 className="text-3xl font-semibold">Page Not found</h2>

      <Button className="button-filled mt-10" onClick={() => navigate('/app')}>
        Back To Homepage
      </Button>
    </div>
  );
};
