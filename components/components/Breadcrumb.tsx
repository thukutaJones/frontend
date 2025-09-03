'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdChevronRight } from 'react-icons/md';

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const firstSegment = segments[0];
  const crumbs = segments.map((segment, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/');
    return { name: formatSegment(segment), href };
  });

  return (
    <nav className="text-sm text-gray-500">
      <ol className="flex items-center flex-wrap text-sm">
        <li>
          <Link href={`/${firstSegment}`} className="text-xl text-blue-900 font-bold">
            {formatSegment(firstSegment)}
          </Link>
        </li>
        {crumbs.slice(1).map((crumb, i) => (
          <li key={crumb.href} className="flex items-center">
            <MdChevronRight className="mx-1 text-gray-400" />
            <Link
              href={crumb.href}
              className={`${
                i === crumbs.length - 2 ? 'font-semibold text-gray-800' : 'text-primary'
              }`}
            >
              {crumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
