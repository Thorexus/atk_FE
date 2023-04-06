import { cx } from '@emotion/css';

const SkeletonLoading = ({ className }: { className?: string }) => {
  return (
    <div className={cx(className, 'w-full p-[1px]')}>
      <div className="skeleton-loader h-full w-full" />
    </div>
  );
};

export default SkeletonLoading;
