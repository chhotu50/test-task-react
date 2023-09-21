import CustomModal from '../components/Modal';
const ButtonA = () => {
  const url ='?companyId=171';
  return (
    <div>
      <CustomModal defaultUrl={url}/>
    </div>
  );
};

export default ButtonA;
