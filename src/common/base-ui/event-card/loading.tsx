import SkeletonLoading from '../skeleton-loading';

const EventCardLoading = () => {
  return (
    <div className="flex flex-col rounded-lg p-3">
      <SkeletonLoading className="h-[19px] w-[35%]" />
      <SkeletonLoading className="h-[25px]" />
      <SkeletonLoading className="h-[19px]" />
      <SkeletonLoading className="h-[19px] w-[64%]" />
      <SkeletonLoading className="mt-1 h-[19px] w-[23%]" />
    </div>
  );
};

export default EventCardLoading;
