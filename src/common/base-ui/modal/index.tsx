import { cx } from '@emotion/css';
import { Dialog, Transition } from '@headlessui/react';
import { BaseComponentProps } from 'common/constants/base-component';
import { Fragment } from 'react';

type BaseModalProps = BaseComponentProps & {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  gravity?: 'top' | 'middle' | 'bottom';
  children: React.ReactNode;
};

const BaseModal = ({
  className,
  isOpen,
  setIsOpen,
  gravity = 'middle',
  children,
}: BaseModalProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-50 overflow-y-auto font-sukhumvit"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}>
        <div className="block h-full items-end justify-center p-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-neutral-900 opacity-50" />

          <span
            className={cx(
              {
                'align-top sm:align-middle': gravity === 'top',
                'align-middle': gravity === 'middle',
                'align-bottom sm:align-middle': gravity === 'bottom',
              },
              'inline-block h-full',
            )}
            aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="transition duration-200"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-200"
            leaveFrom="transform scale-100 opacity-100 translate-y-0"
            leaveTo="transform scale-95 opacity-0 translate-y-4">
            <div
              className={cx(
                className,
                'relative inline-block transform overflow-hidden rounded-lg bg-white p-4 text-center align-middle shadow-xl transition-all',
              )}>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BaseModal;
