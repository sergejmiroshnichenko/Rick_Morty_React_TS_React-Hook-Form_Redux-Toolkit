import { FC } from 'react';
import { ReactComponent as LogoHeader } from 'assets/logo-header.svg';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <header>
      <nav>
        <Link to={'/'}>
          <LogoHeader/>
        </Link>
      </nav>
    </header>
  );
};