import SkeletonLoading from '../skeleton-loading';

const ParticipantCardLoading = () => {
  return (
    <div className="w-full rounded-lg border border-neutral-300 p-3">
      <div className="mb-3 flex items-center gap-x-2">
        <div className="h-[60px] w-[60px] rounded-lg bg-neutral-200" />
        <div>
          <div className="mb-1">
            <SkeletonLoading className="h-[25px] w-[170px]" />
            <SkeletonLoading className="h-[19px] w-[120px]" />
          </div>
          <SkeletonLoading className="h-[19px] w-[100px]" />
        </div>
      </div>

      <SkeletonLoading className="h-[41px]" />
    </div>
  );
};

export default ParticipantCardLoading;
