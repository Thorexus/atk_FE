import { cx } from '@emotion/css';
import { Dialog, Transition } from '@headlessui/react';
import { BaseComponentProps } from 'common/constants/base-component';
import React, { Fragment } from 'react';

export type BaseBottomDrawerProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

type BottomDrawerProps = BaseComponentProps & {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  children: React.ReactNode;
  containerClassName?: string;
};

const BottomDrawer = ({
  isOpen,
  setIsOpen,
  children,
  className,
  containerClassName,
}: BottomDrawerProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        unmount={false}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-30 overflow-y-auto">
        <div className={cx(className, 'flex h-screen')}>
          <Transition.Child as={Fragment}>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-neutral-900/30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-200 transform"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transition ease-in-out duration-200 transform"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full">
            <div
              className={cx(
                containerClassName,
                'fixed bottom-0 z-50 flex h-fit w-full flex-col rounded-t-lg bg-white p-4 font-sukhumvit',
              )}>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BottomDrawer;
