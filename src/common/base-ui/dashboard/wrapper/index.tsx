import { cx } from '@emotion/css';
import { BaseComponentProps } from 'common/constants/base-component';
import TabItem from '../tab-item';
import Button, { ButtonContainerEnum } from 'common/base-ui/buttons/button';
import { VariantEnum } from 'common/types/component';
import { TestStatusEnum } from 'modules/data-contractor';

type DashboardWrapperProps = BaseComponentProps & {
  children: React.ReactNode;
  tabList?: { label: string; value: string }[];
  currentTab?: TestStatusEnum;
  setCurrentTab?: (value: TestStatusEnum) => void;
  childContainerClassName?: string;
  useLoadMoreButton?: boolean;
  onLoadMoreClick?: () => void;
  isLoadingMore?: boolean;
  isLoading?: boolean;
  currentTabDataAmount?: number[];
};

const DashboardWrapper = ({
  className,
  children,
  tabList,
  currentTab,
  setCurrentTab,
  childContainerClassName,
  useLoadMoreButton = false,
  onLoadMoreClick,
  isLoadingMore,
  isLoading,
  currentTabDataAmount,
}: DashboardWrapperProps) => {
  return (
    <div
      className={cx(
        className,
        !tabList && 'p-2',
        'relative flex flex-col overflow-hidden rounded-lg bg-white',
      )}>
      <div
        className={cx(
          !isLoading && 'overflow-y-auto',
          tabList ? 'gap-y-0' : 'gap-y-2',
          'flex flex-1 flex-col',
        )}>
        {tabList ? (
          <div className="drop-shadow-medium flex overflow-x-auto rounded-t-lg">
            {tabList.map((item, index) => (
              <TabItem
                key={item.value}
                title={item.label}
                value={item.value}
                isActive={item.value === currentTab}
                onClick={() =>
                  setCurrentTab
                    ? setCurrentTab(item.value as TestStatusEnum)
                    : null
                }
                amount={currentTabDataAmount![index]}
              />
            ))}
          </div>
        ) : null}

        {tabList ? (
          <div
            className={cx(
              childContainerClassName,
              'flex flex-col gap-y-2 overflow-auto p-2',
            )}>
            {children}
          </div>
        ) : (
          <>{children}</>
        )}
        {useLoadMoreButton && !isLoadingMore ? (
          <Button
            title="โหลดเพิ่ม"
            variant={VariantEnum.NEUTRAL}
            container={ButtonContainerEnum.SECONDARY}
            onClick={() => (onLoadMoreClick ? onLoadMoreClick() : null)}
            isLoading={isLoadingMore}
            className="w-full"
          />
        ) : null}
      </div>
    </div>
  );
};

export default DashboardWrapper;
