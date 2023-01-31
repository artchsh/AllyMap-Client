import React from 'react';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

// import AuthorIcon from '@/Images/author_picture.png';
import AuthorIcon from '@/Images/artchsh_icon.png';

const Link = styled.a`
    text-decoration: none;
    color: white;
`;

export default function AuthorItem() {
  // Setups
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
      <Avatar src={AuthorIcon} />
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
        <Link href="https://github.com/bogdanshelest" target="_blank">Charlz</Link>
        <Typography variant="body2" color="text.secondary">
          {t('system.developer_and_author_of_project')}
        </Typography>
      </div>
    </div>
  );
}
