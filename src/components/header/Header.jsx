/* eslint-disable no-undef */
'use client';

import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import './styles.css';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { signOut } from 'next-auth/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from '@nextui-org/react';
import AuthSvg from '@/assets/AuthSvg';
import { MobileNav } from './MobileNavBar';
import { AiOutlineHeart } from 'react-icons/ai';
import { Badge } from '../ui/badge';
import Logo from '../logo';
import BackDropCus from '../backdropCus/backdropCus';
import { useRouter } from 'next/navigation';

const avatarNav = [
  {
    name: 'Hồ sơ',
    href: '/agency',
  },
  {
    name: 'Thêm sản phẩm',
    href: '/admin/add-product',
  },
  {
    name: 'Team',
    href: '/admin/add-product',
  },
];

const NavigationMenuDemo = ({ session }) => {
  const [user] = useState(session?.user);
  const [show, setShow] = useState('translate-y-0');
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  });
  const controlNavbar = () => {
    if (window.scrollY > 100) {
      if (window.scrollY > lastScrollY) {
        setShow('-translate-y-[82px]');
      } else {
        setShow('shadow-sm');
      }
    } else {
      setShow('translate-y-0');
    }
    setLastScrollY(window.scrollY);
  };
  return (
    <div
      className={`w-full h-[50px] md:h-[80px] 
    bg-white  items-center justify-between z-20
    sticky top-0 transition-transform duration-300 px-14  
    ${show}
    `}
    >
      <MobileNav />

      <div className="hidden lg:flex py-2 items-center justify-center  ">
        {isUserOpen ? <BackDropCus isOpen={isUserOpen} /> : null}
        <Logo />
        <NavigationMenu.Root className="NavigationMenuRoot">
          <NavigationMenu.List className="NavigationMenuList">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                Learn <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <ul className="List one">
                  <li style={{ gridRow: 'span 3' }}>
                    <NavigationMenu.Link asChild>
                      <a className="Callout" href="/">
                        <svg
                          aria-hidden
                          width="38"
                          height="38"
                          viewBox="0 0 25 25"
                          fill="white"
                        >
                          <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                          <path d="M12 0H4V8H12V0Z"></path>
                          <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                        </svg>
                        <div className="CalloutHeading">Radix Primitives</div>
                        <p className="CalloutText">
                          Unstyled, accessible components for React.
                        </p>
                      </a>
                    </NavigationMenu.Link>
                  </li>

                  <ListItem href="https://stitches.dev/" title="Stitches">
                    CSS-in-JS with best-in-class developer experience.
                  </ListItem>
                  <ListItem href="/colors" title="Colors">
                    Beautiful, thought-out palettes with auto dark mode.
                  </ListItem>
                  <ListItem href="https://icons.radix-ui.com/" title="Icons">
                    A crisp set of 15x15 icons, balanced and consistent.
                  </ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                Overview <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <ul className="List two">
                  <ListItem
                    title="Introduction"
                    href="/primitives/docs/overview/introduction"
                  >
                    Build high-quality, accessible design systems and web apps.
                  </ListItem>
                  <ListItem
                    title="Getting started"
                    href="/primitives/docs/overview/getting-started"
                  >
                    A quick tutorial to get you up and running with Radix
                    Primitives.
                  </ListItem>
                  <ListItem
                    title="Styling"
                    href="/primitives/docs/guides/styling"
                  >
                    Unstyled and compatible with any styling solution.
                  </ListItem>
                  <ListItem
                    title="Animation"
                    href="/primitives/docs/guides/animation"
                  >
                    Use CSS keyframes or any animation library of your choice.
                  </ListItem>
                  <ListItem
                    title="Accessibility"
                    href="/primitives/docs/overview/accessibility"
                  >
                    Tested in a range of browsers and assistive technologies.
                  </ListItem>
                  <ListItem
                    title="Releases"
                    href="/primitives/docs/overview/releases"
                  >
                    Radix Primitives releases and their changelogs.
                  </ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                Overview <CaretDownIcon className="CaretDown" aria-hidden />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <ul className="List two">
                  <ListItem
                    title="Introduction"
                    href="/primitives/docs/overview/introduction"
                  >
                    Build high-quality, accessible design systems and web apps.
                  </ListItem>
                  <ListItem
                    title="Getting started"
                    href="/primitives/docs/overview/getting-started"
                  >
                    A quick tutorial to get you up and running with Radix
                    Primitives.
                  </ListItem>
                  <ListItem
                    title="Styling"
                    href="/primitives/docs/guides/styling"
                  >
                    Unstyled and compatible with any styling solution.
                  </ListItem>
                  <ListItem
                    title="Animation"
                    href="/primitives/docs/guides/animation"
                  >
                    Use CSS keyframes or any animation library of your choice.
                  </ListItem>
                  <ListItem
                    title="Accessibility"
                    href="/primitives/docs/overview/accessibility"
                  >
                    Tested in a range of browsers and assistive technologies.
                  </ListItem>
                  <ListItem
                    title="Releases"
                    href="/primitives/docs/overview/releases"
                  >
                    Radix Primitives releases and their changelogs.
                  </ListItem>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="NavigationMenuLink"
                href="https://github.com/radix-ui"
              >
                Github
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="NavigationMenuIndicator">
              <div className="Arrow" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="ViewportPosition">
            <NavigationMenu.Viewport className="NavigationMenuViewport" />
          </div>
        </NavigationMenu.Root>
        <Button className="w-48 h-6 text-sm">Dành cho đối tác</Button>
        {user ? (
          <div className="flex flex-row gap-5 items-center justify-center">
            <Link href={'/favorite'}>
              <Button variant="outline" size="icon" className="relative">
                {1 > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-2.5"
                  >
                    7
                  </Badge>
                )}
                {
                  <AiOutlineHeart className="text-slate-600 stroke-zinc-950 w-4 h-4 " />
                }
              </Button>
            </Link>
            <div className="w-full h-full">
              <Dropdown
                shouldBlockScroll={true}
                onOpenChange={(open) => {
                  setIsUserOpen(open);
                }}
                closeOnSelect={true}
                onClose={() => {
                  setIsUserOpen(false);
                }}
                isOpen={isUserOpen}
              >
                <DropdownTrigger>
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>Guest</AvatarFallback>
                  </Avatar>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownSection title={`${user?.name}`}>
                    {avatarNav.map((item, index) => (
                      <DropdownItem
                        onClick={() => {
                          router.push(item.href);
                        }}
                        className="w-full"
                        key={index}
                      >
                        {item.name}
                      </DropdownItem>
                    ))}

                    <DropdownItem
                      onClick={() => signOut({ callbackUrl: '/auth/login' })}
                    >
                      <div className="flex flex-row gap-2 items-center h-8  ">
                        <div className="">{AuthSvg.signIn()}</div>
                        <div>Logout</div>
                      </div>
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>

            {/* <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={'/admin/add-product'}>Add Product</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/auth/login' })}
                  className="border-solid border-t-2 mt-2  gap-2"
                >
                  <div className="">{AuthSvg.signIn()}</div>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        ) : (
          <Link href={'/auth/login'}>
            <Button className="w-[70px] h-8">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

const ListItem = React.forwardRef(
  ({ children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a className={'ListItemLink'} {...props} ref={forwardedRef}>
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

export default NavigationMenuDemo;
