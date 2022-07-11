import React from 'react';
import {IconEdit, IconLogout, IconResetPass, IconHistory} from '../../assets';

export const dummyMenu = [
  {
    id: 1,
    nama: 'Edit Profile',
    gambar: <IconEdit />,
    halaman: 'EditProfile',
  },
  {
    id: 2,
    nama: 'Change Password',
    gambar: <IconResetPass />,
    halaman: 'ChangePassword',
  },
  {
    id: 3,
    nama: 'History Pemesanan',
    gambar: <IconHistory />,
    halaman: 'HistoryPemesanan',
  },
  {
    id: 4,
    nama: 'Sign Out',
    gambar: <IconLogout />,
    halaman: 'Login',
  },
];
