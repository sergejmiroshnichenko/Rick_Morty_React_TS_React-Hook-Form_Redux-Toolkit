import { FC } from 'react';
import { ReactComponent as LogoHeader } from 'assets/logo-header.svg';

export const Header: FC = () => {
  return (
    <header>
      <nav>
        <LogoHeader />
      </nav>
    </header>
  );
};