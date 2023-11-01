'use client';

import { ScrollArea } from '@components/ui/scroll-area';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Label } from './label';
function DialogCustom({
  isModalOpen,
  setIsModalOpen,
  children,
  warningOnClose,
  className,
  callBack,
  isChild,
  notShowClose,
}: {
  isModalOpen: boolean;
  setIsModalOpen?: (value: boolean) => void;
  warningOnClose?: boolean;
  children: React.ReactNode;
  className?: string;
  callBack?: () => void;
  isChild?: boolean;
  notShowClose?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(isModalOpen);
  const [isClosing, setIsClosing] = useState(false);

  const [isWarningOpen, setIsWarningOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [isWarningClosing, setIsWarningClosing] = useState(false);

  useEffect(() => {
    function getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
    }

    // Example usage
    //scroll bar prevent body from moving
    function setScrollbarWidthProperty() {
      const scrollbarWidth = getScrollbarWidth();
      document.documentElement.style.setProperty(
        '--scrollbar-width',
        `${scrollbarWidth}px`
      );
    }
    window.addEventListener('resize', setScrollbarWidthProperty);
    // Call this function when your app loads
    setScrollbarWidthProperty();
    // Disable scrolling on the body when the dialog is open
    if (isModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      if (isChild) return;
      document.body.classList.remove('no-scroll');
    }
    return () => {
      // Re-enable scrolling when the component unmounts
      if (isChild) return;
      document.body.classList.remove('no-scroll');
    };
  }, [isModalOpen]);

  // Use useEffect to handle isModalOpen changes
  useEffect(() => {
    if (warningOnClose) {
      setIsWarningOpen(true);
    }

    if (isModalOpen) {
      setIsVisible(true);
    } else {
      setIsModalOpen?.(false);
    }
  }, [isModalOpen]);
  useEffect(() => {
    if (isWarningOpen) {
      setIsWarningVisible(true);
    } else {
      setIsWarningOpen(false);
    }
  }, [isWarningOpen]);

  const handleClose = () => {
    if (warningOnClose && !isWarningOpen) {
      setIsWarningOpen(true);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsVisible(false);
        setIsModalOpen?.(false);
      }, 120);
    }
  };

  const handleCloseWarning = () => {
    setIsWarningClosing(true);
    setTimeout(() => {
      setIsWarningClosing(false);
      setIsWarningVisible(false);
      setIsWarningOpen(false);
    }, 120);
  };
  return (
    isVisible && (
      <div className="absolute w-full h-full z-500 ">
        <div
          className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ${
            isModalOpen ? `animate-in fade-in-0` : ''
          }  ${isClosing ? 'animate-out fade-out-0 ' : ''}
  `}
        ></div>
        <div
          className={cn(
            `fixed left-[50%] top-[50%] z-50 max-w-full translate-x-[-50%] 
      translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200   ${
        isModalOpen
          ? `animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]`
          : ''
      } ${
              isClosing
                ? 'animate-out fade-out-10 zoom-out-95 slide-out-to-left-1/2  slide-out-to-top-[48%] '
                : ''
            }
       `,
            className
          )}
        >
          <div className="h-full w-full ">
            <ScrollArea className="h-full w-full px-3">
              {!notShowClose ? (
                <div className="flex items-end justify-end mb-3">
                  <Button variant={'outline'} onClick={handleClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}
              <div className="w-full h-full py-3 px-1">
                {/* CHILDREN */}
                {children}
                {/* CHILDREN */}
                {isWarningOpen ? (
                  <div className="absolute ">
                    <div
                      className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ${
                        isWarningOpen ? `animate-in fade-in-0` : ''
                      }  ${isWarningClosing ? 'animate-out fade-out-0 ' : ''}
  `}
                    ></div>
                    <div
                      className={cn(
                        `fixed left-[50%] top-[50%] z-50 max-w-full translate-x-[-50%] 
      translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 w-[90%] lg:w-[400px] ${
        isWarningOpen
          ? `animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]`
          : ''
      } ${
                          isWarningClosing
                            ? 'animate-out fade-out-10 zoom-out-95 slide-out-to-left-1/2  slide-out-to-top-[48%] '
                            : ''
                        }
       `
                      )}
                    >
                      <div className="w-full h-full ">
                        <div className="h-full w-full px-3">
                          <div className="flex items-end justify-end mb-3"></div>
                          <div className="w-full h-full py-3">
                            <div className="flex flex-col items-center justify-between h-full w-full lg:py-12">
                              <Label className="mb-24 font-bold text-lg">
                                Bạn có muốn đóng cửa sổ này không?
                              </Label>
                              <div className="flex items-center justify-center w-full">
                                <Button
                                  variant={'destructive'}
                                  className="w-[30%] mr-4"
                                  onClick={() => {
                                    // setOpen(false);
                                    // setDanhMucValue(null);
                                    // setThue(false);
                                    // setBan(false);
                                    callBack?.();
                                    handleClose();
                                  }}
                                >
                                  Có
                                </Button>
                                <Button
                                  className="w-[30%]"
                                  onClick={() => {
                                    handleCloseWarning();
                                  }}
                                >
                                  Không
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  );
}

export default DialogCustom;
