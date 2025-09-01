"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  RiMenuLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface MenuItem {
  key: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  children: Array<{
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    route: string;
    key?: string;
  }>;
}

interface SidebarProps {
  menuItems: MenuItem[];
  userRole: string | null | undefined;
  userName?: string | null | undefined;
  userEmail?: string | null | undefined;
}

export default function Sidebar({
  menuItems,
  userRole,
  userName,
  userEmail,
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const {t} = useTranslation()

  // Check for mobile screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsExpanded(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-expand parent menu if child is active
  useEffect(() => {
    menuItems.forEach((item) => {
      const hasActiveChild = item.children.some(
        (child) => pathname === child.route
      );
      if (hasActiveChild) {
        setExpandedItems((prev) => new Set([...prev, item.key]));
      }
    });
  }, [pathname, menuItems]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMenuItem = (key: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handleChildClick = (route: string) => {
    router.push(route);
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  const isRouteActive = (route: string) => pathname === route;
  const isParentActive = (item: MenuItem) =>
    item.children.some((child) => pathname === child.route);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isExpanded && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-40 lg:hidden transition-all duration-500"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          h-screen transition-all duration-700 ease-out
          ${isExpanded ? "w-80" : "w-20"}
          ${isMobile ? "fixed top-0 left-0 z-50 bg-white shadow-lg" : "relative z-20"}
            ${isMobile && !isExpanded ? "-translate-x-full" : "translate-x-0"}

  `}
      >
        {/* Main Sidebar Container */}
        <div className="h-full bg-white/95 backdrop-blur-xl">
          {/* Header */}
          <div className="relative overflow-hidden bg-white backdrop-blur-xl h-[100px]">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-20 -translate-y-20 animate-pulse"></div>
              <div
                className="absolute bottom-0 right-0 w-32 h-32 bg-white/3 rounded-full translate-x-16 translate-y-16 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/2 rounded-full -translate-x-12 -translate-y-12 animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            <div className="relative flex items-center justify-between p-6">
              <div
                className={`flex items-center space-x-4 ${
                  !isExpanded && "justify-center"
                }`}
              >
                <Image
                  src={"/wezLogo.png"}
                  alt="logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />

                {isExpanded && (
                  <div className="animate-in slide-in-from-left-8 fade-in duration-700 delay-200">
                    <h1 className="text-blue-900 font-bold text-2xl tracking-tight">
                      Wezi
                    </h1>
                    <p className="text-blue-900 text-sm font-semibold">
                      Medical Centre
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={toggleExpanded}
                className="z-30 group relative p-3 rounded-2xl bg-gray-100 hover:bg-gray-300 backdrop-blur-sm border border-white/20 text-blue-900 transition-all duration-500 hover:scale-110 hover:rotate-180"
              >
                <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isExpanded ? (
                  <RiCloseLine className="w-5 h-5 relative z-10 transition-transform duration-500" />
                ) : (
                  <RiMenuLine className="w-5 h-5 relative z-10 transition-transform duration-500" />
                )}
              </button>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 h-[calc(100vh-200px)] overflow-y-auto scroll-container px-4 py-6">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isItemExpanded = expandedItems.has(item.key);
                const isActive = isParentActive(item);
                const isHovered = hoveredItem === item.key;

                return (
                  <div
                    key={item.key}
                    className="space-y-2"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "slideInLeft 0.6s ease-out forwards",
                    }}
                  >
                    {/* Parent Menu Item */}
                    <button
                      onClick={() => isExpanded && toggleMenuItem(item.key)}
                      onMouseEnter={() => setHoveredItem(item.key)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`
                        relative w-full flex items-center justify-between py-1 px-4 rounded-lg
                        transition-all duration-500 group overflow-hidden backdrop-blur-sm
                        bg-white
                        ${
                          isActive
                            ? "text-blue-900 shadow shadow-blue-900/25"
                            : "hover:bg-gray-50 text-gray-700 hover:text-black hover:shadow-xl hover:scale-[1.01]"
                        }
                        ${!isExpanded && "justify-center"}
                        transform-gpu
                      `}
                    >
                      {isHovered && !isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-80"></div>
                      )}

                      <div className="flex items-center space-x-4 relative z-10">
                        <div
                          className={`
                          relative p-3 rounded-xl transition-all duration-500 group-hover:scale-110
                          ${
                            isActive
                              ? "bg-blue-50 shadow"
                              : "bg-gray-100 group-hover:bg-white group-hover:shadow-lg"
                          }
                        `}
                        >
                          <Icon
                            className={`
                            w-4 h-4 transition-all duration-500
                            ${
                              isActive
                                ? "text-blue-900"
                                : "text-gray-600 group-hover:text-blue-900"
                            }
                          `}
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-white/10 rounded-xl animate-pulse"></div>
                          )}
                        </div>

                        {isExpanded && (
                          <span className="font-bold text-sm transition-all duration-300">
                            {item?.key ? t(`sideBar.${item?.key}`): item?.title}
                          </span>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="relative z-10 transition-all duration-500">
                          {isItemExpanded ? (
                            <RiArrowDownSLine
                              className={`
                              w-6 h-6 transition-all duration-500 rotate-180
                              ${
                                isActive
                                  ? "text-blue-900"
                                  : "text-gray-400 group-hover:text-gray-700"
                              }
                            `}
                            />
                          ) : (
                            <RiArrowRightSLine
                              className={`
                              w-6 h-6 transition-all duration-500
                              ${
                                isActive
                                  ? "text-blue-900"
                                  : "text-gray-400 group-hover:text-gray-700"
                              }
                              ${isHovered ? "translate-x-1" : ""}
                            `}
                            />
                          )}
                        </div>
                      )}

                      {/* Active Indicator */}
                      {isActive && isExpanded && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-blue-900 rounded-r-full animate-in slide-in-from-left-2 duration-500"></div>
                      )}
                    </button>

                    {/* Child Menu Items */}
                    {isExpanded && isItemExpanded && (
                      <div className="ml-8 space-y-1 animate-in slide-in-from-top-4 fade-in duration-600">
                        {item?.children?.map((child, childIndex) => {
                          const ChildIcon = child?.icon;
                          const isChildActive = isRouteActive(child?.route);

                          return (
                            <button
                              key={child.route}
                              onClick={() => handleChildClick(child.route)}
                              className={`
                                w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                                transition-all duration-400 group relative overflow-hidden backdrop-blur-sm
                                ${
                                  isChildActive
                                    ? "bg-blue-50 text-blue-900 shadow-lg border-l-4 border-blue-900 scale-[1.02]"
                                    : "hover:bg-gray-50 text-gray-600 hover:text-black hover:translate-x-2 hover:shadow-md"
                                }
                                transform-gpu
                              `}
                              style={{ animationDelay: `${childIndex * 50}ms` }}
                            >
                              {isChildActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white animate-pulse"></div>
                              )}

                              <div
                                className={`
                                relative p-2.5 rounded-lg transition-all duration-400 group-hover:scale-110
                                ${
                                  isChildActive
                                    ? "bg-blue-100 shadow-sm"
                                    : "bg-gray-100 group-hover:bg-white group-hover:shadow-md"
                                }
                              `}
                              >
                                <ChildIcon
                                  className={`
                                  w-4 h-4 transition-all duration-400
                                  ${
                                    isChildActive
                                      ? "text-blue-700"
                                      : "text-gray-500 group-hover:text-blue-900"
                                  }
                                `}
                                />
                              </div>

                              <span
                                className={`
                                font-semibold text-sm transition-all duration-400 relative z-10
                                ${isChildActive ? "text-blue-900" : ""}
                              `}
                              >
                                {child?.key ? t(`sideBar.${child?.key}`): child?.title}
                              </span>

                              {isChildActive && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-blue-900 rounded-full animate-pulse"></div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Profile Button */}
          {isExpanded ? (
            <div className="px-6 py-2 border-t border-gray-100 h-[100px] bg-gradient-to-r from-gray-50/50 to-white animate-in slide-in-from-left-8 fade-in duration-700 delay-300">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-900 rounded-3xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <span className="text-white font-bold text-xl tracking-wide">
                      {userName
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")
                        ?.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-black font-bold text-sm truncate">
                    {userName}
                  </h3>
                  <p className="text-gray-600 text-xs truncate mb-2">
                    {userEmail}
                  </p>
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold text-blue-900 shadow-lg">
                    <div className="w-2 h-2 bg-blue-900 rounded-full mr-2 animate-pulse"></div>
                    {userRole &&
                      userRole?.charAt(0)?.toUpperCase() + userRole?.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-xl tracking-wide">
                  {userName
                    ?.split(" ")
                    ?.map((n) => n[0])
                    ?.join("")
                    ?.toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Toggle Button */}
      {isMobile && !isExpanded && (
        <button
          onClick={toggleExpanded}
          className="fixed top-6 left-6 z-50 p-4 bg-blue-900 text-white rounded-2xl shadow-2xl hover:shadow-blue-900/25 transition-all duration-500 hover:scale-110 lg:hidden backdrop-blur-sm group"
        >
          <RiMenuLine className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      )}
      {/* Custom Keyframes */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
