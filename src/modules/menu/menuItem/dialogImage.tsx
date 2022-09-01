import { isEmpty } from 'lodash';
import Image from 'next/image';

export const DialogImage = ({ dish }: { dish: IDish }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {!isEmpty(dish.pic_url) && (
        <Image
          src={dish.pic_url}
          alt={`Picture of ${dish.en_name}`}
          height={300}
          width={350}
        />
      )}
    </div>
  );
};
