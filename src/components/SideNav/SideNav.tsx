"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navTabs, NavItem } from "@/mock-data/scoreCard";
import styles from "./SideNav.module.scss";

const COLLAPSE_KEY = "gsp.sidenav.collapsed";

function isItemActive(pathname: string, item: NavItem): boolean {
  const own = pathname === item.href || pathname.startsWith(item.href + "/");
  const child = item.children?.some((c) => isItemActive(pathname, c)) ?? false;
  return own || child;
}

export default function SideNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  // Which top-level groups are expanded, keyed by href. Defaults to "expand whichever contains the current page".
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = window.localStorage.getItem(COLLAPSE_KEY);
    if (stored !== null) setCollapsed(stored === "1");
  }, []);

  useEffect(() => {
    setOpenGroups((prev) => {
      const next = { ...prev };
      navTabs.forEach((tab) => {
        if (
          tab.children &&
          isItemActive(pathname, tab) &&
          next[tab.href] === undefined
        ) {
          next[tab.href] = true;
        }
      });
      return next;
    });
  }, [pathname]);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      return next;
    });
  };

  const toggleGroup = (href: string) => {
    setOpenGroups((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  return (
    <nav className={`${styles.sidenav} ${collapsed ? styles.collapsed : ""}`}>
      <button
        type="button"
        className={styles.toggleBtn}
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        title={collapsed ? "Expand navigation" : "Collapse navigation"}
      >
        <span className={styles.hamburger}>☰</span>
        {!collapsed && (
          <span className={styles.toggleLabel}>GSP Dashboard</span>
        )}
      </button>

      <ul className={styles.list}>
        {navTabs.map((tab) => {
          const active = isItemActive(pathname, tab);
          const hasChildren = !!tab.children?.length;
          const isOpen = !!openGroups[tab.href];

          return (
            <li key={tab.href} className={styles.item}>
              <div
                className={`${styles.row} ${active ? styles.rowActive : ""}`}
              >
                <Link
                  href={tab.href}
                  className={styles.label}
                  title={tab.label}
                >
                  <span className={styles.dot} />
                  {!collapsed && (
                    <span className={styles.labelText}>{tab.label}</span>
                  )}
                </Link>

                {hasChildren && !collapsed && (
                  <button
                    type="button"
                    className={styles.chevronBtn}
                    onClick={() => toggleGroup(tab.href)}
                    aria-label={
                      isOpen ? `Collapse ${tab.label}` : `Expand ${tab.label}`
                    }
                  >
                    <span
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                    >
                      ▾
                    </span>
                  </button>
                )}
              </div>

              {hasChildren && !collapsed && isOpen && (
                <ul className={styles.subList}>
                  {tab.children!.map((child) => {
                    const childActive = isItemActive(pathname, child);
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`${styles.subLabel} ${childActive ? styles.subLabelActive : ""}`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
