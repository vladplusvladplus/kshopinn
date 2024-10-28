import Link from 'next/link';
import { useState } from 'react';

import styles from './navbar.module.scss';

const Navbar = (props) => {
  const [clickedLink, setClickedLink] = useState();

  const handleLinkClick = (index) => {
    setClickedLink(index);
  };

  if (!props.data) {
    return <></>;
  }

  return (
    <div className={`${styles.wrapper} z-30`}>
      <div className={styles.container}>
        <nav
          className={
            props.data.navbar.length > 4
              ? `${styles.nav} z-30 justify-between`
              : `${styles.nav} z-30 gap-[50px]`
          }
        >
          {props.data.navbar.map((item, i) =>
            item.innerlink.length > 0 ? (
              <div
                className={`${styles.nav1}`}
                key={i}
                style={{
                  backgroundColor: clickedLink === i ? '#2fb1c0' : '',
                  padding: '5px',
                }}
                onClick={() => handleLinkClick(i)}
              >
                <div className="flex justify-center mr-[8px] items-center">
                  <Link
                    className={`${styles.item} uppercase`}
                    style={{ color: clickedLink === i ? '#fff' : '' }}
                    href={item.url} // url: /inner1/outsource
                    // as={item.displayUrl}
                    onClick={() => handleLinkClick(i)}
                    key={i}
                  >
                    {item.link}
                  </Link>
                  <svg
                    fill={clickedLink === i ? '#fff' : '#43b8c5'}
                    height="8px"
                    width="8px"
                    className="relative left-[5px]"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 490 490"
                  >
                    <polygon points="245,456.701 490,33.299 0,33.299 "></polygon>
                  </svg>
                </div>
                {item.innerlink && (
                  <nav className={styles.links}>
                    {item.innerlink.map((innerItem, j) => (
                      <Link
                        className={`${styles.link} active:bg-[#000] capitalize text-[14px] font-semibold`}
                        href={innerItem.url}
                        key={j}
                        passHref
                      >
                        {innerItem.link}
                      </Link>
                    ))}
                  </nav>
                )}
              </div>
            ) : (
              <Link
                className={`${styles.item} ${styles.nav1} uppercase px-2 h-[48px]`}
                href={`/${item.url}`}
                key={i}
                style={{
                  backgroundColor: clickedLink === i ? '#2fb1c0' : '',
                  padding: '5px',
                  color: clickedLink === i ? '#fff' : '',
                }}
                onClick={() => handleLinkClick(i)}
              >
                {item.link}
              </Link>
            )
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
