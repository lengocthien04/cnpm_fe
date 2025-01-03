import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { classNames } from "primereact/utils";
import React, { Fragment, useRef } from "react";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  classNameWrapper?: string;
  children: React.ReactNode;
  closeButton?: boolean;
}

export default function DialogPopup({
  isOpen,
  handleClose,
  classNameWrapper = "relative min-w-80 max-w-md transform overflow-hidden rounded-2xl p-10 align-middle shadow-xl transition-all",
  children,
  closeButton = true,
}: Props) {
  const completeButtonRef = useRef(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={handleClose}
        initialFocus={completeButtonRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  "bg-white/90 text-darkText",
                  classNameWrapper
                )}
              >
                {children}
                <button
                  type="button"
                  className={classNames(
                    "absolute text-darkText/50 right-2 top-2 flex justify-center rounded-md p-2 text-sm font-medium  hover:text-red-600 ",
                    {
                      visible: closeButton,
                      invisible: !closeButton,
                    }
                  )}
                  onClick={handleClose}
                  ref={completeButtonRef}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
