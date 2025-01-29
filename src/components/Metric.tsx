import { FC } from 'react';
import { IconType } from 'react-icons';

interface Props {
  Icon: IconType;
  data: string;
  className?: string;
  title: string;
}

export const Metric: FC<Props> = ({ Icon, data, className, title }) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <Icon className={className} />
      <span title={title} className={className}>
        {data}
      </span>
    </div>
  );
};
