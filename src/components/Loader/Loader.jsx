import { MutatingDots } from 'react-loader-spinner';
import { Wrap } from './Loader.styled';

export const Loader = () => {
  return (
    <Wrap>
      <MutatingDots
        height="100"
        width="100"
        color="#3f51b5"
        secondaryColor="#3f51b5"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Wrap>
  );
};
