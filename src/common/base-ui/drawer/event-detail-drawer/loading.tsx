import SkeletonLoading from 'common/base-ui/skeleton-loading';

const EventDetailDrawerLoading = ({
  useActionButton,
  asStaticPreview,
}: {
  useActionButton?: boolean;
  asStaticPreview?: boolean;
}) => {
  return (
    <div className="w-full">
      <div className="mb-4 w-full">
        <SkeletonLoading className="h-6 w-[43%]" />
        <SkeletonLoading className="h-8" />
        <SkeletonLoading className="h-8 w-[62%]" />
        <SkeletonLoading className="h-[25px]" />
        <SkeletonLoading className="mb-1 h-[25px] w-[75%]" />
        <SkeletonLoading className="h-[19px] w-[33%]" />
      </div>

      <div className="flex w-full flex-col gap-y-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div className="flex items-center gap-x-2" key={index}>
            <SkeletonLoading className="h-10 w-10" />
            <div>
              <SkeletonLoading className="h-[19px] w-[60px]" />
              <SkeletonLoading className="h-[19px] w-[120px]" />
            </div>
          </div>
        ))}
      </div>

      {!asStaticPreview ? (
        <>
          {useActionButton ? (
            <div className="mt-6 flex flex-col gap-y-2">
              <SkeletonLoading className="h-[41px] w-full" />
              <SkeletonLoading className="h-[41px] w-full" />
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-y-2">
              <SkeletonLoading className="h-[41px] w-full" />
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default EventDetailDrawerLoading;
